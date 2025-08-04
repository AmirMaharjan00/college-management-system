import { useEffect, useState, useMemo, useContext } from "react"
import { Breadcrumb, Pagination, RowAndSearch, ActionButton } from "../components"
import { fetchCallback, ourFetch, getScript } from "../functions"
import { useDate } from "../includes/hooks"
import '../assets/scss/table.scss'
import '../assets/scss/academic.scss'
import { AddNewCourseSubject } from '../forms/add-new-cs'
import { GLOBALCONTEXT } from "../../App"

/**
 * Courses
 */
export const Courses = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { formVisibility, formSuccess } = Global,
        [ courses, setCourses ] = useState([]),
        [ searched, setSearched ] = useState( '' ),
        [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ activePage, setActivePage ] = useState( 1 ),
        [ formMode, setFormMode ] = useState( 'new' ),
        totalPages = new Array( Math.ceil( courses.length / rowsPerPage ) ).fill( 0 ),
        filteredCourses = useMemo(() => {
            if( searched === '' ) return courses.slice( ( activePage - 1 ) * rowsPerPage, ( activePage * rowsPerPage ) );
            let newAccountsList = courses.reduce(( val, item ) => {
                let { name } = item
                if(  name.toLowerCase().includes( searched ) ) {
                    val = [ ...val, item ]
                }
                return val
            }, [])
            return newAccountsList.slice( 0, 10 );
        }, [ searched, courses, activePage, rowsPerPage ])
    
    useEffect(() => {
        ourFetch({
            api: '/courses',
            callback: fetchCallback,
            setter: setCourses
        })
    }, [ formSuccess ])

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
    
    return <main className="cmg-main courses" id="cmg-main">
        <div className='page-header'>

            <Breadcrumb
                headLabel = 'Courses'
                currentPageLabel = 'Courses'
                middle = { false }
            />

            <div className='action-buttons'>

                <ActionButton 
                    setFormMode = { setFormMode }
                    label = { 'Add Course' }
                />

            </div>

        </div>

        <RowAndSearch 
            rowsPerPage = { rowsPerPage }
            setRowsPerPage = { setRowsPerPage }
            setSearched = { setSearched }
        />

        <Table
            items = { filteredCourses }
            setFormMode = { setFormMode }
        />

        <Pagination
            books = { filteredCourses }
            totalPages = { totalPages }
            activePage = { activePage }
            setActivePage = { setActivePage }
            handlePagination = { handlePagination }
        />

        { formVisibility && <AddNewCourseSubject /> }
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
                <th>Course ID</th>
                <th>Name</th>
                <th>Abbreviation</th>
                <th>Semester</th>
                <th>Duration</th>
                <th>Cost</th>
                <th>Monthly Cost</th>
                <th>Semester Cost</th>
                <th>Registered Date</th>
            </tr>
        </thead>
        <tbody>
            {
                items.length ? items.map(( account, index ) => {
                    let count = index + 1,
                        { id, name, abbreviation, semester, duration, cost, monthlyCost, semesterCost, registered_date } = account

                    return <tr key={ index }>
                        <td>{ `${ count }.` }</td>
                        <td>{ id }</td>
                        <td>{ name }</td>
                        <td>{ abbreviation }</td>
                        <td> { getScript( semester ) }</td>
                        <td>{ `${ duration } years` }</td>
                        <td>{ `Rs. ${ cost }` }</td>
                        <td>{ `Rs. ${ monthlyCost }` }</td>
                        <td>{ `Rs. ${ semesterCost }` }</td>
                        <td>{ convertedDate( registered_date ) }</td>
                    </tr>
                }) : <div className="no-records">No records</div>
            }
        </tbody>
    </table>
}