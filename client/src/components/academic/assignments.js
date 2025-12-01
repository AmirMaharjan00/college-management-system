import { Breadcrumb, Pagination, RowAndSearch, ActionButton } from "../components"
import { TodaysDate } from "../includes/components-hooks"
import { useContext, useState, createContext, useEffect, useMemo, useRef } from "react"
import { GLOBALCONTEXT } from "../../App"
import { useDate } from "../includes/hooks"
import { Link } from "react-router-dom"
import { fetchCallback, getScript, ourFetch } from "../functions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faPenToSquare, faEye, faTrash } from "@fortawesome/free-solid-svg-icons"
const AssignmentsContext = createContext()

/**
 * Assignments
 */
export const Assignments = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { formVisibility, loggedInUser, setOverlay, setHeaderOverlay, setFormVisibility } = Global,
        { role, id: userId } = loggedInUser,
        [ formMode, setFormMode ] = useState( 'new' ),
        [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ searched, setSearched ] = useState( '' ),
        [ courses, setCourses ] = useState([]),
        [ assignments, setAssignments ] = useState({}),
        [ fileObj, setFileObj ] = useState( '' ),
        [ insertSuccess, setInsertSuccess ] = useState( false ),
        [ activeAssignment, setActiveAssignment ] = useState( null ),
        [ activeAssignmentObj, setActiveAssignmentObj ] = useState(() => {
            if( assignments.length > 0 ) {
                return assignments.reduce(( _thisVal, assignment, index ) => {
                    if( index === activeAssignment ) _thisVal = assignment
                    return _thisVal
                }, {})
            } else {
                return {
                    title: '',
                    assignedTo: userId,
                    semester: 1,
                    startDate: '',
                    endDate: '',
                    file: '',
                    status: 'pending'
                }
            }
        }, [ activeAssignment, assignments ]),
        courseSemesters = useMemo(() => {
            let { assignedTo } = activeAssignmentObj,
                semester = courses.reduce(( _thisVal, course ) => {
                    let { id } = course
                    if( assignedTo == id ) _thisVal = course.semester
                    return _thisVal
                }, 0)
            return new Array( semester ).fill( 0 )
        }, [ courses, activeAssignmentObj ]),
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
            role
        }

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

            <RowAndSearch 
                rowsPerPage = { rowsPerPage }
                setRowsPerPage = { setRowsPerPage }
                setSearched = { setSearched }
            />

            <Table />

            { formVisibility && <Form /> }
        </AssignmentsContext.Provider>
    </main>
}

/**
 * MARK: TABLE
 */
const Table = () => {
    const assignmentContext = useContext( AssignmentsContext ),
        { assignments, setFormMode, setOverlay, setHeaderOverlay, setFormVisibility, role } = assignmentContext,
        { convertedDate } = useDate()

    /**
     * Handle View Click
     */
    const handleViewClick = ( item ) => {
        setFormVisibility( true )
        setOverlay( true )
        setHeaderOverlay( true )
        setFormMode( 'view' )
    }

    return <table className='table-wrapper' id="cmg-table">
        <thead>
            <tr>
                <th>S.No</th>
                <th>ID</th>
                <th>Title</th>
                <th>Assigned By</th>
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
                        { title, assignmentId, assignedTo, teacherId, semester, abbreviation = 'BCA', teacherName, startDate, endDate, file, status } = assignment

                    return <tr key={ index }>
                        <td>{ `${ count }.` }</td>
                        <td>{ assignmentId }</td>
                        <td>{ title }</td>
                        <td>{ `${ teacherName } ( ${ teacherId } )` }</td>
                        <td>{ `${ abbreviation } ${ getScript( semester ) } Semester` }</td>
                        <td>{ convertedDate( startDate ) }</td>
                        <td>{ convertedDate( endDate ) }</td>
                        <td>{ status }</td>
                        <td>
                            { ( role === 'admin' ) && <div className="has-tooltip action" >
                                <FontAwesomeIcon className='edit' icon={ faPenToSquare } />
                                <span className="tooltip-text">Edit</span>
                            </div> }
                            <div className="has-tooltip action">
                                <FontAwesomeIcon className='view' icon={ faEye } />
                                <span className="tooltip-text">View</span>
                            </div>
                            { ( role === 'admin' ) && <div className="has-tooltip action">
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
        { activeAssignmentObj, setActiveAssignmentObj, courses, courseSemesters, fileObj, setFileObj, userId, setInsertSuccess, setFormMode, setOverlay, setHeaderOverlay, setFormVisibility } = assignmentContext,
        { title, assignedTo, semester, startDate, endDate, file, status } = activeAssignmentObj,
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
            </div>
            <div className="form-flex">
                <div className="form-field">
                    <label className="form-label">
                        Start Date
                        <span className="form-error">*</span>
                    </label>
                    <input type="date" name="startDate" value={ startDate } onChange={ handleChange } required />
                </div>
                <div className="form-field">
                    <label className="form-label">
                        End Date
                        <span className="form-error">*</span>
                    </label>
                    <input type="date" name="endDate" value={ endDate } onChange={ handleChange } required />
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