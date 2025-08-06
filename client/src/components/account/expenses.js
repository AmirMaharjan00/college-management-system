import { useEffect, useState, useMemo } from "react"
import { Breadcrumb } from "../components"
import { TodaysDate } from "../includes/components-hooks"
import { RowAndSearch, Pagination } from '../library/books'
import { fetchCallback, ourFetch } from "../functions"
import { useDate } from "../includes/hooks"
import { Link } from "react-router-dom"

/**
 * Expenses
 */
export const Expenses = () => {
    const [ expenses, setExpenses ] = useState([]),
        [ searched, setSearched ] = useState( '' ),
        [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ activePage, setActivePage ] = useState( 1 ),
        totalPages = new Array( Math.ceil( expenses.length / rowsPerPage ) ).fill( 0 ),
        filteredExpenses = useMemo(() => {
            if( searched === '' ) return expenses.slice( ( activePage - 1 ) * rowsPerPage, ( activePage * rowsPerPage ) );
            let newAccountsList = expenses.reduce(( val, item ) => {
                let { name } = item
                if(  name.toLowerCase().includes( searched ) ) {
                    val = [ ...val, item ]
                }
                return val
            }, [])
            return newAccountsList.slice( 0, 10 );
        }, [ searched, expenses, activePage, rowsPerPage ])

    useEffect(() => {
        ourFetch({
            api: '/expenses',
            callback: fetchCallback,
            setter: setExpenses
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

    return <main className="cmg-main expense" id="cmg-main">
        
        <div className='page-header'>
                
            <Breadcrumb 
                headLabel = 'Expense Tracking'
                currentPageLabel = 'Expenses'
            />

            <TodaysDate />

        </div>

        <RowAndSearch 
            rowsPerPage = { rowsPerPage }
            setRowsPerPage = { setRowsPerPage }
            setSearched = { setSearched }
        />

        <Table
            filteredExpenses = { filteredExpenses }
        />

        <Pagination
            books = { filteredExpenses }
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
        { filteredExpenses } = props

    return <table className='table-wrapper' id="cmg-table">
        <thead>
            <tr>
                <th>S.No</th>
                <th>Transaction Id</th>
                <th>Name ( Id )</th>
                <th>Amount</th>
                <th>Purpose</th>
                <th>Message</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {
                filteredExpenses.length ? filteredExpenses.map(( expense, index ) => {
                    console.log( expense )
                    let count = index + 1,
                        { id, userId, name, amount, message, type, purpose, date, profile } = expense

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
                        <td>{ purpose.slice( 0, 1 ).toUpperCase() + purpose.slice( 1 ) }</td>
                        <td>{ message }</td>
                        <td>{ convertedDate( date ) }</td>
                    </tr>
                }) : <tr className="no-records">
                    <td colSpan="7">No records</td>
                </tr>
            }
        </tbody>
    </table>
}