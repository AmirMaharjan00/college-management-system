import { useState, useEffect, useContext, useMemo, createContext, useRef } from 'react'
import { fetchCallback, getScript, ourFetch } from '../functions'
import { Breadcrumb } from '../components'
import { TodaysDate } from "../includes/components-hooks"
import { GLOBALCONTEXT } from '../../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router' 
import { faPenToSquare, faEye, faCirclePlus, faRotate, faFloppyDisk, faCircleXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
const SYLLABUS = createContext(),
    backUrl = 'http://localhost:5000'

/**
 * Syllabus
 */
export const Syllabus = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { setOverlay, setHeaderOverlay, setFormVisibility, formVisibility, loggedInUser, editPopupStatus, setEditPopupStatus } = Global,
        { role } = loggedInUser,
        [ courses, setCourses ] = useState([]),
        [ isUpdated, setIsUpdated ] = useState( false ),
        [ activeSubject, setActiveSubject ] = useState({}),
        [ activePopupId, setActivePopupId ] = useState( 0 ),
        [ activeSemester, setActiveSemester ] = useState( 1 ),
        [ subjects, setSubjects ] = useState([]),
        [ popupDetails, setPopupDetails ] = useState({
            name: '',
            abbreviation: '',
            semester: 1
        }),
        filteredSubjects = useMemo(() => {
            return subjects.map(( subject )=> {
                let { semester } = subject
                if( semester == activeSemester ) return subject
            })
        }, [ subjects, activeSemester ]),
        syllabusObject = {
            filteredSubjects,
            popupDetails,
            activeSemester, setActiveSemester,
            role,
            setEditPopupStatus,
            activeSubject, setActiveSubject,
            setIsUpdated
        }

    useEffect(() => {
        ourFetch({
            api: '/courses',
            callback: fetchCallback,
            setter: setCourses
        })
    }, [])

    useEffect(() => {
        ourFetch({
            api: '/subject-via-course-id',
            callback: fetchCallback,
            setter: setSubjects,
            body: JSON.stringify({ id: activePopupId })
        })
    }, [ activePopupId, isUpdated ])

    /**
     * Handle Card Click
     */
    const handleClick = ( course ) => {
        let { id, semester, name, abbreviation } = course
        setActivePopupId( id )
        setPopupDetails({
            name,
            abbreviation,
            semester
        })
        setOverlay( true )
        setHeaderOverlay( true )
        setFormVisibility( true )
        setActiveSemester( 1 )
    }

    return <main className="cmg-main syllabus" id="cmg-main">

        <div className='page-header'>
        
            <Breadcrumb
                headLabel = 'Syllabus'
                currentPageLabel = 'Syllabus'
                middle = { false }
            />

            <TodaysDate />

        </div>
        <h2 className='section-title'>Courses</h2>
        <div className='courses'>
            {
                courses.map(( course, index ) => {
                    let { id, semester, name, abbreviation } = course,
                        count = index + 1

                    return <div className='course card' key={ index } data-id={ id } onClick={() => handleClick( course ) }>
                        <span className='count'>{ count }</span>
                        <div className='details'>
                            <h2 className='title'>{ name }</h2>
                            <div className='meta'>
                                <span className='short'>{ abbreviation }</span>
                                <span className='semester'>
                                    { `Semesters: ` }
                                    <span className='semester-count'>{ semester }</span>
                                </span>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>

        <SYLLABUS.Provider value={ syllabusObject }>
            { ( activePopupId !== 0 ) && ! editPopupStatus && formVisibility && <Popup /> }
            { editPopupStatus && <EditPopup /> }
        </SYLLABUS.Provider>

    </main>
}

/**
 * MARK: POPUP
 */
const Popup = () => {
    const syllabusContext = useContext( SYLLABUS ),
        { filteredSubjects, popupDetails, setActiveSemester, activeSemester, role, setEditPopupStatus, setActiveSubject } = syllabusContext,
        { name, abbreviation, semester } = popupDetails,
        semesterArr = new Array( semester ).fill( 0 )

    /**
     * Handle Semester Click
     */
    const handleSemesterClick = ( id ) => {
        setActiveSemester( id )
    }

    /**
     * Handle edit click
     */
    const handleEditClick = ( obj ) => {
        setEditPopupStatus( true )
        setActiveSubject( obj )
    }
    
    return <div className='popup-wrapper'>
        <h2 className='title'>{ `${ name } ( ${ abbreviation } )` }</h2>
        <div className='details-wrapper'>
            <div className='semester-list'>
                {
                    semesterArr?.map(( val, index ) => {
                        let count = index + 1,
                            classes = `semester${( count === activeSemester ) ? ' active' : ''}`
                        return <div key={ index } className={ classes } onClick={() => handleSemesterClick( count )}>
                            { `${ getScript( count ) } semester` }
                        </div>
                    })
                }
            </div>
            <div className='details'>
                <div className='subjects'>
                    <table>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Subject</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredSubjects?.map(( subject, index ) => {
                                    if( subject ) {
                                        let { name, code, file } = subject
                                        return <tr key={ index }>
                                            <td>{ code }</td>
                                            <td>{ name }</td>
                                            <td>
                                                {( role === 'admin' ) && <div className="has-tooltip action" onClick={() => handleEditClick( subject ) }>
                                                    <FontAwesomeIcon className='edit' icon={ faPenToSquare } />
                                                    <span className="tooltip-text">Edit</span>
                                                </div> }
                                                <Link to={ file } target="_blank">
                                                    <div className="has-tooltip action">
                                                        <FontAwesomeIcon className='view' icon={ faEye } />
                                                        <span className="tooltip-text">View</span>
                                                    </div>
                                                </Link>
                                            </td>
                                        </tr>
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}

/**
 * MARK: Edit Popup
 */
const EditPopup = () => {
    const syllabusContext = useContext( SYLLABUS ),
        { setIsUpdated, setEditPopupStatus, activeSubject } = syllabusContext,
        { id, file } = activeSubject,
        fileRef = useRef( null ),
        [ link, setLink ] = useState( null ),
        [ isSaveDisabled, setIsSaveDisabled ] = useState( true ),
        [ isSaved, setIsSaved ] = useState( false ),
        [ newFileAdded, setNewFileAdded ] = useState( false ),
        [ isReplaceDisabled, setIsReplaceDisabled ] = useState( file ? false : true ),
        [ isAddDisabled, setIsAddDisabled ] = useState( file ? true : false )

    /**
     * Handle Replace Change
     */    
    const handleChange = ( event ) => {
        let files = event.target.files
        if( files ) {
            setLink( files[0] )
            setIsSaveDisabled( false )
            setIsSaved( false )
            setNewFileAdded( true )
            setIsAddDisabled( true )
            setIsReplaceDisabled( false )
        }
    }

    /* Handle Save */
    const handleSave = ( event ) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append( 'image', link ); // 'image' should match your backend field name
        ourFetch({
            api: '/upload',
            callback: uploadCallback,
            headersMultipart: true,
            body: formData
        })
    }

    /**
     * Upload Callback
     */
    const uploadCallback = ( data ) => {
        let { imageUrl, success } = data,
            newPdf = `http://localhost:5000${ data.imageUrl }`
        if( success ) {
            ourFetch({
                api: '/update-subject-syllabus',
                body: JSON.stringify({ id, file: newPdf }),
                callback: updateCallback
            })
            setIsSaved( true )
            setIsSaveDisabled( true )
        }
    }

    /**
     * Update Callback
     */
    const updateCallback = ( data ) => {
        let { success } = data
        if( success ) setIsUpdated( true )
    }

    /**
     * Get url from file
     */
    const getUrl = ( file ) => {
        return URL.createObjectURL(
            new Blob([ file ], { type: "application/pdf" })
        )
    }

    /**
     * Handle close click
     */
    const handleCloseClick = () => {
        setEditPopupStatus( false )
    }

    return <div className='edit-popup-wrapper popup-wrapper'>
        <h2 className="title">Edit this file.</h2>
        { ( ! file && ! newFileAdded ) ? 
            <div className="pdf no-pdf"></div> :
            <div className="pdf pdf-viewer">
                {
                    newFileAdded ?
                    <iframe src={ getUrl( link ) } width="100%" height="100%" allowFullScreen="true" />:
                    <iframe src={ file ? file : getUrl( link ) } width="100%" height="100%" allowFullScreen="true" />
                }
            </div>
        }
        <div className="buttons">
            <button className="action add" disabled={ isAddDisabled } onClick={() => fileRef.current.click()}>
                <FontAwesomeIcon icon={ faCirclePlus } />
                <span className="label">Add</span>
            </button>
            <button className="action replace" disabled={ isReplaceDisabled } onClick={() => fileRef.current.click()}>
                <FontAwesomeIcon icon={ faRotate } />
                <span className="label">Replace</span>
            </button>
            <button className="action save" onClick={ handleSave } disabled={ isSaveDisabled }>
                <FontAwesomeIcon icon={ isSaved ? faCircleCheck : faFloppyDisk } />
                { isSaved ? 
                    <span className="label">Saved</span> :
                    <span className="label">Save</span>
                }
            </button>
            <button className="action close" onClick={ handleCloseClick }>
                <FontAwesomeIcon icon={ faCircleXmark } />
                <span className="label">Close</span>
            </button>
            <input type="file" name="add" accept="application/pdf" id="add" ref={ fileRef } onChange={ handleChange } hidden />
        </div>
    </div>
}