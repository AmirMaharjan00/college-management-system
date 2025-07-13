import { useState, useEffect, useContext, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate, faPrint, faFileExport, faUserPlus, faList, faGrip, faMessage, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { GLOBALCONTEXT } from '../../App'
import { Link } from 'react-router-dom'
import { ourFetch, getScript } from '../functions';
import { useDate } from '../includes/hooks'

export const StudentsList = () => {
    const Global = useContext( GLOBALCONTEXT ),
        [ allStudents, setAllStudents ] = useState([]),
        [ searched, setSearched ] = useState( '' ),
        { convertedDate } = useDate(),
        [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ activePage, setActivePage ] = useState( 1 ),
        totalPages = new Array( Math.ceil( allStudents.length / rowsPerPage ) ).fill( 0 )

    useEffect(() => {
        ourFetch({
            api: '/all-students',
            callback: userCallback
        })
    }, [])

    const userCallback = ( data ) => {
        let { result, success } = data
        if( success ) {
            setAllStudents( result )
        }
    }

    /**
     * Filter students acording to search
     */
    const filteredStudents = useMemo(() => {
        if( searched === '' ) return allStudents.slice( ( activePage - 1 ) * rowsPerPage, ( activePage * rowsPerPage ) );
        let newStudentsList = allStudents.reduce(( val, student ) => {
            let { name } = student
            if(  name.toLowerCase().includes( searched ) ) {
                val = [ ...val, student ]
            }
            return val
        }, [])
        return newStudentsList.slice( 0, 10 );
    }, [ searched, allStudents, activePage, rowsPerPage ])

    /**
     * Handle Search
     */
    const handleSearch = ( event ) => {
        setSearched( event.target.value )
    }

    /**
     * Handle Pagination
     */
    const handleRowsPerPage = ( event ) => {
        setRowsPerPage( event.target.value )
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

    return <main className="cmg-main peoples-student-wrapper" id="cmg-main">
        <div className='page-header students-list'>
            <div className="dashboard-intro">
                <h2 className="user-name">Students List</h2>
                <ul className="cmg-breadcrumb" id="cmg-breadcrumb">
                    <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item">Students</li>
                    <li className="breadcrumb-item">All Students</li>
                </ul>
            </div>
            <div className='action-buttons'>
                <button className='action-btn refresh'><FontAwesomeIcon icon={ faRotate }/></button>
                <button className='action-btn print'><FontAwesomeIcon icon={ faPrint }/></button>
                <button className='action-btn export'>
                    <FontAwesomeIcon icon={ faFileExport }/>
                    <span className='label'>Export as PDF</span>
                </button>
                <button className='action-btn add'>
                    <FontAwesomeIcon icon={ faUserPlus }/>
                    <span className='label'>Add Student</span>
                </button>
            </div>
        </div>
        <div className='list-head'>
            <div className='list-head-item filter-wrapper'>
                <h2 className="label">Students List</h2>
                <div className='action-buttons'>
                    {/* <div>hel</div> */}
                    <button className='action-btn'><FontAwesomeIcon icon={ faList }/></button>
                    <button className='action-btn'><FontAwesomeIcon icon={ faGrip }/></button>
                    <select className='sort-by'>
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </div>
            </div>
            <div className='list-head-item rows-per-page-search-wrapper'>
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
        </div>
        <div className='student-fees-wrapper' id="student-fees-wrapper">
            <table className='table-wrapper'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Semester</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th>Date of Join</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredStudents.map(( student, index ) => {
                            let count = index + 1,
                                { id, name, gender, status, registered_date, semester, abbreviation, profile } = student
                            return <tr key={ index }>
                                <td>{ count }</td>
                                <td>{ id }</td>
                                <td className='username-profile'>
                                    <figure>
                                        <img src={ profile } alt={ name }/>
                                    </figure>
                                    { name }
                                </td>
                                <td>{ `${ abbreviation } ${ getScript( semester ) }` }</td>
                                <td>{ gender.slice( 0, 1 ).toUpperCase() + gender.slice( 1 ) }</td>
                                <td>{ status.slice( 0, 1 ).toUpperCase() + status.slice( 1 ) }</td>
                                <td>{ convertedDate( registered_date ) }</td>
                                <td className='action-buttons'>
                                    <button><FontAwesomeIcon icon={ faMessage }/></button>
                                    <button>Collect Fees</button>
                                    <button><FontAwesomeIcon icon={ faEllipsisVertical }/></button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
        <Pagination
            totalPages = { totalPages }
            activePage = { activePage }
            setActivePage = { setActivePage }
            handlePagination = { handlePagination }
        />
    </main>
}

/**
 * Pagination Component
 */
const Pagination = ( props ) => {
    let { totalPages, activePage } = props

    return <div className='pagination-wrapper'>
        <button className='pagination-button previous' onClick={() => props.handlePagination( 'previous' ) }>Prev</button>
        <div className='pages'>
            {
                totalPages.map(( page, index ) => {
                    let count = index + 1
                    return <button className={ `page ${ ( activePage === count ? 'active': '' ) }` } key={ index } onClick={() => props.setActivePage( count )}>{ count }</button>
                })
            }
        </div>
        <button className='pagination-button next' onClick={() => props.handlePagination( 'next' )}>Next</button>
    </div>
}