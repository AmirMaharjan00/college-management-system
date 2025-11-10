import { useState, useEffect, useContext, useMemo } from 'react'
import { fetchCallback, getScript, ourFetch } from '../functions'
import { Breadcrumb } from '../components'
import { TodaysDate } from "../includes/components-hooks"
import { GLOBALCONTEXT } from '../../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons';

/**
 * Syllabus
 */
export const Syllabus = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { setOverlay, setHeaderOverlay, setFormVisibility, formVisibility, loggedInUser } = Global,
        { role } = loggedInUser,
        [ courses, setCourses ] = useState([]),
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
        }, [ subjects, activeSemester ])

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
    }, [ activePopupId ])

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

        { ( activePopupId !== 0 ) && formVisibility && <Popup 
            subjects = { filteredSubjects }
            popupDetails = { popupDetails }
            activeSemester = { activeSemester }
            setActiveSemester = { setActiveSemester }
            role = { role }
        /> }
    </main>
}

/**
 * MARK: POPUP
 */
const Popup = ( props ) => {
    const { subjects, popupDetails, setActiveSemester, activeSemester, role } = props,
        { name, abbreviation, semester } = popupDetails,
        semesterArr = new Array( semester ).fill( 0 )

    /**
     * Handle Semester Click
     */
    const handleSemesterClick = ( id ) => {
        setActiveSemester( id )
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
                                subjects?.map(( subject ) => {
                                    if( subject ) {
                                        let { name, code } = subject
                                        return <tr>
                                            <td>{ code }</td>
                                            <td>{ name }</td>
                                            <td>
                                                <div className="has-tooltip action">
                                                    <FontAwesomeIcon className='edit' icon={ faPenToSquare } />
                                                    <span className="tooltip-text">Edit</span>
                                                </div>
                                                <div className="has-tooltip action">
                                                    <FontAwesomeIcon className='view' icon={ faEye } />
                                                    <span className="tooltip-text">View</span>
                                                </div>
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