import { useState, useEffect, useContext, useMemo, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate, faPrint, faFileExport, faUserPlus, faList, faGrip, faMessage, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { GLOBALCONTEXT } from '../../App'
import { Link } from 'react-router-dom'
import { ourFetch, getScript, fetchCallback } from '../functions';
import { useDate } from '../includes/hooks'
import html2pdf from 'html2pdf.js';
import { AddNewUser } from '../forms/add-new-user'
import { Chat } from '../header'
import { PayFees } from '../student/fees'
import { jsPDF } from 'jspdf'
import { applyPlugin } from 'jspdf-autotable'

export const StudentsList = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { newRegister, setNewRegister, setHeaderOverlay, setOverlay, showChat, setShowChat, chatId, setChatId, showPayFeesForm, setShowPayFeesForm, feeDetails, setFeeDetails } = Global,
        [ allStudents, setAllStudents ] = useState([]),
        [ searched, setSearched ] = useState( '' ),
        { convertedDate } = useDate(),
        [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ activePage, setActivePage ] = useState( 1 ),
        [ layout, setLayout ] = useState( 'list' ),
        [ sortBy, setSortBy ] = useState( 'asc' ),
        [ currentDropdownId, setCurrentDropdownId ] = useState( 0 ),
        totalPages = new Array( Math.ceil( allStudents.length / rowsPerPage ) ).fill( 0 ),
        pdf = useRef(),
        actionButton = useRef();

    useEffect(() => {
        _fetch()
    }, [ sortBy, rowsPerPage ])

    /**
     * Fetch
     */
    const _fetch = () => {
        ourFetch({
            api: '/all-users-via-role',
            callback: fetchCallback,
            setter: setAllStudents,
            body: JSON.stringify({ sortBy, role: 'student' })
        })
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

    /**
     * Handle Sort
     */
    const handleSort = ( event ) => {
        setSortBy( event.target.value )
    }

    /**
     * Handle print
     */
    const handlePrint = () => {
        window.print();
    }

    /**
     * Handle export to pdf
     */
    const handleExportPDF = () => {
        // let element = pdf.current
        // html2pdf().from( element ).save( 'students.pdf' )
        applyPlugin( jsPDF )
        const doc = new jsPDF()
        doc.autoTable({ html: '#student-table' })
        doc.save( 'students.pdf' )
    }

    /**
     * Handle export to pdf
     */
    const handleNewStudentAdd = () => {
        setHeaderOverlay( true )
        setOverlay( true )
        setNewRegister( true )
    }

    /**
     * Handle message click
     */
    const handleMessageClick = ( id ) => {
        setShowChat( true )
        setChatId( id )
    }

    /**
     * Handle Fees
     */
    const handleFees = ( id ) => {
        setShowPayFeesForm( true )
        setHeaderOverlay( true )
        setOverlay( true )
        setFeeDetails({
            ...feeDetails, 
            userId: id
        })
    }

    /**
     * Handle Action button click
     */
    const handleActionButton = ( id ) => {
        if( currentDropdownId === id ) {
            setCurrentDropdownId( 0 )
        } else {
            setCurrentDropdownId( id )
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
                <button className='action-btn refresh' onClick={ _fetch }><FontAwesomeIcon icon={ faRotate }/></button>
                <button className='action-btn print' onClick={ handlePrint }><FontAwesomeIcon icon={ faPrint }/></button>
                <button className='action-btn export cmg-btn-spacing' onClick={ handleExportPDF }>
                    <FontAwesomeIcon icon={ faFileExport }/>
                    <span className='label'>Export as PDF</span>
                </button>
                <button className='action-btn add cmg-btn-spacing' onClick={ handleNewStudentAdd }>
                    <FontAwesomeIcon icon={ faUserPlus }/>
                    <span className='label'>Add Student</span>
                </button>
            </div>
        </div>
        <div className='list-head'>
            <div className='list-head-item filter-wrapper'>
                <h2 className="label">Students List</h2>
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
                    <input type="search" name="student-search" placeholder='Search...' onChange={ handleSearch }/>
                </div>
            </div>
        </div>
        <div className='student-fees-wrapper' id="student-fees-wrapper">
            { ( layout === 'list' ) ? <table className='table-wrapper' ref={ pdf } id="student-table">
                <thead>
                    <tr>
                        <th style={{width: 40}}>S.No</th>
                        <th style={{width: 100}}>Student ID</th>
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
                        filteredStudents.length ? filteredStudents.map(( student, index ) => {
                            let count = index + 1,
                                { id, name, gender, status, registered_date, semester, abbreviation, profile } = student
                            return <tr key={ index }>
                                <td>{ count }</td>
                                <td>{ id }</td>
                                <td className='username-profile'>
                                    <figure>
                                        <img src={ profile } alt={ name }/>
                                    </figure>
                                    <span className='name'><Link to="/dashboard/user-details" state={{ user: id }}>{ name }</Link></span>
                                </td>
                                <td>{ `${ abbreviation } ${ getScript( semester ) }` }</td>
                                <td>{ gender.slice( 0, 1 ).toUpperCase() + gender.slice( 1 ) }</td>
                                <td>{ status.slice( 0, 1 ).toUpperCase() + status.slice( 1 ) }</td>
                                <td>{ convertedDate( registered_date ) }</td>
                                <td className='action-buttons'>
                                    <button onClick={() => handleMessageClick( id )}><FontAwesomeIcon icon={ faMessage }/></button>
                                    <button onClick={() => handleFees( id )}>Collect Fees</button>
                                    <div className={ `more-button-wrapper${ currentDropdownId === id ? ' active' : '' }` } ref={ actionButton }>
                                        <button className='more-button' onClick={() => handleActionButton( id )}><FontAwesomeIcon icon={ faEllipsisVertical }/></button>
                                        { currentDropdownId === id && <ActionButtonDropdown id={ id } /> }
                                    </div>
                                </td>
                            </tr>
                        }) : <tr className="no-records">
                            <td colSpan="8">No Students.</td>
                        </tr>
                    }
                </tbody>
            </table> : <div className='grid-wrapper' ref={ pdf }>
                {
                    filteredStudents.map(( student, index ) => {
                        let count = index + 1,
                            { id, name, gender, status, registered_date, semester, abbreviation, profile } = student
                        return (
                            <div key={index} className='grid card'>
                                <div className='head card-head'>
                                    <span className='card-id'>{ id }</span>

                                    <div className='status-wrap'>
                                        <span className='card-status'>
                                            { status.slice(0, 1).toUpperCase() + status.slice(1) }
                                        </span>

                                        <div className={`more-button-wrapper${ currentDropdownId === id ? ' active' : '' }`} ref={actionButton} >
                                            <button className='more-button' onClick={() => handleActionButton(id)} >
                                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                            </button>

                                            {currentDropdownId === id && <ActionButtonDropdown id={id} />}
                                        </div>
                                    </div>
                                </div>

                                <div className='body card-body'>
                                    <div className='top card-top'>
                                        <figure className='profile-wrap'>
                                            <img src={profile} alt={name} />
                                        </figure>

                                        <div className='user user-wrap'>
                                            <span className='name user-name'>
                                                <Link to="/dashboard/user-details" state={{ user: student }}>
                                                    {name}
                                                </Link>
                                            </span>

                                            <span className='semester user-semester'>
                                                { `${abbreviation} ${getScript(semester)}` }
                                            </span>
                                        </div>
                                    </div>

                                    <div className='bottom card-bottom'>
                                        <div className='info-item'>
                                            <span className='prefix info-label'>Gender</span>
                                            <span className='value info-value'>
                                                { gender.slice(0, 1).toUpperCase() + gender.slice(1) }
                                            </span>
                                        </div>

                                        <div className='info-item'>
                                            <span className='prefix info-label'>Date of Join</span>
                                            <span className='value info-value'>
                                                { convertedDate(registered_date) }
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className='foot card-foot'>
                                    <button className='msg-btn' onClick={() => handleMessageClick(id)}>
                                        <FontAwesomeIcon icon={faMessage} />
                                    </button>

                                    <button className='collect-btn' onClick={() => handleFees(id)}>
                                        Collect Fees
                                    </button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>}
        </div>
        <Pagination
            totalPages = { totalPages }
            activePage = { activePage }
            setActivePage = { setActivePage }
            handlePagination = { handlePagination }
        />
        { newRegister && <AddNewUser role={ 'student' }/> }
        { showChat && <Chat id={ chatId }/> }
        { showPayFeesForm && <PayFees
            includeSelect = { false }
        /> }
    </main>
}

/**
 * Pagination Component
 */
export const Pagination = ( props ) => {
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

/**
 * Action Button Dropdown
 */
const ActionButtonDropdown = ( props ) => {
    const { id } = props
    return <div className='action-button-dropdown'>
        <button>View Student</button>
        <button>Edit</button>
        <button>Delete</button>
    </div>
}