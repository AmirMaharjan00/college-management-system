import { useEffect, useState, useMemo, useContext } from "react"
import { Breadcrumb, Pagination, RowAndSearch, ActionButton } from "../components"
import { fetchCallback, ourFetch, getScript } from "../functions"
import { useDate } from "../includes/hooks"
import '../assets/scss/table.scss'
import '../assets/scss/academic.scss'
import { AddNewCourseSubject } from '../forms/add-new-cs'
import { GLOBALCONTEXT } from "../../App"

/**
 * Subjects
 */
export const Subjects = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { formVisibility, formSuccess } = Global,
        [ subjects, setSubjects ] = useState([]),
        [ searched, setSearched ] = useState( '' ),
        [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ activePage, setActivePage ] = useState( 1 ),
        [ formMode, setFormMode ] = useState( 'new' ),
        totalPages = new Array( Math.ceil( subjects.length / rowsPerPage ) ).fill( 0 ),
        filteredSubjects = useMemo(() => {
            if( searched === '' ) return subjects.slice( ( activePage - 1 ) * rowsPerPage, ( activePage * rowsPerPage ) );
            let newAccountsList = subjects.reduce(( val, item ) => {
                let { name } = item
                if(  name.toLowerCase().includes( searched ) ) {
                    val = [ ...val, item ]
                }
                return val
            }, [])
            return newAccountsList.slice( 0, 10 );
        }, [ searched, subjects, activePage, rowsPerPage ])
    
    useEffect(() => {
        ourFetch({
            api: '/subjects',
            callback: fetchCallback,
            setter: setSubjects
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
    
    return <main className="cmg-main subjects" id="cmg-main">
        <div className='page-header'>

            <Breadcrumb
                headLabel = 'Subjects'
                currentPageLabel = 'Subjects'
                middle = { false }
            />

            <div className='action-buttons'>

                <ActionButton 
                    setFormMode = { setFormMode }
                    label = { 'Add Subject' }
                />

            </div>

        </div>

        <RowAndSearch 
            rowsPerPage = { rowsPerPage }
            setRowsPerPage = { setRowsPerPage }
            setSearched = { setSearched }
        />

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
                        <td>{ name }</td>
                        <td>{ `${ abbreviation } ( ${ course_id } )` }</td>
                        <td> { getScript( semester ) }</td>
                        <td>{ getScript( year ) }</td>
                        <td>{ convertedDate( registered_date ) }</td>
                    </tr>
                }) : <tr className="no-records">
                    <td colspan="7">No records</td>
                </tr>
            }
        </tbody>
    </table>
}