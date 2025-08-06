import { useState, useMemo, useEffect, useContext } from 'react'
import { Breadcrumb, ActionButton, RowAndSearch, Pagination } from "./books"
import { ourFetch, fetchCallback } from '../functions'
import { GLOBALCONTEXT } from '../../App'
import { useDate } from '../includes/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faEllipsisVertical, faXmark } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select'
import '../assets/scss/form.scss'
import { Link } from 'react-router-dom'

/**
 * MARK: Library Fines
 */
export const LibraryFines = () => {
    const [ paidFines, setPaidFines ] = useState([]),
        [ formMode, setFormMode ] = useState( 'new' ),
        [ searched, setSearched ] = useState( '' ),
        [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ activePage, setActivePage ] = useState( 1 ),
        [ submitSuccess, setSubmitSuccess ] = useState( false ),
        totalPages = new Array( Math.ceil( paidFines.length / rowsPerPage ) ).fill( 0 ),
        filteredFines = useMemo(() => {
            if( searched === '' ) return paidFines.slice( ( activePage - 1 ) * rowsPerPage, ( activePage * rowsPerPage ) );
            let newList = paidFines.reduce(( val, row ) => {
                let { bookName, name } = row
                if( name.toLowerCase().includes( searched ) || bookName.toLowerCase().includes( searched ) ) {
                    val = [ ...val, row ]
                }
                return val
            }, [])
            return newList.slice( 0, 10 );
        }, [ searched, activePage, rowsPerPage, paidFines ])
        
    useEffect(() => {
        ourFetch({
            api: '/paid-fines',
            callback: fetchCallback,
            setter: setPaidFines
        })
    }, [ submitSuccess ])

    // Handle Pagination
    const handlePagination = ( type ) => {
        if( type === 'next' ) {
            if( activePage >= totalPages.length ) return
            setActivePage( activePage + 1 )
        } else {
            if( activePage <= 1 ) return
            setActivePage( activePage - 1 )
        }
    }

    return <main className="cmg-main cmg-library" id="cmg-main">

        <div className='page-header'>

            <Breadcrumb
                headLabel = 'Collected Fines'
                currentPageLabel = 'All Fines'
            />

            <div className='action-buttons'>

                <ActionButton 
                    setFormMode = { setFormMode }
                    label = { 'Collect Fine' }
                />

            </div>
            
        </div>

        <RowAndSearch 
            rowsPerPage = { rowsPerPage }
            setRowsPerPage = { setRowsPerPage }
            setSearched = { setSearched }
        />

        <CollectFine
            setSubmitSuccess = { setSubmitSuccess }
        />

        <Table 
            paidFines = { filteredFines }
        />

        <Pagination
            books = { filteredFines }
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
    const  { convertedDate } = useDate(),
        { paidFines } = props

    return <div className='books-table-wrapper issue-page'>
        <table className='table-wrapper'>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Book ID</th>
                    <th>Book Name</th>
                    <th>Collected From</th>
                    <th>Fine Amount</th>
                    <th>Return Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    paidFines.length ? paidFines.map(( book, index ) => {
                        let count = index + 1,
                            { id, name, profile, returnDate, bookName, fineAmount, userId } = book

                        return <tr key={ index }>
                            <td>{ `${ count }.` }</td>
                            <td>{ id }</td>
                            <td>{ bookName }</td>
                            <td>
                                <div className='issuer-profile'>
                                    <figure>
                                        <img src={ profile } alt={ name }/>
                                    </figure>
                                    <span className='name'><Link to="/dashboard/user-details" state={{ user: userId }}>{ `${ name } ( ${ userId } )` }</Link></span>
                                </div>
                            </td>
                            <td>{ `Rs. ${ fineAmount }` }</td>
                            <td>{ convertedDate( returnDate ) }</td>
                        </tr>
                    }) : <tr className="no-records">
                        <td colSpan="7">No records</td>
                    </tr>
                }
            </tbody>
        </table>
    </div>
}

/**
 * MARK: Issue new Books
 */
const CollectFine = ( props ) => {
    const globalObject = useContext( GLOBALCONTEXT ),
        { formVisibility, setCurrentBookId, setFormVisibility, setDeleteBookVisibility, setOverlay, setHeaderOverlay } = globalObject,
        { setSubmitSuccess } = props,
        [ fines, setFines ] = useState([]),
        [ fineId, setFineId ] = useState( '' ),
        finedUsersOptions = useMemo(() => {
            console.log( fines )
            return fines.reduce(( val, fine ) => {
                let { id, name, userId } = fine
                val = [ ...val, { value: id, label: `${ name } (${ userId })` }]
                return val
            }, [])
        }, [ fines ]),
        userIds = useMemo(() => {
            return fines.reduce(( val, fine ) => {
                let { id, ...remain } = fine
                val = { ...val, [ id ]: remain }
                return val
            }, {})
        }, [ fines ])

    useEffect(() => {
        ourFetch({
            api: '/overdue-and-unpaid',
            setter: setFines,
            callback: fetchCallback
        })
    }, [])

    useEffect(() => {
        console.log( userIds )
    }, [ userIds ])

    /**
     * Handle React select
     */
    const handleReactSelectChange = ( option ) => {
        setFineId( option.value )
    }

    /**
     * Handle Form Submit
     */
    const handleFormSubmit = ( event ) => {
        event.preventDefault()
        ourFetch({
            api: '/update-fine',
            callback: formSubmitCallback,
            body: JSON.stringify({ id: fineId, userId: userIds[ fineId ] })
        })
    }

    /**
     * form submit callback
     */
    const formSubmitCallback = ( data ) => {
         let { result, success } = data
        if( success ) {
            setSubmitSuccess( true )
            setDeleteBookVisibility( false )
            setOverlay( false )
            setHeaderOverlay( false )
            setCurrentBookId( 0 )
            setFormVisibility( false )
            ourFetch({
                api: '/add-fine',
                body: JSON.stringify({ 
                    userId: userIds[ fineId ]?.userId,
                    message: `${ userIds[ fineId ]?.name } paid library fine`, 
                    amount: userIds[ fineId ]?.fineAmount,
                    type: 'income',
                    purpose: 'fine'
                }),
            })
        }
    }

    /**
     * Get current select value
     */
    const getCurrentSelectValue = ( arr, val ) => {
        if( typeof val === 'object' ) return val
        return arr.reduce(( _thisValue, item ) => {
            let { value } = item
            if( value === val ) _thisValue = item
            return _thisValue
        }, {})
    }

    return formVisibility && <div className='cmg-form-wrapper'>
        <form className="new-book-form" onSubmit={ handleFormSubmit }>
            <div className='form-head'>
                <h2 className='form-title'>Collect Fine</h2>
                <p className='form-excerpt'>Please fill in your book details below.</p>
            </div>
            <div className='form-field'>
                <label className="form-label">
                    Collect Fine From
                    <span className="form-error">*</span>
                </label>
                <Select
                    options = { finedUsersOptions }
                    className = 'react-select'
                    name = 'bookId'
                    value = { getCurrentSelectValue( finedUsersOptions, fineId ) }
                    onChange = { handleReactSelectChange }
                />
            </div>

            <div className='form-field'>
                <label className='form-label'>
                    Total Fine Amount
                    <span className="form-error">*</span>
                </label>
                <input type="number" value={ 50 } required disabled />
            </div>

            <input type="submit" value="Collect Fine" />
        </form>
    </div>
}