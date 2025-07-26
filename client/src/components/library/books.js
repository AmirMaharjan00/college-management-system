import { useState, useEffect, createContext, useContext, useRef, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faList, faGrip, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { ourFetch } from '../functions'
import { useDate } from '../includes/hooks';
import { GLOBALCONTEXT } from '../../App'
import '../assets/scss/form.scss'

const BooksContext = createContext()

/**
 * MARK: Library Books
 */
export const LibraryBooks = () => {
    const Global = useContext( GLOBALCONTEXT ) ,
        { formVisibility, setFormVisibility, setOverlay, setHeaderOverlay } = Global,
        [ books, setBooks ] = useState([]),
        [ layout, setLayout ] = useState( 'list' ),
        [ sortBy, setSortBy ] = useState( 'asc' ),
        [ searched, setSearched ] = useState( '' ),
        [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ activePage, setActivePage ] = useState( 1 ),
        [ currentDropdownId, setCurrentDropdownId ] = useState( null ),
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
            callback: booksCallback
        })
    }, [])

    // Books Callback
    const booksCallback = ( data ) => {
        let { result, success = false } = data
        if( success ) setBooks( result )
    }

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
        formVisibility, setFormVisibility,
        books: filteredBooks,
        actionButton,
        totalPages,
        handlePagination,
        setOverlay, setHeaderOverlay
    }

    return <main className="cmg-main cmg-library" id="cmg-main">
        
        <BooksContext.Provider value={ booksObject }>
            <div className='page-header'>
                <Breadcrumb />
                <ActionButtons />
            </div>
            <RowAndSearch />
            <Table />
            <Pagination />
            <NewBookForm />
        </BooksContext.Provider>
    </main>
}

/**
 * MARK: BREADCRUMB
 */
const Breadcrumb = () => {
    return <div className="breadcrumb-wrapper">
        <h2 className="user-name">Books</h2>
        <ul className="cmg-breadcrumb" id="cmg-breadcrumb">
            <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
            <li className="breadcrumb-item"><Link to="/dashboard/library">Library</Link></li>
            <li className="breadcrumb-item">All Books</li>
        </ul>
    </div>
}

/**
 * MARK: ACTION BUTTONS
 */
const ActionButtons = () => {
    const booksObject = useContext( BooksContext ),
        { formVisibility, setFormVisibility, setOverlay, setHeaderOverlay } = booksObject

    /**
     * Handle add new book
     */
    const handleNewBook = () => {
        setFormVisibility( ! formVisibility )
        setOverlay( true )
        setHeaderOverlay( true )
    }

    return <div className='action-buttons'>
        <button className='action-btn add' onClick={ handleNewBook }>
            <FontAwesomeIcon icon={ faCirclePlus }/>
            <span className='label'>Add Book</span>
        </button>
    </div>
}

/**
 * MARK: ROW & SEARCH
 */
const RowAndSearch = () => {
    const booksObject = useContext( BooksContext ),
        { rowsPerPage, setRowsPerPage, setSearched } = booksObject

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
        <div className='search-wrapper'>
            <input type="search" name="student-search" placeholder='Search...' onChange={ handleSearch }/>
        </div>
    </div>
}

/**
 * MARK: TABLE
 */
const Table = () => {
    const booksObject = useContext( BooksContext ),
        { layout, books, actionButton, currentDropdownId, setCurrentDropdownId } = booksObject,
        { convertedDate } = useDate()

    /**
     * Handle action button click
     */
    const handleActionButton = ( id ) => {
        setCurrentDropdownId( id === currentDropdownId ? null : id )
    }

    return <div className='books-table-wrapper' id="books-table-wrapper">
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
                    books.map(( books, index ) => {
                        let count = index + 1,
                            { id, name, author, publication, publisedYear, languae } = books

                        return <tr key={ index }>
                            <td>{ `${ count }.` }</td>
                            <td>{ id }</td>
                            <td className='username-profile'>{ name }</td>
                            <td>{ author }</td>
                            <td>{ publication }</td>
                            <td>{ convertedDate( publisedYear ) }</td>
                            <td>{ languae }</td>
                            <td className='action-buttons'>
                                <div className={ `more-button-wrapper${ currentDropdownId === id ? ' active' : '' }` } ref={ actionButton } onClick={() => handleActionButton( id )}>
                                    <button className='more-button'><FontAwesomeIcon icon={ faEllipsisVertical }/></button>
                                    { currentDropdownId === id && <ActionButtonDropdown /> }
                                </div>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table> : <div className='grid-wrapper'>
            {
                books.map(( book, index ) => {
                    let count = index + 1,
                        { id, name, author, publication, publisedYear, languae } = books
                    return <div key={ index } className='grid'>
                        <div className='head'>
                            <span>{ id }</span>
                            <div>
                                <div className={ `more-button-wrapper${ currentDropdownId === id ? ' active' : '' }` } ref={ actionButton }>
                                    <button className='more-button' onClick={() => handleActionButton( id )}><FontAwesomeIcon icon={ faEllipsisVertical }/></button>
                                    { currentDropdownId === id && <ActionButtonDropdown /> }
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
                                    <span className='value'>{ convertedDate( publisedYear ) }</span>
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
const ActionButtonDropdown = () => {
    const booksObject = useContext( BooksContext ),
        { setFormVisibility, setOverlay, setHeaderOverlay } = booksObject

    /**
     * Handle Edit click
     */
    const handleEditClick = () => {
        setFormVisibility( true )
        setOverlay( true )
        setHeaderOverlay( true )
    }

    /**
     * Handle delete click
     */
    const handleDeleteClick = () => {
        
    }

    return <div className='action-button-dropdown'>
        <button onClick={ handleEditClick }>Edit</button>
        <button onClick={ handleDeleteClick }>Delete</button>
    </div>
}

/**
 * MARK: Pagination
 */
export const Pagination = () => {
    const booksObject = useContext( BooksContext ),
        { books, totalPages, activePage, setActivePage, handlePagination } = booksObject

    return books.length ? <div className='pagination-wrapper'>
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
    </div> : <div className='no-data'>No data found</div>
}

/**
 * MARK: NEW BOOK
 */
export const NewBookForm = () => {
    const booksObject = useContext( BooksContext ),
        { formVisibility } = booksObject

    return formVisibility && <div className='cmg-form-wrapper' id='cmg-form-wrapper'>
        <form className="new-book-form" method="POST" action="/add-book">
            <div className='form-head'>
                <h2 className='form-title'>Add New Book</h2>
                <p className='form-excerpt'>Please fill in your book details below.</p>
            </div>
            <div className='form-field'>
                <label className="form-label">
                    Book Title
                    <span className="form-error">*</span>
                </label>
                <input type="text" name="name" required />
            </div>

            <div className='form-field'>
                <label className='form-label'>
                    Author
                    <span className="form-error">*</span>
                </label>
                <input type="text" name="author" required />
            </div>

            <div className='form-field'>
                <label className='form-label'>
                    Publication
                    <span className="form-error">*</span>
                </label>
                <input type="text" name="publication" required />
            </div>

            <div className='form-field'>
                <label className='form-label'>
                    Published Year
                    <span className="form-error">*</span>
                </label>
                <input type="date" name="publishedYear" required onFocus={(e) => e.target.showPicker && e.target.showPicker()} />
            </div>

            <div className='form-field'>
                <label className='form-label'>
                    Language
                    <span className="form-error">*</span>
                </label>
                <input type="text" name="language" required />
            </div>


            <input type="submit" value="Add Book" />
        </form>
    </div>
}