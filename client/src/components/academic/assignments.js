import { Breadcrumb, Pagination, RowAndSearch, ActionButton } from "../components"
import { TodaysDate } from "../includes/components-hooks"
import { useContext, useState, createContext, useEffect, useMemo, useRef } from "react"
import { GLOBALCONTEXT } from "../../App"
import { useDate } from "../includes/hooks"
import { Link } from "react-router-dom"
import { fetchCallback, getScript, ourFetch, adjustDate } from "../functions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faEye, faTrash, faCircleXmark, faBarsStaggered, faHourglass } from "@fortawesome/free-solid-svg-icons"
const AssignmentsContext = createContext(),
    backUrl = 'http://localhost:5000'

/**
 * Assignments
 */
export const Assignments = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { formVisibility, loggedInUser, setOverlay, setHeaderOverlay, setFormVisibility, formMode, setFormMode, overlay } = Global,
        { role, id: userId } = loggedInUser,
        [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ searched, setSearched ] = useState( '' ),
        [ subjects, setSubjects ] = useState([]),
        [ courses, setCourses ] = useState([]),
        [ assignments, setAssignments ] = useState({}),
        [ fileObj, setFileObj ] = useState( '' ),
        [ insertSuccess, setInsertSuccess ] = useState( false ),
        [ activeAssignment, setActiveAssignment ] = useState( null ),
        defaultValues = {
            title: '',
            assignedTo: 1,
            semester: 1,
            startDate: '',
            endDate: '',
            file: '',
            status: 'pending'
        },
        [ activeAssignmentObj, setActiveAssignmentObj ] = useState( defaultValues ),
        courseSemesters = useMemo(() => {
            let { assignedTo } = activeAssignmentObj,
                semester = courses.reduce(( _thisVal, course ) => {
                    let { id } = course
                    if( assignedTo == id ) _thisVal = course.semester
                    return _thisVal
                }, 0)
            return new Array( semester ).fill( 0 )
        }, [ courses, activeAssignmentObj.assignedTo ]),
        semesterSubjects = useMemo(() => {
            return subjects.reduce(( _thisVal, subject ) => {
                if( subject.semester == activeAssignmentObj.semester && activeAssignmentObj.assignedTo == subject.course_id ) _thisVal = [ ..._thisVal, subject ]
                return _thisVal
            }, [])
        }, [ activeAssignmentObj.semester, activeAssignmentObj.assignedTo , subjects ]),
        assignmentObject = {
            assignments,
            formMode, setFormMode,
            setOverlay, setHeaderOverlay, setFormVisibility,
            activeAssignmentObj, setActiveAssignmentObj,
            courses,
            courseSemesters,
            fileObj, setFileObj,
            userId,
            setInsertSuccess,
            role,
            setActiveAssignment,
            semesterSubjects,
            overlay
        }

    useEffect(() => {
        let test
        if( [ 'view', 'edit' ].includes( formMode ) ) {
            test = assignments.length ? assignments.reduce(( _thisVal, assignment, index ) => {
                if( index === activeAssignment ) _thisVal = assignment
                return _thisVal
            }, {}) : defaultValues
            setFileObj( `${ backUrl }${ test.file }` )
        } else {
            test = defaultValues
            setFileObj( '' )
        }
        setActiveAssignmentObj( test )
    }, [ assignments, activeAssignment, formMode ])

    useEffect(() => {
        ourFetch({
            api: '/all-assignments',
            callback: fetchCallback,
            setter: setAssignments
        })
        ourFetch({
            api: '/courses',
            callback: fetchCallback,
            setter: setCourses
        })
        if( insertSuccess ) setInsertSuccess( false )
    }, [ insertSuccess ])

    useEffect(() => {
        ourFetch({
            api: '/subject-via-course-id',
            callback: fetchCallback,
            setter: setSubjects,
            body: JSON.stringify({ id: activeAssignmentObj.assignedTo })
        })
    }, [ activeAssignmentObj.assignedTo ])

    return <main className="cmg-main assignments" id="cmg-main">
        <AssignmentsContext.Provider value={ assignmentObject }>
            <div className='page-header'>

                <Breadcrumb
                    headLabel = 'Assignments'
                    currentPageLabel = 'Assignments'
                    middle = { false }
                />

                <div className='action-buttons'>
                
                    <ActionButton 
                        setFormMode = { setFormMode }
                        label = { 'Add Assignment' }
                        extendFunction = {() => setFormMode( 'new' )}
                    />

                </div>

            </div>

            <Highlight />

            <RowAndSearch 
                rowsPerPage = { rowsPerPage }
                setRowsPerPage = { setRowsPerPage }
                setSearched = { setSearched }
            />

            <Table />

            { formVisibility && <Form /> }
            { formMode === 'view' && <View /> }
            { formMode === 'delete' && <Delete /> }
        </AssignmentsContext.Provider>
    </main>
}

/**
 * MARK: Highlight
 */
const Highlight = () => {
    return <div className="highlight-wrapper">
        <div className='highlight'>
            <FontAwesomeIcon icon={ faHourglass } className="icon" />
            <div className="highlight-info">
                <span className="status">Pending</span>
                <div className="count-wrap">
                    <span className="text count">{ 1 }</span>
                    <span className="text label">Assignment</span>
                </div>
            </div>
        </div>
        <div className='highlight'>
            <FontAwesomeIcon icon={ faHourglass } className="icon" />
            <div className="highlight-info">
                <span className="status">Completed</span>
                <div className="count-wrap">
                    <span className="text count">{ 1 }</span>
                    <span className="text label">Assignment</span>
                </div>
            </div>
        </div>
        <div className='highlight'>
            <FontAwesomeIcon icon={ faHourglass } className="icon" />
            <div className="highlight-info">
                <span className="status">Expired</span>
                <div className="count-wrap">
                    <span className="text count">{ 1 }</span>
                    <span className="text label">Assignment</span>
                </div>
            </div>
        </div>
        <div className='highlight'>
            <FontAwesomeIcon icon={ faHourglass } className="icon" />
            <div className="highlight-info">
                <span className="status">Pending</span>
                <div className="count-wrap">
                    <span className="text count">{ 1 }</span>
                    <span className="text label">Assignment</span>
                </div>
            </div>
        </div>
    </div>
}

/**
 * MARK: TABLE
 */
const Table = () => {
    const assignmentContext = useContext( AssignmentsContext ),
        { assignments, setFormMode, setOverlay, setHeaderOverlay, setFormVisibility, role, setActiveAssignment } = assignmentContext,
        { convertedDate } = useDate()

    /**
     * Handle View Click
     */
    const handleViewClick = ( item, formModeType ) => {
        if( formModeType === 'edit' ) setFormVisibility( true )
        setOverlay( true )
        setHeaderOverlay( true )
        setFormMode( formModeType )
        setActiveAssignment( item )
    }

    return <table className='table-wrapper' id="cmg-table">
        <thead>
            <tr>
                <th>S.No</th>
                <th>ID</th>
                <th>Title</th>
                <th>Assigned By</th>
                <th>Subject</th>
                <th>Assigned To</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                assignments.length ? assignments.map(( assignment, index ) => {
                    let count = index + 1,
                        { title, assignmentId, subjectId, assignedTo, teacherId, semester, abbreviation = 'BCA', subjectName, teacherName, startDate, endDate, status } = assignment

                    return <tr key={ index }>
                        <td>{ `${ count }.` }</td>
                        <td>{ assignmentId }</td>
                        <td>{ title }</td>
                        <td>{ `${ teacherName } ( ${ teacherId } )` }</td>
                        <td>{ `${ subjectName } ( ${ subjectId } )` }</td>
                        <td>{ `${ abbreviation } ${ getScript( semester ) } Semester` }</td>
                        <td>{ convertedDate( startDate ) }</td>
                        <td>{ convertedDate( endDate ) }</td>
                        <td>{ status.slice( 0, 1).toUpperCase() + status.slice( 1 ) }</td>
                        <td className="actions">
                            { ( role === 'admin' ) && <div className="has-tooltip action edit" onClick={() => handleViewClick( index, 'edit' )}>
                                <FontAwesomeIcon className='edit' icon={ faPenToSquare } />
                                <span className="tooltip-text">Edit</span>
                            </div> }
                            <div className="has-tooltip action view" onClick={() => handleViewClick( index, 'view' )}>
                                <FontAwesomeIcon className='view' icon={ faEye } />
                                <span className="tooltip-text">View</span>
                            </div>
                            { ( role === 'admin' ) && <div className="has-tooltip action delete" onClick={() => handleViewClick( index, 'delete' )}>
                                <FontAwesomeIcon className='delete' icon={ faTrash } />
                                <span className="tooltip-text">Delete</span>
                            </div> }
                        </td>
                    </tr>
                }) : <tr className="no-records">
                    <td colSpan="7">No records</td>
                </tr>
            }
        </tbody>
    </table>
}

/**
 * MARK: Form
 */
const Form = () => {
    const assignmentContext = useContext( AssignmentsContext ),
        { activeAssignmentObj, setActiveAssignmentObj, courses, courseSemesters, fileObj, setFileObj, userId, setInsertSuccess, setFormMode, setOverlay, setHeaderOverlay, setFormVisibility, semesterSubjects } = assignmentContext,
        { title, assignedTo, semester, startDate, endDate, file, status, subjectId } = activeAssignmentObj,
        fileRef = useRef()

    /**
     * Handle Submit
     */
    const handleSubmit = ( event ) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append( 'image', activeAssignmentObj.file ); // 'image' should match your backend field name
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
        let { success, imageUrl } = data
        if( success ) {
            ourFetch({
                api: '/insert-assignment',
                callback: insertCallback,
                body: JSON.stringify({
                    ...activeAssignmentObj,
                    assignedBy: userId,
                    file: imageUrl
                })
            })
        }
    }

    /**
     * Insert Callback
     */
    const insertCallback = ( data ) => {
        if( data.success ) {
            setInsertSuccess( true )
            setFormMode( 'new' )
            setOverlay( false )
            setHeaderOverlay( false )
            setFormVisibility( false )
        }
    }

    /**
     * Handle Change
     */
    const handleChange = ( event ) => {
        let { name, value, files } = event.target
        if( name === 'file' ) {
            setFileObj( URL.createObjectURL( files[0] ) )
            setActiveAssignmentObj({
                ...activeAssignmentObj,
                [ name ]: files[0]
            })
        } else {
            setActiveAssignmentObj({
                ...activeAssignmentObj,
                [ name ]: value
            })
        }
    }

    return <div className="cmg-form-wrapper" id="cmg-form-wrapper">
        <form method="POST" encType="multipart/form-data" onSubmit={ handleSubmit }>
            <div className="form-head">
                <h2 className="form-title">Add an Assignment</h2>
                <p className="form-exceprt">Please fill the details below.</p>
            </div>
            <div className="form-field">
                <label className="form-label">
                    Title
                    <span className="form-error">*</span>
                </label>
                <input type="text" placeholder="Chapter 1 assignment" name="title" value={ title } onChange={ handleChange } required />
            </div>
            <div className="form-flex">
                <div className="form-field">
                    <label className="form-label">
                        Courses
                        <span className="form-error">*</span>
                    </label>
                    <select name="assignedTo" id="assignedTo" value={ assignedTo } onChange={ handleChange }>
                        {
                            courses.map(( course ) => {
                                let { id, abbreviation } = course
                                return <option key={ id } value={ id }>{ `${ abbreviation } ( ID: ${ id } )` }</option>
                            })
                        }
                    </select>
                </div>
                { courseSemesters.length > 1 && <div className="form-field">
                    <label className="form-label">
                        Semester
                        <span className="form-error">*</span>
                    </label>
                    <select name="semester" id="semester" value={ semester } onChange={ handleChange }>
                        {
                            courseSemesters.map(( sem, index ) => {
                                let count = index + 1
                                return <option key={ index } value={ count }>{ `${ getScript( count ) } Semester` }</option>
                            })
                        }
                    </select>
                </div> }
                { semesterSubjects.length > 1 && <div className="form-field">
                    <label className="form-label">
                        Subjects
                        <span className="form-error">*</span>
                    </label>
                    <select name="subjectId" id="subjectId" value={ subjectId } onChange={ handleChange }>
                        {
                            semesterSubjects.map(( subject, index ) => {
                                let { name, id } = subject
                                return <option key={ index } value={ id }>{ name }</option>
                            })
                        }
                    </select>
                </div> }
            </div>
            <div className="form-flex">
                <div className="form-field">
                    <label className="form-label">
                        Start Date
                        <span className="form-error">*</span>
                    </label>
                    <input type="date" name="startDate" value={ adjustDate( startDate ) } onChange={ handleChange } required />
                </div>
                <div className="form-field">
                    <label className="form-label">
                        End Date
                        <span className="form-error">*</span>
                    </label>
                    <input type="date" name="endDate" value={ adjustDate( endDate ) } onChange={ handleChange } required />
                </div>
            </div>
            <div className="form-field">
                <label className="form-label">
                    Add Attachment
                    <span className="form-error">*</span>
                </label>
                <input type="file" name="file" ref={ fileRef } onChange={ handleChange } required hidden/>
                {
                    fileObj ?
                    <iframe src={ fileObj } width="100%" height="100%" allowFullScreen={ true } /> :
                    <div className="no-file" onClick={() => fileRef.current.click() }></div>
                }
            </div>
            <input type="submit" value={ 'Add Assignment' } />
        </form>
    </div>
}

/**
 * MARK: View
 */
const View = () => {
    const assignmentContext = useContext( AssignmentsContext ),
        { activeAssignmentObj, overlay } = assignmentContext,
        { title, semester, abbreviation = 'BCA', subjectName, teacherName, startDate, endDate, status, file } = activeAssignmentObj,
        { convertedDate } = useDate(),
        [ canvas, setCanvas ] = useState( 'left' )

    useEffect(() => {
        if( canvas ) setCanvas( 'none' )
    }, [ overlay ])

    return <div className={ `cmg-popup-wrapper view${ canvas !== 'none' ? ' active' : '' }` }>
        <div className="section-head">
            <FontAwesomeIcon icon={ faBarsStaggered } className="section-icon" onClick={() => setCanvas( 'left' ) } />
            <h2 className="popup-title">{ title }</h2>
        </div>
        <p className="popup-description">{ `By ${ teacherName } for ${ abbreviation }, ${ getScript( semester ) } Semester.` }</p>
        <div className="popup-flex">
            <div className="popup-item">
                <span className="field">Subject: </span>
                <span className="label">{ subjectName }</span>
            </div>
            <div className="popup-item">
                <span className="field">Start: </span>
                <span className="label">{ adjustDate( startDate ) }</span>
            </div>
            <div className="popup-item">
                <span className="field">End: </span>
                <span className="label">{ adjustDate( endDate ) }</span>
            </div>
        </div>
        <div className="popup-item margin-bottom">
            <span className="field">Status: </span>
            <span className="label">{ status.slice( 0, 1 ).toUpperCase() + status.slice( 1 ) }</span>
        </div>
        <div className="submission-wrap">
            <div className="group submitted">
                <h2 className="group-head">Submitted Students</h2>
                <table>
                    <thead>
                        <tr>
                            <th className="head serial-number">S.No</th>
                            <th className="head student">Students</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="head serial-number">1.</td>
                            <td className="head student" onClick={() => setCanvas( 'right' )}>Amir Maharjan</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="group not-submitted">
                <h2 className="group-head">Not Submitted Students</h2>
                <table>
                    <thead>
                        <tr>
                            <th className="head serial-number">S.No</th>
                            <th className="head student">Students</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="head serial-number">1.</td>
                            <td className="head student">Amir Maharjan</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className={ `canvas ${ canvas }` }>
            { canvas !== 'none' && <>
                <iframe src={ `${ backUrl }${ file }` } width="100%" height="100%" allowFullScreen="true" />
                <FontAwesomeIcon icon={ faCircleXmark } className="close-icon" onClick={() => setCanvas( 'none' ) } />
            </> }
        </div>
    </div>
}

/**
 * MARK: Delete
 */
const Delete = () => {
    return <div className="cmg-popup-wrapper delete">
        <h2 className="title">Are you sure you want to delete this assignment ?</h2>
        <p className="description">Once done you can't revert this back.</p>
        <div className="actions">
            <button className="action no">No</button>
            <button className="action yes">Yes</button>
        </div>
    </div>
}