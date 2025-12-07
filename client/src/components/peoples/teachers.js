import { useState, useEffect, useContext, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate, faPrint, faFileExport, faUserPlus, faList, faGrip, faMessage, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { GLOBALCONTEXT } from '../../App'
import { Link } from 'react-router-dom'
import { ourFetch, getScript, fetchCallback } from '../functions';
import { useDate } from '../includes/hooks'
import { Pagination } from './students'

export const TeachersList = () => {
    const Global = useContext( GLOBALCONTEXT ),
        [ allStudents, setAllStudents ] = useState([]),
        [ searched, setSearched ] = useState( '' ),
        { convertedDate } = useDate(),
        [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ activePage, setActivePage ] = useState( 1 ),
        [ layout, setLayout ] = useState( 'list' ),
        [ sortBy, setSortBy ] = useState( 'asc' ),
        [ currentDropdownId, setCurrentDropdownId ] = useState(0),
        totalPages = new Array( Math.ceil( allStudents.length / rowsPerPage ) ).fill( 0 )

    useEffect(() => {
        ourFetch({
            api: '/all-users-via-role',
            callback: fetchCallback,
            setter: setAllStudents,
            body: JSON.stringify({ sortBy, role: 'teacher' })
        })
    }, [ sortBy, rowsPerPage ])

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

    const handleSearch = ( event ) => setSearched( event.target.value )
    const handleRowsPerPage = ( event ) => setRowsPerPage( event.target.value )

    const handlePagination = ( type ) => {
        if( type === 'next' ) {
            if( activePage >= totalPages.length ) return
            setActivePage( activePage + 1 )
        } else {
            if( activePage <= 1 ) return
            setActivePage( activePage - 1 )
        }
    }

    const handleSort = ( event ) => setSortBy( event.target.value )

    const handleActionButton = (id) => {
        if (currentDropdownId === id) {
            setCurrentDropdownId(0)
        } else {
            setCurrentDropdownId(id)
        }
    }

    return <main className="cmg-main peoples-student-wrapper" id="cmg-main">
        <div className='page-header students-list'>
            <div className="dashboard-intro">
                <h2 className="user-name">Teachers List</h2>
                <ul className="cmg-breadcrumb">
                    <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item">Teachers</li>
                    <li className="breadcrumb-item">All Teachers</li>
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
                    <span className='label'>Add Teacher</span>
                </button>
            </div>
        </div>

        <div className='list-head'>
            <div className='list-head-item filter-wrapper'>
                <h2 className="label">Teachers List</h2>
                <div className='action-buttons'>
                    <button className='action-btn' onClick={() => setLayout( 'list' )}><FontAwesomeIcon icon={ faList }/></button>
                    <button className='action-btn' onClick={() => setLayout( 'grid' )}><FontAwesomeIcon icon={ faGrip }/></button>
                    <select className='sort-by' value={ sortBy } onChange={ handleSort }>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
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
                    <input type="search" name="teacher-search" placeholder='Search...' onChange={ handleSearch }/>
                </div>
            </div>
        </div>

        <div className='student-fees-wrapper' id="student-fees-wrapper">
            
            {/* ---------- LIST VIEW ---------- */}
            { ( layout === 'list' ) ? 
            <table className='table-wrapper'>
                <thead>
                    <tr>
                        <th style={{width: 40}}>S.No</th>
                        <th style={{width: 100}}>Teacher ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th>Date of Join</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        filteredStudents.length ? filteredStudents.map(( student, index ) => {
                            let count = index + 1,
                                { id, name, gender, status, registered_date, profile } = student

                            return <tr key={ index }>
                                <td>{ count }</td>
                                <td>{ id }</td>

                                <td className='username-profile'>
                                    <figure><img src={ profile } alt={ name }/></figure>
                                    { name }
                                </td>

                                <td>{ gender[0].toUpperCase() + gender.slice(1) }</td>
                                <td>{ status[0].toUpperCase() + status.slice(1) }</td>
                                <td>{ convertedDate( registered_date ) }</td>

                                <td className='action-buttons'>
                                    <button><FontAwesomeIcon icon={ faMessage }/></button>

                                    <div className={`more-button-wrapper${ currentDropdownId === id ? ' active' : '' }`}>
                                        <button className='more-button' onClick={() => handleActionButton(id)}>
                                            <FontAwesomeIcon icon={ faEllipsisVertical }/>
                                        </button>

                                        { currentDropdownId === id && <ActionButtonDropdown id={id} /> }
                                    </div>
                                </td>
                            </tr>
                        }) : 
                        <tr className="no-records">
                            <td colSpan="8">No Teachers.</td>
                        </tr>
                    }
                </tbody>

            </table> 

            : 

            /* ---------- GRID VIEW ---------- */
            <div className='grid-wrapper'>
                {
                    filteredStudents.map(( student, index ) => {
                        let { id, name, gender, status, registered_date, profile } = student

                        return <div key={ index } className='grid card'>
                            <div className='head card-head'>
                                <span className='card-id'>{ id }</span>

                                <div className='status-wrap'>
                                    <span className='card-status'>
                                        { status[0].toUpperCase() + status.slice(1) }
                                    </span>

                                    <div className={`more-button-wrapper${ currentDropdownId === id ? ' active' : '' }`}>
                                        <button className='more-button' onClick={() => handleActionButton(id)}>
                                            <FontAwesomeIcon icon={ faEllipsisVertical }/>
                                        </button>

                                        { currentDropdownId === id && <ActionButtonDropdown id={id} /> }
                                    </div>
                                </div>
                            </div>

                            <div className='body card-body'>
                                <div className='top card-top'>
                                    <figure className='profile-wrap'><img src={ profile } alt={ name }/></figure>
                                    <div className='user user-wrap'>
                                        <span className='name user-name'>{ name }</span>
                                    </div>
                                </div>

                                <div className='bottom'>
                                    <div>
                                        <span className='prefix info-label'>Gender</span>
                                        <span className='value info-value'>{ gender[0].toUpperCase() + gender.slice(1) }</span>
                                    </div>

                                    <div>
                                        <span className='prefix info-label'>Date of Join</span>
                                        <span className='value info-value'>{ convertedDate( registered_date ) }</span>
                                    </div>
                                </div>
                            </div>

                            <div className='foot card-foot'>
                                <button className='msg-btn'><FontAwesomeIcon icon={faMessage} /></button>
                            </div>
                        </div>
                    })
                }
            </div> }

        </div>

        <Pagination
            totalPages = { totalPages }
            activePage = { activePage }
            setActivePage = { setActivePage }
            handlePagination = { handlePagination }
        />
    </main>
}

/* ------------------------------
   ACTION BUTTON DROPDOWN
--------------------------------*/
const ActionButtonDropdown = ({ id }) => {
    return (
        <div className='action-button-dropdown'>
            <button>View Teacher</button>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
}
