import { useContext } from "react"
import { Link } from "react-router-dom"
import { GLOBALCONTEXT } from "../App"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

/**
 * MARK: BREADCRUMB
 */
export const Breadcrumb = ( props ) => {
    const { headLabel = 'Account', currentPageLabel = 'All Books', middle = true } = props
    return <div className="breadcrumb-wrapper">
        <h2 className="title">{ headLabel }</h2>
        <ul className="cmg-breadcrumb" id="cmg-breadcrumb">
            <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
            { middle && <li className="breadcrumb-item"><Link to="/dashboard/account">Account</Link></li> }
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
        { setFormMode, label = 'New Book', extendFunction, classes = '' } = props,
        allClasses = `action-btn add ${ classes }`

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

    return <button className={ allClasses } onClick={ handleClick }>
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