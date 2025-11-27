import { useEffect, useState, useMemo, useContext } from "react"
import { Breadcrumb, Pagination, RowAndSearch, ActionButton } from "../components"
import { fetchCallback, ourFetch, getScript, getOrdinals, removeOrdinals } from "../functions"
import { useDate } from "../includes/hooks"
import '../assets/scss/table.scss'
import '../assets/scss/academic.scss'
import { AddNewCourseSubject } from '../forms/add-new-cs'
import { GLOBALCONTEXT } from "../../App"
import { TodaysDate } from "../includes/components-hooks"
import { Link } from 'react-router-dom'

/**
 * Subjects
 */
export const Subjects = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { formVisibility, formSuccess, loggedInUser } = Global,
        { role, id: userId } = loggedInUser,
        [ subjects, setSubjects ] = useState([]),
        [ courses, setCourses ] = useState([]),
        [ activeCourse, setActiveCourse ] = useState( 'all' ),
        [ semesters, setSemesters ] = useState([]),
        [ activeSem, setActiveSem ] = useState( 0 ),
        [ searched, setSearched ] = useState( '' ),
        [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ activePage, setActivePage ] = useState( 1 ),
        [ formMode, setFormMode ] = useState( 'new' ),
        filteredSubjects = useMemo(() => {
            if( searched === '' && activeCourse !== 'all' ) {
                let activeCourseObj = courses[ activeCourse ],
                    { id: courseId } = activeCourseObj,
                    test = subjects.reduce(( val, item ) => {
                        let { course_id, semester, teacherId } = item
                        if( course_id === courseId ) {
                            if( role === 'teacher' && teacherId === userId ) {
                                val = [ ...val, item ]
                            } else {
                                if( semester === removeOrdinals( activeSem ) ) val = [ ...val, item ]
                                if( removeOrdinals( activeSem ) === 0 ) val = [ ...val, item ]
                            }
                        }
                        return val
                    }, [])
                return test.slice( ( activePage - 1 ) * rowsPerPage, ( activePage * rowsPerPage ) );
            }
            if( searched === '' && activeCourse === 'all' ) {
                let filtered = subjects.reduce(( val, item ) => {
                    let { teacherId } = item
                    if( role === 'teacher' && teacherId === userId ) val = [  ...val, item ]
                    if( role === 'admin' ) val = [  ...val, item ]
                    return val
                }, [])
                return filtered.slice( ( activePage - 1 ) * rowsPerPage, ( activePage * rowsPerPage ) );
            }
            let newAccountsList = subjects.reduce(( val, item ) => {
                let { name } = item
                if( name.toLowerCase().includes( searched ) ) {
                    val = [ ...val, item ]
                }
                return val
            }, [])
            return newAccountsList.slice( ( activePage - 1 ) * rowsPerPage, ( activePage * rowsPerPage ) );
        }, [ searched, subjects, activePage, rowsPerPage, activeCourse, activeSem ]),
        totalPages = useMemo(() => {
            let totalSubjects = subjects.reduce(( val, item ) => {
                let { teacherId } = item
                if( role === 'teacher' && teacherId === userId ) val = [  ...val, item ]
                if( role === 'admin' ) val = [  ...val, item ]
                return val
            }, [])
            return new Array( Math.ceil( totalSubjects.length / rowsPerPage ) ).fill( 0 )
        }, [ subjects, rowsPerPage, filteredSubjects ])
    
    useEffect(() => {
        ourFetch({
            api: '/subjects',
            callback: fetchCallback,
            setter: setSubjects
        })
        ourFetch({
            api: '/courses',
            callback: fetchCallback,
            setter: setCourses
        })
    }, [ formSuccess ])

    useEffect(() => {
        // console.log( activeCourse )
        if( activeCourse !== 'all' ) {
            let firstCourse = courses[ activeCourse ],
                semArr = Array.from({ length: firstCourse?.semester }, ( _, index ) => index + 1 )
            setSemesters( semArr )
        }
    }, [ courses, activeCourse ])

    /**
     * Handle next & previous
     */
    const handlePagination = ( type ) => {
        if( type === 'next' ) {
            if( activePage >= totalPages.length ) return
            setActivePage( activePage + 1 )
        } else {
            if( activePage <= 1 ) return
            setActivePage( activePage - 1 )
        }
    }

    /**
     * Handle Course Change
     */
    const handleCourseChange = ( event ) => {
        let value = event.target.value
        setActiveCourse( value )
    }

    /**
     * Handle Semester Change
     */
    const handleSemesterChange = ( event ) => {
        let value = event.target.value
        setActiveSem( value )
    }
    
    return <main className="cmg-main subjects" id="cmg-main">
        <div className='page-header'>

            <Breadcrumb
                headLabel = 'Subjects'
                currentPageLabel = 'Subjects'
                middle = { false }
            />

            { 
                role === 'admin' ? <div className='action-buttons'>

                    <ActionButton 
                        setFormMode = { setFormMode }
                        label = { 'Add Subject' }
                    />

                </div> : <TodaysDate />
            }

        </div>

        <RowAndSearch 
            rowsPerPage = { rowsPerPage }
            setRowsPerPage = { setRowsPerPage }
            setSearched = { setSearched }
        >
            <select className="children courses" onChange={ handleCourseChange }>
                <option value="all">All</option>
                {
                    courses?.map(( course, index ) => {
                        let { abbreviation }  = course
                        return <option key={ index } value={ index }>{ abbreviation }</option>
                    })
                }
            </select>
            { activeCourse !== 'all' && <select className="children semesters" onChange={ handleSemesterChange }>
                <option value="0">All</option>
                {
                    semesters?.map(( sem ) => {
                        return <option key={ sem }>{ getOrdinals( sem ) }</option>
                    })
                }
            </select> }
        </RowAndSearch>

        <Table
            items = { filteredSubjects }
            setFormMode = { setFormMode }
        />

        <Pagination
            books = { filteredSubjects }
            totalPages = { totalPages }
            activePage = { activePage }
            setActivePage = { setActivePage }
            handlePagination = { handlePagination }
        />

        { formVisibility && <AddNewCourseSubject
            type = 'subject'
        /> }
    </main>
}

/**
 * MARK: TABLE
 */
const Table = ( props ) => {
    const { convertedDate } = useDate(),
        { items } = props

    return <table className='table-wrapper' id="cmg-table">
        <thead>
            <tr>
                <th>S.No</th>
                <th>Subject ID</th>
                <th>Name</th>
                <th>Course Name</th>
                <th>Semester</th>
                <th>Year</th>
                <th>Registered Date</th>
            </tr>
        </thead>
        <tbody>
            {
                items.length ? items.map(( account, index ) => {
                    let count = index + 1,
                        { id, name, abbreviation, courseName, course_id, semester, year, registered_date } = account

                    return <tr key={ index }>
                        <td>{ `${ count }.` }</td>
                        <td>{ id }</td>
                        <td>
                            <Link to="/dashboard/subject" state={{ subjectId: id }}>{ name }</Link>
                        </td>
                        <td>{ `${ abbreviation } ( ${ course_id } )` }</td>
                        <td> { getScript( semester ) }</td>
                        <td>{ getScript( year ) }</td>
                        <td>{ convertedDate( registered_date ) }</td>
                    </tr>
                }) : <tr className="no-records">
                    <td colSpan="7">No records</td>
                </tr>
            }
        </tbody>
    </table>
}