import { useEffect, useState, useMemo } from "react"
import { Breadcrumb } from "./index"
import { TodaysDate } from "../includes/components-hooks"
import { RowAndSearch, Pagination } from '../library/books'
import { fetchCallback, ourFetch } from "../functions"
import { useDate } from "../includes/hooks"

/**
 * History
 */
export const History = () => {
    const [ accounts, setAccounts ] = useState([]),
        [ searched, setSearched ] = useState( '' ),
        [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ activePage, setActivePage ] = useState( 1 ),
        totalPages = new Array( Math.ceil( accounts.length / rowsPerPage ) ).fill( 0 ),
        filteredAccounts = useMemo(() => {
            if( searched === '' ) return accounts.slice( ( activePage - 1 ) * rowsPerPage, ( activePage * rowsPerPage ) );
            let newAccountsList = accounts.reduce(( val, account ) => {
                let { name } = account
                if(  name.toLowerCase().includes( searched ) ) {
                    val = [ ...val, account ]
                }
                return val
            }, [])
            return newAccountsList.slice( 0, 10 );
        }, [ searched, accounts, activePage, rowsPerPage ])

    useEffect(() => {
        ourFetch({
            api: '/accounts',
            callback: fetchCallback,
            setter: setAccounts
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

    return <main className="cmg-main history" id="cmg-main">

        <div className='page-header'>
        
            <Breadcrumb 
                headLabel = 'History'
                currentPageLabel = 'History'
            />

            <TodaysDate />

        </div>

        <RowAndSearch 
            rowsPerPage = { rowsPerPage }
            setRowsPerPage = { setRowsPerPage }
            setSearched = { setSearched }
        />

        <Table
            filteredAccounts = { filteredAccounts }
        />

        <Pagination
            books = { filteredAccounts }
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
        { filteredAccounts } = props

    return <table className='table-wrapper'>
        <thead>
            <tr>
                <th>S.No</th>
                <th>Transaction Id</th>
                <th>Name ( Id )</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Purpose</th>
                <th>Message</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {
                filteredAccounts.map(( account, index ) => {
                    let count = index + 1,
                        { id, userId, name, amount, message, type, purpose, date } = account

                    return <tr key={ index }>
                        <td>{ `${ count }.` }</td>
                        <td>{ id }</td>
                        <td>{ `${ name } ( ${ userId } )` }</td>
                        <td>{ `Rs. ${ amount }` }</td>
                        <td>
                            <span className={ `type ${ type }` }>{ type.slice( 0, 1 ).toUpperCase() + type.slice( 1 ) }</span>
                        </td>
                        <td>{ purpose.slice( 0, 1 ).toUpperCase() + purpose.slice( 1 ) }</td>
                        <td>{ message }</td>
                        <td>{ convertedDate( date ) }</td>
                    </tr>
                })
            }
        </tbody>
    </table>
}