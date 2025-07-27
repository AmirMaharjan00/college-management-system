import { useState, useRef, useMemo, useEffect, useContext } from 'react'
import { Breadcrumb, ActionButtons, RowAndSearch, ActionButtonDropdown, Pagination, DeleteBook } from "./books"
import { ourFetch, adjustDate } from '../functions'
import { GLOBALCONTEXT } from '../../App'
import { useDate } from '../includes/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faEllipsisVertical, faXmark } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select'
import '../assets/scss/form.scss'
import { Link } from 'react-router-dom'

/**
 * MARK: Library Issed
 */
export const LibraryIssued = () => {
    const [ books, setBooks ] = useState([]),
        [ layout, setLayout ] = useState( 'list' ),
        [ sortBy, setSortBy ] = useState( 'asc' ),
        [ searched, setSearched ] = useState( '' ),
        [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ activePage, setActivePage ] = useState( 1 ),
        [ currentDropdownId, setCurrentDropdownId ] = useState( null ),
        [ deleteSuccess, setDeleteSuccess ] = useState( false ),
        [ submitSuccess, setSubmitSuccess ] = useState( false ),
        [ formMode, setFormMode ] = useState( 'new' ),
        actionButton = useRef(),
        totalPages = new Array( Math.ceil( books.length / rowsPerPage ) ).fill( 0 ),
        filteredBooks = useMemo(() => {
            if( searched === '' ) return books.slice( ( activePage - 1 ) * rowsPerPage, ( activePage * rowsPerPage ) );
            let newList = books.reduce(( val, row ) => {
                let { borrowerName, bookName } = row
                if( borrowerName.toLowerCase().includes( searched ) || bookName.toLowerCase().includes( searched ) ) {
                    val = [ ...val, row ]
                }
                return val
            }, [])
            return newList.slice( 0, 10 );
        }, [ searched, books, activePage, rowsPerPage ])
    
    useEffect(() => {
        ourFetch({
            api: '/all-books-issued',
            callback: booksCallback
        })
        setDeleteSuccess( false )
        setSubmitSuccess( false )
    }, [ deleteSuccess, submitSuccess ])

    // Books Callback
    const booksCallback = ( data ) => {
        let { result, success = false } = data
        if( success ) {
            console.log( result )
            setBooks( result )
        }
    }

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
                    headLabel = 'Issued Books'
                    currentPageLabel = 'All Issued Books'
                />

                <ActionButtons 
                    setFormMode = { setFormMode }
                    label = { 'Issue New Book' }
                />

            </div>

            <RowAndSearch 
                rowsPerPage = { rowsPerPage }
                setRowsPerPage = { setRowsPerPage }
                setSearched = { setSearched }
            />

            <Table
                layout = { layout }
                items = { filteredBooks }
                actionButton = { actionButton }
                currentDropdownId = { currentDropdownId }
                setCurrentDropdownId = { setCurrentDropdownId }
                setFormMode = { setFormMode }
            />

            <Pagination
                books = { filteredBooks }
                totalPages = { totalPages }
                activePage = { activePage }
                setActivePage = { setActivePage }
                handlePagination = { handlePagination }
            />

            <NewIssueBooks 
                formMode = { formMode }
                setSubmitSuccess = { setSubmitSuccess }
                currentDropdownId = { currentDropdownId }
                items = { filteredBooks }
            />
            
            <DeleteBook
                setDeleteSuccess = { setDeleteSuccess }
                api = '/delete-issued-book'
            />
    </main>
}

/**
 * MARK: TABLE
 */
const Table = ( props ) => {
    const Global = useContext( GLOBALCONTEXT ),
        { setCurrentBookId } = Global, 
        { layout = 'list', items, actionButton, currentDropdownId, setCurrentDropdownId, setFormMode } = props,
        { convertedDate } = useDate()

    /**
     * Handle action button click
     */
    const handleActionButton = ( id ) => {
        setCurrentDropdownId( id === currentDropdownId ? null : id )
        setCurrentBookId( id )
    }

    return <div className='books-table-wrapper issue-page'>
        { ( layout === 'list' ) ? <table className='table-wrapper'>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Book ID</th>
                    <th>Book Name</th>
                    <th>Issued By</th>
                    <th>Issued To</th>
                    <th>Issued Date</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Return Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map(( book, index ) => {
                        let count = index + 1,
                            { id, bookName, borrowerName, issuerName, issuedDate, dueDate, status, returnDate, issuerProfile, borrowerProfile } = book

                        return <tr key={ index }>
                            <td>{ `${ count }.` }</td>
                            <td>{ id }</td>
                            <td>{ bookName }</td>
                            <td>
                                <div className='issuer-profile'>
                                    <figure>
                                        <img src={ issuerProfile } alt={ issuerName }/>
                                    </figure>
                                    <span className='name'><Link to="/dashboard/user-details" state={{ user: book }}>{ issuerName }</Link></span>
                                </div>
                            </td>
                            <td>
                                <div className='borrower-profile'>
                                    <figure>
                                        <img src={ borrowerProfile } alt={ borrowerName }/>
                                    </figure>
                                    <span className='name'><Link to="/dashboard/user-details" state={{ user: book }}>{ borrowerName }</Link></span>
                                </div>
                            </td>
                            <td>{ convertedDate( issuedDate ) }</td>
                            <td>
                                <span class={ `status ${ status }` }>{ status.slice( 0, 1 ).toUpperCase() + status.slice( 1 ) }</span>
                            </td>
                            <td>{ convertedDate( dueDate ) }</td>
                            <td>{ ! returnDate ? '-' : convertedDate( returnDate ) }</td>
                            <td className='action-buttons'>
                                <div className={ `more-button-wrapper${ currentDropdownId === id ? ' active' : '' }` } ref={ actionButton } onClick={() => handleActionButton( id )}>
                                    <button className='more-button'><FontAwesomeIcon icon={ faEllipsisVertical }/></button>
                                    { currentDropdownId === id && <ActionButtonDropdown setFormMode = { setFormMode } /> }
                                </div>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table> : <div className='grid-wrapper'>
            {
                items.map(( book, index ) => {
                    let count = index + 1,
                        { id, name, author, publication, publishedYear, language } = book
                    return <div key={ index } className='grid'>
                        <div className='head'>
                            <span>{ id }</span>
                            <div>
                                <div className={ `more-button-wrapper${ currentDropdownId === id ? ' active' : '' }` } ref={ actionButton }>
                                    <button className='more-button' onClick={() => handleActionButton( id )}><FontAwesomeIcon icon={ faEllipsisVertical }/></button>
                                    { currentDropdownId === id && <ActionButtonDropdown setFormMode = { setFormMode } /> }
                                </div>

                            </div>
                        </div>
                        <div className='body'>
                            <div className='top'>
                                <div className='user'>
                                    <span className='name'>{ name }</span>
                                </div>
                            </div>
                            <div className='bottom'>
                                <div>
                                    <span className='prefix'>Author</span>
                                    <span className='value'>{ author }</span>
                                </div>
                                <div>
                                    <span className='prefix'>Published Year</span>
                                    <span className='value'>{ convertedDate( publishedYear ) }</span>
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>}
    </div>
}

/**
 * MARK: Issue new Books
 */
const NewIssueBooks = ( props ) => {
    const globalObject = useContext( GLOBALCONTEXT ),
        { formVisibility, currentBookId, setCurrentBookId, setFormVisibility, setDeleteBookVisibility, setOverlay, setHeaderOverlay } = globalObject,
        { formMode = 'new', setSubmitSuccess, currentDropdownId, items } = props,
        [ books, setBooks ] = useState([]),
        [ users, setUsers ] = useState([]),
        [ formValues, setFormValues ] = useState({
            bookId: '',
            userId: '',
            dueDate: ''
        }),
        { bookId, userId, dueDate } = formValues,
        userOptions = useMemo(() => {
            return users.reduce(( val, user ) => {
                let { id, name } = user
                val = [ ...val, { value: id, label: name }]
                return val
            }, [])
        }, [ users ]),
        bookOptions = useMemo(() => {
            return books.reduce(( val, user ) => {
                let { id, name } = user
                val = [ ...val, { value: id, label: name }]
                return val
            }, [])
        }, [ books ])

    useEffect(() => {
        ourFetch({
            api: '/all-books',
            callback: allBooksCallback
        })
        ourFetch({
            api: '/users',
            callback: allUsersCallback
        })
    }, [])

    useEffect(() => {
        if( formMode === 'edit' ) {
            let newFormValues = items.reduce(( value, book ) => {
                let { bookId, userId, dueDate } = book
                if( bookId === currentBookId ) value = { bookId, userId, dueDate }
                return value
            }, {})
            setFormValues( newFormValues )
        }
    }, [ formMode, currentBookId ])

    /**
     * All Books callback
     */
    const allBooksCallback = ( data ) => {
        let { result, success } = data
        if( success ) setBooks( result )
    }

    /**
     * All student and teachers callback
     */
    const allUsersCallback = ( data ) => {
        let { result, success } = data
        if( success ) setUsers( result )
    }

    /**
     * Handle form change
     */
    const handleFormChange = ( event ) => {
        let name = event.target.name,
            value = event.target.value

        if( name === 'dueDate' ) {
            let newDate = new Date( value )
            value = newDate.toISOString().slice(0, 19).replace('T', ' ');
        }
        setFormValues({
            ...formValues,
            [ name ]: value
        })
    }

    /**
     * Handle React select
     */
    const handleReactSelectChange = ( option, name ) => {
        setFormValues({
            ...formValues,
            [ name ]: option.value
        })
    }

    /**
     * Handle Form Submit
     */
    const handleFormSubmit = ( event ) => {
        event.preventDefault()
        let fetchObject = {
            ...formValues,
            dueDate: new Date( dueDate ).toISOString().slice(0, 19).replace('T', ' ')
        }
        if( formMode === 'edit' ) fetchObject.id = currentBookId
        ourFetch({
            api: ( formMode === 'new' ) ? '/issue-new-book' : '/edit-issued-book',
            callback: formSubmitCallback,
            body: JSON.stringify( fetchObject )
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
            setFormValues({
                bookId: '',
                userId: '',
                dueDate: ''
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
                <h2 className='form-title'>Issue a Book</h2>
                <p className='form-excerpt'>Please fill in your book details below.</p>
            </div>
            <div className='form-field'>
                <label className="form-label">
                    Book Name
                    <span className="form-error">*</span>
                </label>
                <Select
                    options = { bookOptions }
                    className = 'react-select'
                    name = 'bookId'
                    value = { getCurrentSelectValue( bookOptions, bookId ) }
                    onChange = {( value ) => handleReactSelectChange( value, 'bookId' ) }
                />
            </div>

            <div className='form-field'>
                <label className='form-label'>
                    Issued To
                    <span className="form-error">*</span>
                </label>
                 <Select 
                    options = { userOptions }
                    className = 'react-select'
                    name = 'userId'
                    value = { getCurrentSelectValue( userOptions, userId ) }
                    onChange = {( value ) => handleReactSelectChange( value, 'userId' ) }
                />
            </div>

            <div className='form-field'>
                <label className='form-label'>
                    Due Date
                    <span className="form-error">*</span>
                </label>
                <input type="date" name="dueDate" value={ adjustDate( dueDate ) } onChange={ handleFormChange } required onFocus={(e) => e.target.showPicker && e.target.showPicker()} />
            </div>

            <input type="submit" value="Issue Book" />
        </form>
    </div>
}