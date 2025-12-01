import { Breadcrumb, Pagination, RowAndSearch, ActionButton } from "../components"
import { TodaysDate } from "../includes/components-hooks"
import { useContext, useState, createContext, useEffect, useMemo } from "react"
import { GLOBALCONTEXT } from "../../App"
import { useDate } from "../includes/hooks"
import { Link } from "react-router-dom"
import { fetchCallback, getScript, ourFetch } from "../functions"
const AssignmentsContext = createContext()

/**
 * Assignments
 */
export const Assignments = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { formVisibility, loggedInUser, setOverlay, setHeaderOverlay, setFormVisibility } = Global,
        { role } = loggedInUser,
        [ formMode, setFormMode ] = useState( 'new' ),
        [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ searched, setSearched ] = useState( '' ),
        [ courses, setCourses ] = useState([]),
        [ activeCourse, setActiveCourse ] = useState( 0 ),
        courseSemesters = useMemo(() => {
            let semester = courses.reduce(( _thisVal, course, index ) => {
                if( index === activeCourse ) _thisVal = course.semester
                return _thisVal
            }, 0)
            return new Array( semester ).fill( 0 )
        }, [ courses ]),
        [ assignments, setAssignments ] = useState({}),
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
                    assignedTo: '',
                    semester: '',
                    startDate: '',
                    endDate: '',
                    file: '',
                    status: ''
                }
            }
        }, [ activeAssignment, assignments ]),
        assignmentObject = {
            assignments,
            formMode, setFormMode,
            setOverlay, setHeaderOverlay, setFormVisibility,
            activeAssignmentObj, setActiveAssignmentObj,
            courses,
            courseSemesters
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
    }, [])

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
        { assignments, setFormMode, setOverlay, setHeaderOverlay, setFormVisibility } = assignmentContext,
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
                        <td><button>View</button></td>
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
        { activeAssignmentObj, setActiveAssignmentObj, courses, courseSemesters } = assignmentContext,
        { title, assignedTo, semester, startDate, endDate, file, status } = activeAssignmentObj

    /**
     * Handle Submit
     */
    const handleSubmit = () => {

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
                <input type="text" placeholder="Chapter 1 assignment" name="title" value={ title } required />
            </div>
            <div className="form-flex">
                <div className="form-field">
                    <label className="form-label">
                        Courses
                        <span className="form-error">*</span>
                    </label>
                    <select name="assignedTo" id="assignedTo" value={ assignedTo }>
                        {
                            courses.map(( course ) => {
                                let { id, abbreviation } = course
                                return <option value={ id }>{ `${ abbreviation } ( ID: ${ id } )` }</option>
                            })
                        }
                    </select>
                </div>
                <div className="form-field">
                    <label className="form-label">
                        Semester
                        <span className="form-error">*</span>
                    </label>
                    <select name="assignedTo" id="assignedTo" value={ semester }>
                        {
                            courseSemesters.map(( sem, index ) => {
                                let count = index + 1
                                return <option value={ count }>{ `${ getScript( count ) } Semester` }</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="form-flex">
                <div className="form-field">
                    <label className="form-label">
                        Courses
                        <span className="form-error">*</span>
                    </label>
                    <input type="date" name="startDate" value={ startDate } required />
                </div>
                <div className="form-field">
                    <label className="form-label">
                        Semester
                        <span className="form-error">*</span>
                    </label>
                    <input type="date" name="endDate" value={ endDate } required />
                </div>
            </div>
            <div className="form-field">
                <label className="form-label">
                    Add Attachment
                    <span className="form-error">*</span>
                </label>
                <input type="file" name="file" value={ file } required hidden/>
                <div className="no-file"></div>
            </div>
            <input type="submit" value={ 'Add Assignment' } />
        </form>
    </div>
}