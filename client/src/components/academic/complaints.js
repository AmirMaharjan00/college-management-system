import { useEffect, useState, useMemo, useContext } from "react"
import { Breadcrumb, Pagination, RowAndSearch } from "../components"
import { fetchCallback, ourFetch, getScript } from "../functions"
import { TodaysDate } from "../includes/components-hooks"
import { useDate } from "../includes/hooks"
import '../assets/scss/table.scss'
import '../assets/scss/academic.scss'
import { AddNewCourseSubject } from '../forms/add-new-cs'
import { GLOBALCONTEXT } from "../../App"

/**
 * Complaints
 */
export const Complaints = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { formVisibility, formSuccess } = Global,
        [ complaints, setComplaints ] = useState([]),
        [ searched, setSearched ] = useState( '' ),
        [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ activePage, setActivePage ] = useState( 1 ),
        [ formMode, setFormMode ] = useState( 'new' ),
        totalPages = new Array( Math.ceil( complaints.length / rowsPerPage ) ).fill( 0 ),
        filteredComplaints = useMemo(() => {
            if( searched === '' ) return complaints.slice( ( activePage - 1 ) * rowsPerPage, ( activePage * rowsPerPage ) );
            let newList = complaints.reduce(( val, item ) => {
                let { name } = item
                if(  name.toLowerCase().includes( searched ) ) {
                    val = [ ...val, item ]
                }
                return val
            }, [])
            return newList.slice( 0, 10 );
        }, [ searched, complaints, activePage, rowsPerPage ])
    
    useEffect(() => {
        ourFetch({
            api: '/complaints',
            callback: fetchCallback,
            setter: setComplaints
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
    
    return <main className="cmg-main complaints" id="cmg-main">
        <div className='page-header'>

            <Breadcrumb
                headLabel = 'Complaints'
                currentPageLabel = 'Complaints'
                middle = { false }
            />

            <TodaysDate />

        </div>

        <RowAndSearch 
            rowsPerPage = { rowsPerPage }
            setRowsPerPage = { setRowsPerPage }
            setSearched = { setSearched }
        />

        <Table
            items = { filteredComplaints }
            setFormMode = { setFormMode }
        />

        <Pagination
            books = { filteredComplaints }
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
                <th>ID</th>
                <th>By</th>
                <th>Against</th>
                <th>Registered Date</th>
                <th>View</th>
            </tr>
        </thead>
        <tbody>
            {
                items.length ? items.map(( account, index ) => {
                    let count = index + 1,
                        { id, name, by, against, registered_date } = account

                    return <tr key={ index }>
                        <td>{ `${ count }.` }</td>
                        <td>{ id }</td>
                        <td>{ name }</td>
                        <td>{ by }</td>
                        <td>{ against }</td>
                        <td>{ convertedDate( registered_date ) }</td>
                        <td>
                            <button>View</button>
                        </td>
                    </tr>
                }) : <div className="no-records">No records</div>
            }
        </tbody>
    </table>
}