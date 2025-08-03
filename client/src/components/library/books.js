import { useState, useEffect, createContext, useContext, useRef, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faEllipsisVertical, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { ourFetch, adjustDate, fetchCallback } from '../functions'
import { useDate } from '../includes/hooks';
import { GLOBALCONTEXT } from '../../App'
import '../assets/scss/form.scss'

const BooksContext = createContext()

/**
 * MARK: Library Books
 */
export const LibraryBooks = () => {
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
            let newStudentsList = books.reduce(( val, student ) => {
                let { name } = student
                if(  name.toLowerCase().includes( searched ) ) {
                    val = [ ...val, student ]
                }
                return val
            }, [])
            return newStudentsList.slice( 0, 10 );
        }, [ searched, books, activePage, rowsPerPage ])
    
    useEffect(() => {
        ourFetch({
            api: '/all-books',
            callback: fetchCallback,
            setter: setBooks
        })
        setDeleteSuccess( false )
        setSubmitSuccess( false )
    }, [ deleteSuccess, submitSuccess, books ])

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

    const booksObject = {
        layout, setLayout,
        sortBy, setSortBy,
        rowsPerPage, setRowsPerPage,
        currentDropdownId, setCurrentDropdownId,
        activePage, setActivePage,
        searched, setSearched,
        books: filteredBooks,
        actionButton,
        totalPages,
        handlePagination,
        deleteSuccess, setDeleteSuccess,
        formMode, setFormMode,
        submitSuccess, setSubmitSuccess
    }

    return <main className="cmg-main cmg-library" id="cmg-main">
        
        <BooksContext.Provider value={ booksObject }>

            <div className='page-header'>

                <Breadcrumb />

                <div className='action-buttons'>

                    <ActionButton
                        setFormMode = { setFormMode }
                    />

                </div>

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
            
            <NewBookForm 
                formMode = 'new'
                setSubmitSuccess = { setSubmitSuccess }
            />

            <DeleteBook
                setDeleteSuccess = { setDeleteSuccess }
            />

        </BooksContext.Provider>

    </main>
}

/**
 * MARK: BREADCRUMB
 */
export const Breadcrumb = ( props ) => {
    const { headLabel = 'Books', currentPageLabel = 'All Books' } = props
    return <div className="breadcrumb-wrapper">
        <h2 className="user-name">{ headLabel }</h2>
        <ul className="cmg-breadcrumb" id="cmg-breadcrumb">
            <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
            <li className="breadcrumb-item"><Link to="/dashboard/library">Library</Link></li>
            <li className="breadcrumb-item">{ currentPageLabel }</li>
        </ul>
    </div>
}

/**
 * MARK: ACTION BUTTONS
 */
export const ActionButton = ( props ) => {
    const Global = useContext( GLOBALCONTEXT ),
        { formVisibility, setFormVisibility, setOverlay, setHeaderOverlay } = Global,
        { setFormMode, label = 'New Book', extendFunction } = props

    /**
     * Handle add new book
     */
    const handleClick = () => {
        setFormVisibility( ! formVisibility )
        setOverlay( true )
        setHeaderOverlay( true )
        setFormMode( 'new' )
        if( extendFunction ) extendFunction()
    }

    return <button className='action-btn add' onClick={ handleClick }>
        <FontAwesomeIcon icon={ faCirclePlus }/>
        <span className='label'>{ label }</span>
    </button>
}

/**
 * MARK: ROW & SEARCH
 */
export const RowAndSearch = ( props ) => {
    const { rowsPerPage, setRowsPerPage, setSearched, children } = props

    /**
     * Handle rows per page
     */
    const handleRowsPerPage = ( event ) => {
        setRowsPerPage( event.target.value )
    }

    /**
     * Handle search
     */
    const handleSearch = ( event ) => {
        setSearched( event.target.value )
    }

    return <div className='list-head-item rows-per-page-search-wrapper'>
        <div className='rows-per-page-wrapper'>
            <span className='prefix'>Row Per Page</span>
            <select value={ rowsPerPage } onChange={ handleRowsPerPage }>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
            <span className='suffix'>Entries</span>
        </div>
        { children }
        <div className='search-wrapper'>
            <input type="search" name="student-search" placeholder='Search...' onChange={ handleSearch }/>
        </div>
    </div>
}

/**
 * MARK: TABLE
 */
export const Table = ( props ) => {
    const Global = useContext( GLOBALCONTEXT ),
        booksObject = useContext( BooksContext ),
        { setCurrentBookId } = Global, 
        { layout, items, actionButton, currentDropdownId, setCurrentDropdownId } = props,
        { setFormMode } = booksObject,
        { convertedDate } = useDate()

    /**
     * Handle action button click
     */
    const handleActionButton = ( id ) => {
        setCurrentDropdownId( id === currentDropdownId ? null : id )
        setCurrentBookId( id )
    }

    return <div className='books-table-wrapper books-page'>
        { ( layout === 'list' ) ? <table className='table-wrapper'>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Book ID</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Publication</th>
                    <th>Published Year</th>
                    <th>Language</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map(( books, index ) => {
                        let count = index + 1,
                            { id, name, author, publication, publishedYear, language } = books

                        return <tr key={ index }>
                            <td>{ `${ count }.` }</td>
                            <td>{ id }</td>
                            <td className='username-profile'>{ name }</td>
                            <td>{ author }</td>
                            <td>{ publication }</td>
                            <td>{ convertedDate( publishedYear ) }</td>
                            <td>{ language }</td>
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
 * MARK: Action Button Dropdown
 */
export const ActionButtonDropdown = ( props ) => {
    const Global = useContext( GLOBALCONTEXT ),
        { setFormVisibility, setOverlay, setHeaderOverlay, setDeleteBookVisibility } = Global,
        { setFormMode, children } = props

    /**
     * Handle Edit click
     */
    const handleEditClick = () => {
        setFormVisibility( true )
        setOverlay( true )
        setHeaderOverlay( true )
        setFormMode( 'edit' )
    }

    /**
     * Handle delete click
     */
    const handleDeleteClick = () => {
        setDeleteBookVisibility( true )
        setOverlay( true )
        setHeaderOverlay( true )
    }

    return <div className='action-button-dropdown'>
        <button onClick={ handleEditClick }>Edit</button>
        <button onClick={ handleDeleteClick }>Delete</button>
        { children }
    </div>
}

/**
 * MARK: Pagination
 */
export const Pagination = ( props ) => {
    const { books, totalPages, activePage, setActivePage, handlePagination } = props

    return books.length > 9 ? <div className='pagination-wrapper'>
        <button className='pagination-button previous' onClick={() => handlePagination( 'previous' ) }>Prev</button>
        <div className='pages'>
            {
                totalPages.map(( page, index ) => {
                    let count = index + 1
                    return <button className={ `page ${ ( activePage === count ? 'active': '' ) }` } key={ index } onClick={() => setActivePage( count )}>{ count }</button>
                })
            }
        </div>
        <button className='pagination-button next' onClick={() => handlePagination( 'next' )}>Next</button>
    </div> : ''
}

/**
 * MARK: NEW BOOK
 */
export const NewBookForm = ( props ) => {
    const globalObject = useContext( GLOBALCONTEXT ),
        booksObject = useContext( BooksContext ),
        { formVisibility, currentBookId, setCurrentBookId, setFormVisibility, setDeleteBookVisibility, setOverlay, setHeaderOverlay } = globalObject,
        { formMode, setSubmitSuccess } = props,
        [ formValues, setFormValues ] = useState({
            name: '',
            author: '',
            publication: '',
            publishedYear: '',
            language: ''
        }),
        { name, author, publication, publishedYear, language } = formValues;


    useEffect(() => {
        if( currentBookId ) {
            let newFormValues = booksObject.books.reduce(( value, book ) => {
                let { id } = book
                if( id === currentBookId ) value = { ...book, publishedYear: adjustDate( book.publishedYear ) }
                return value
            }, {})
            setFormValues( newFormValues )
        }
    }, [ formMode, currentBookId ])

    /**
     * Handle Form change
     */
    const handleFormChange = ( event ) => {
        let name = event.target.name,
            value = event.target.value
        
        if( name === 'publishedYear' ) {
            let newDate = new Date( value )
            value = newDate.toISOString().slice(0, 19).replace('T', ' ');
        }
        setFormValues({
            ...formValues,
            [ name ]: value
        })
    }

    /**
     * Handle Form submit
     */
    const handleFormSubmit = ( event ) => {
        event.preventDefault()
        ourFetch({
            api: ( formMode === 'new' ) ? '/add-book' : '/edit-book',
            callback: formSubmitCallback,
            body: JSON.stringify({
                ...formValues,
                publishedYear: new Date( formValues.publishedYear ).toISOString().slice(0, 19).replace('T', ' ')
            })
        })
    }

    /**
     * Callback
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
        }
    }

    return formVisibility && <div className='cmg-form-wrapper' id='cmg-form-wrapper'>
        <form className="new-book-form" onSubmit={ handleFormSubmit }>
            <div className='form-head'>
                <h2 className='form-title'>{ `${( formMode === 'new' ? 'Add New' : 'Edit' )} Book` }</h2>
                <p className='form-excerpt'>Please fill in your book details below.</p>
            </div>
            <div className='form-field'>
                <label className="form-label">
                    Book Title
                    <span className="form-error">*</span>
                </label>
                <input type="text" name="name" value={ name } onChange={ handleFormChange } required />
            </div>

            <div className='form-field'>
                <label className='form-label'>
                    Author
                    <span className="form-error">*</span>
                </label>
                <input type="text" name="author" value={ author } onChange={ handleFormChange } required />
            </div>

            <div className='form-field'>
                <label className='form-label'>
                    Publication
                    <span className="form-error">*</span>
                </label>
                <input type="text" name="publication" value={ publication } onChange={ handleFormChange } required />
            </div>

            <div className='form-field'>
                <label className='form-label'>
                    Published Year
                    <span className="form-error">*</span>
                </label>
                <input type="date" name="publishedYear" value={ adjustDate( publishedYear ) } onChange={ handleFormChange } required onFocus={(e) => e.target.showPicker && e.target.showPicker()} />
            </div>

            <div className='form-field'>
                <label className='form-label'>
                    Language
                    <span className="form-error">*</span>
                </label>
                <input type="text" name="language" value={ language } onChange={ handleFormChange } required />
            </div>

            <input type="submit" value="Add Book" />
        </form>
    </div>
}

/**
 * MARK: Delete Popup
 */
export const DeleteBook = ( props ) => {
    const Global = useContext( GLOBALCONTEXT ),
        { setOverlay, setHeaderOverlay, deleteBookVisibility, setDeleteBookVisibility, currentBookId, setCurrentBookId } = Global,
        { setDeleteSuccess, api = '/delete-book' } = props

    /**
     * Handle yes click
     */
    const handleYesClick = () => {
        ourFetch({
            api,
            callback: handleDeleteBookCallback,
            body: JSON.stringify({ id: currentBookId })
        })
    }

    /**
     * Delete Book Callback
     */
    const handleDeleteBookCallback = ( data ) => {
        let { success } = data
        if( success ) {
            setDeleteBookVisibility( false )
            setOverlay( false )
            setHeaderOverlay( false )
            setCurrentBookId( 0 )
            setDeleteSuccess( true )
        }
    }

    /**
     * Handle no click
     */
    const handleNoClick = () => {
        setDeleteBookVisibility( false )
        setOverlay( false )
        setHeaderOverlay( false )
    }

    return deleteBookVisibility && <div className='delete-book-wrapper'>
        <h2 className='title'>Are you sure you want to delete this book ?</h2>
        <div className='choices'>
            <button className='choice yes' onClick={ handleYesClick }>Yes</button>
            <button className='choice no' onClick={ handleNoClick }>No</button>
        </div>
        <FontAwesomeIcon icon={ faXmark } className='cancel' onClick={ handleNoClick }/>
    </div>
}