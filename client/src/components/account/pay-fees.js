import { useEffect, useState, useMemo } from "react"
import { Breadcrumb } from "../components"
import { TodaysDate } from "../includes/components-hooks"
import { RowAndSearch, Pagination } from '../library/books'
import { fetchCallback, ourFetch } from "../functions"
import { useDate } from "../includes/hooks"
import { Link } from "react-router-dom"

/**
 * Pay Fees
 */
export const PayFees = () => {
    const [ fees, setFees ] = useState([]),
        [ searched, setSearched ] = useState( '' ),
        [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ activePage, setActivePage ] = useState( 1 ),
        totalPages = new Array( Math.ceil( fees.length / rowsPerPage ) ).fill( 0 ),
        filteredFees = useMemo(() => {
            if( searched === '' ) return fees.slice( ( activePage - 1 ) * rowsPerPage, ( activePage * rowsPerPage ) );
            let newAccountsList = fees.reduce(( val, item ) => {
                let { name } = item
                if(  name.toLowerCase().includes( searched ) ) {
                    val = [ ...val, item ]
                }
                return val
            }, [])
            return newAccountsList.slice( 0, 10 );
        }, [ searched, fees, activePage, rowsPerPage ])

    useEffect(() => {
        ourFetch({
            api: '/all-fees',
            callback: fetchCallback,
            setter: setFees
        })
    }, [])

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

    return <main className="cmg-main fees" id="cmg-main">
        
        <div className='page-header'>
                        
            <Breadcrumb 
                headLabel = 'Fees'
                currentPageLabel = 'Fees'
            />

            <TodaysDate />

        </div>

        <RowAndSearch 
            rowsPerPage = { rowsPerPage }
            setRowsPerPage = { setRowsPerPage }
            setSearched = { setSearched }
        />

        <Table
            filteredFees = { filteredFees }
        />

        <Pagination
            books = { filteredFees }
            totalPages = { totalPages }
            activePage = { activePage }
            setActivePage = { setActivePage }
            handlePagination = { handlePagination }
        />

    </main>
}

/**
 * MARK: TABLE
 */
const Table = ( props ) => {
    const { convertedDate } = useDate(),
        { filteredFees } = props

    return <table className='table-wrapper' id="cmg-table">
        <thead>
            <tr>
                <th>S.No</th>
                <th>Transaction Id</th>
                <th>Name ( Id )</th>
                <th>Amount</th>
                <th>Message</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {
                filteredFees.length ? filteredFees.map(( fee, index ) => {
                    let count = index + 1,
                        { id, userId, name, amount, message, type, purpose, date, profile } = fee

                    return <tr key={ index }>
                        <td>{ `${ count }.` }</td>
                        <td>{ id }</td>
                        <td>
                            <div className='profile'>
                                <figure>
                                    <img src={ profile } alt={ name }/>
                                </figure>
                                <span className='name'><Link to="/dashboard/user-details" state={{ user: userId }}>{ `${ name } ( ${ userId } )` }</Link></span>
                            </div>
                        </td>
                        <td>{ `Rs. ${ amount }` }</td>
                        <td>{ message }</td>
                        <td>{ convertedDate( date ) }</td>
                    </tr>
                }) : <tr className="no-records">
                    <td colSpan="6">No records</td>
                </tr>
            }
        </tbody>
    </table>
}