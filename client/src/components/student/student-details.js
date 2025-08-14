import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router'
import { ourFetch, fetchCallback } from '../functions'
import { Link } from 'react-router-dom'
import { useDate } from '../includes/hooks'
import { TodaysDate } from '../includes/components-hooks'
import './student-details.scss'
import { useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarMinus, faGraduationCap, faTable, faFileInvoiceDollar, faLinesLeaning, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { RowAndSearch, ActionButton, Pagination } from '../components'


/**
 * Student Details Component
 */
export const StudentDetails = () => {
    const location = useLocation(),
        { user: userId } = location.state,
        [ userDetails, setUserDetails ] = useState({}),
        { getDate, getTime, convertedDate } = useDate(),
        [ tab, setTab ] = useState( 'details' ),
        capitalizeRole = useMemo(() => {
            let { role } = userDetails
            if( role ) return role.slice( 0, 1 ).toUpperCase() + role.slice( 1 )
        }, [ userDetails ])

    useEffect(() => {
        ourFetch({
            api: '/user-by-id',
            callback: fetchCallback,
            setter: setUserDetails,
            body: JSON.stringify({ id: userId })
        })   
    }, [ userId ])

    /**
     * Handle Tab click
     */
    const handleTabClick = ( current ) => {
        setTab( current );
    }

    return <main className="cmg-main student-details" id="cmg-main">
        <div className='page-header'>
            <div className="dashboard-intro">
                <h2 className="user-name">{ `${ capitalizeRole }s Details` }</h2>
                <ul className="cmg-breadcrumb" id="cmg-breadcrumb">
                    <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item"><Link to={ `/dashboard/${ userDetails?.role }s` }>{ `${ capitalizeRole }s` }</Link></li>
                    <li className="breadcrumb-item">{ `${ capitalizeRole } Details` }</li>
                </ul>
            </div>
            <TodaysDate />
        </div>

        <div className='student-body'>
            <div className="student-sidebar">
                <div className="student-profile student-sidebar-card">
                    <div className="student-profile__header">
                        <figure className="student-profile__avatar"></figure>
                        <div className="student-profile__info">
                            <span className="student-profile__status student-profile__status--active">Active</span>
                            <h2 className="student-profile__name">{ userDetails?.name }</h2>
                            <p className="student-profile__id">AD123456</p>
                        </div>
                    </div>
                    <div className="student-profile__section student-profile__basic-info">
                        <h3 className="student-profile__section-title title">Basic Information</h3>
                        <div className="student-profile__details">
                            <p className="student-profile__detail">
                                <span className="student-profile__label">Roll No</span>
                                <span className="student-profile__value">35013</span>
                            </p>
                            <p className="student-profile__detail">
                                <span className="student-profile__label">Gender</span>
                                <span className="student-profile__value">{ userDetails?.gender?.slice( 0, 1 ).toUpperCase() + userDetails?.gender?.slice( 1 ) }</span>
                            </p>
                            <p className="student-profile__detail">
                                <span className="student-profile__label">Date Of Birth</span>
                                <span className="student-profile__value">25 Jan 2008</span>
                            </p>
                            <p className="student-profile__detail">
                                <span className="student-profile__label">Mother Tongue</span>
                                <span className="student-profile__value">Nepali</span>
                            </p>
                            <p className="student-profile__detail">
                                <span className="student-profile__label">Language</span>
                                <span className="student-profile__value">Nepali</span>
                            </p>
                        </div>
                        <button className="student-profile__button">Add Fees</button>
                    </div>
                </div>
                <div className="student-profile__section student-profile__contact-info student-sidebar-card">
                    <h3 className="student-profile__section-title">Primary Contact Info</h3>
                    <div className="student-profile__contact">
                        <span className="student-profile__icon icon"></span>
                        <div className="student-profile__contact-detail">
                            <p className="student-profile__label">Phone Number</p>
                            <p className="student-profile__value">+ 1 324324</p>
                        </div>
                    </div>
                    <div className="student-profile__contact">
                        <span className="student-profile__icon icon"></span>
                        <div className="student-profile__contact-detail">
                            <p className="student-profile__label">Phone Number</p>
                            <p className="student-profile__value">+ 1 324324</p>
                        </div>
                    </div>
                </div>

                <div className="sibling-info student-sidebar-card">
                    <h3 className="sibling-info__title student-profile__section-title title">Sibiling Information</h3>
                    <div className="sibling-info__card">
                        <div className="sibling-info__thumb">
                            <figure className="sibling-info__avatar"></figure>
                        </div>
                        <div className="sibling-info__details">
                            <p className="sibling-info__name">Ralph Claudia</p>
                            <span className="sibling-info__class">III, B</span>
                        </div>
                    </div>
                    <div className="sibling-info__card">
                        <div className="sibling-info__thumb">
                            <figure className="sibling-info__avatar"></figure>
                        </div>
                        <div className="sibling-info__details">
                            <p className="sibling-info__name">Julie Scott</p>
                            <span className="sibling-info__class">V, A</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="student-main">
                <div className="student-main__tabs">
                    <ul className="student-main__tab-list">
                        <li className={ `student-main__tab-item ${( tab === 'details' ? 'active' : '' )}` } onClick={() => handleTabClick( 'details' )}><span className="icon"><FontAwesomeIcon icon={ faGraduationCap } /></span>Student Details</li>
                        <li className={ `student-main__tab-item ${( tab === 'time-table' ? 'active' : '' )}` } onClick={() => handleTabClick( 'time-table' )}><span className="icon"><FontAwesomeIcon icon={ faTable } /></span>Time Table</li>
                        <li className={ `student-main__tab-item ${( tab === 'LeaveAttendance' ? 'active' : '' )}` } onClick={() => handleTabClick( 'LeaveAttendance' )}><span className="icon"><FontAwesomeIcon icon={ faCalendarMinus } /></span>Leave & Attendance</li>
                        <li className={ `student-main__tab-item ${( tab === 'fees' ? 'active' : '' )}` } onClick={() => handleTabClick( 'fees' )}><span className="icon"><FontAwesomeIcon icon={  faFileInvoiceDollar } /></span>Fees</li>
                        <li className={ `student-main__tab-item ${( tab === 'exam' ? 'active' : '' )}` } onClick={() => handleTabClick( 'exam' )}><span className="icon"><FontAwesomeIcon icon={ faTable } /></span>Exam & Results</li>
                        <li className={ `student-main__tab-item ${( tab === 'library' ? 'active' : '' )}` } onClick={() => handleTabClick( 'library' )}><span className="icon"><FontAwesomeIcon icon={ faLinesLeaning } /></span>Library</li>
                    </ul>
                </div>
                { ( tab === 'details' ) && <Details /> }
                { ( tab === 'time-table' ) && <TimeTable /> }
                { ( tab === 'LeaveAttendance' ) && <LeaveAttendance /> }
                { ( tab === 'fees' ) && <Fees /> }
                { ( tab === 'exam' ) && <Exam /> }
                { ( tab === 'library' ) && <Library /> }
            </div>
        </div>
    </main>
}

/**
 * MARK: Student Details
 */
const Details = () => {
    return <>
        <div className="student-main__section personal-info">
            <h3 className="personal-info__title">Parents Information</h3>
            <div className="personal-info__list">
                <div className="parent-card">
                    <div className="parent-card__profile">
                        <figure className="parent-card__avatar"></figure>
                        <div className="parent-card__details">
                            <h3 className="parent-card__name">Jerald Vicinius</h3>
                            <span className="parent-card__role">Father</span>
                        </div>
                    </div>
                    <div className="parent-card__contact">
                        <p className="parent-card__label">Phone</p>
                        <span className="parent-card__value">+1 45545 46464</span>
                    </div>
                    <div className="parent-card__contact">
                        <p className="parent-card__label">Email</p>
                        <span className="parent-card__value">jera@example.com</span>
                    </div>
                    <button className="parent-card__reset-pass"></button>
                </div>

                <div className="parent-card">
                    <div className="parent-card__profile">
                        <figure className="parent-card__avatar"></figure>
                        <div className="parent-card__details">
                            <h3 className="parent-card__name">Jerald Vicinius</h3>
                            <span className="parent-card__role">Father</span>
                        </div>
                    </div>
                    <div className="parent-card__contact">
                        <p className="parent-card__label">Phone</p>
                        <span className="parent-card__value">+1 45545 46464</span>
                    </div>
                    <div className="parent-card__contact">
                        <p className="parent-card__label">Email</p>
                        <span className="parent-card__value">jera@example.com</span>
                    </div>
                    <button className="parent-card__reset-pass"></button>
                </div>
            </div>
        </div>

        <div className="student-main__section info-section">
            <div className="info-section__documents">
                <h3 className="info-section__title">Documents</h3>
            </div>
            <div className="info-section__address">
                <h3 className="info-section__title">Address</h3>
                <div className="info-section__address-list">
                    <div className="info-section__address-item">
                        <span className="info-section__icon icon"></span>
                        <div className="info-section__address-details">
                            <p className="info-section__label">Current Address</p>
                            <span className="info-section__value">3495 Red Hawk Road, Buffalo Lake, MN 55314</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

/**
 * MARK: Time Table
 */
const TimeTable = () => {
    return <div>
        Time table
    </div>
}

/**
 * MARK: leave
 */
const LeaveAttendance = () => {
    const [ tab, setTab ] = useState( 'leaves' )

    const handleTabClick = ( current ) => {
        setTab(current);
    }

    return <>
        <div className="leave-container">
            <div className="leave-tabs sub-card">
                <button className={ `leave-tabs__button ${( tab === 'leaves' ? 'leave-tabs__button--active' : '' )}` } onClick={() => handleTabClick( 'leaves' )}>Leaves</button>
                <button className={ `leave-tabs__button ${( tab === 'attendance' ? 'leave-tabs__button--active' : '' )}` } onClick={() => handleTabClick( 'attendance' )}>Attendance</button>
            </div>
            { ( tab === 'leaves' ) && <Leave /> }
            { ( tab === 'attendance' ) && <Attendance /> }
        </div>
    </>
}

const Leave = () => {

    const [ searched, setSearched ] = useState(''),
        [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ activePage, setActivePage ] = useState( 1 )
        // [ leave, setLeave ] = useState([]),
        // totalPages = new Array( Math.ceil( Leave.length / rowsPerPage ) ).fill( 0 )

    // useEffect(() => {
    //     ourFetch({
    //         api: 'student-details',
    //         callback: fetchCallback,
    //         setter: setLeave
    //     })
    // })

    /**
     * Handle next & previous
     */
    // const handlePagination = ( type ) => {
    //     if( type === 'next' ) {
    //         if( activePage >= totalPages.length ) return
    //         setActivePage( activePage + 1 )
    //     } else {
    //         if( activePage <= 1 ) return
    //         setActivePage( activePage - 1 )
    //     }
    // }

    return <>
        <div className="leave-summary sub-card">
            <div className="leave-summary__card">
                <p className="leave-summary__title">Medical Leave (10)</p>
                <p className="leave-summary__stats">
                    <span className="leave-summary__used">Used : 5</span>
                    <span className="leave-summary__available">Available : 5</span>
                </p>
            </div>
            <div className="leave-summary__card">
                <p className="leave-summary__title">Casual Leave (12)</p>
                <p className="leave-summary__stats">
                    <span className="leave-summary__used">Used : 1</span>
                    <span className="leave-summary__available">Available : 11</span>
                </p>
            </div>
            <div className="leave-summary__card">
                <p className="leave-summary__title">Maternity Leave (10)</p>
                <p className="leave-summary__stats">
                    <span className="leave-summary__used">Used : 0</span>
                    <span className="leave-summary__available">Available : 10</span>
                </p>
            </div>
            <div className="leave-summary__card">
                <p className="leave-summary__title">Paternity Leave (0)</p>
                <p className="leave-summary__stats">
                    <span className="leave-summary__used">Used : 0</span>
                    <span className="leave-summary__available">Available : 0</span>
                </p>
            </div>
        </div>

        <div className="leave-section">
            <div className="leave-section__header">
                <h3 className="leave-section__title">Leaves</h3>
                <button className="leave-section__apply-button">Apply Leave</button>
            </div>

            <RowAndSearch 
                rowsPerPage = { rowsPerPage }
                setRowsPerPage = { setRowsPerPage }
                setSearched = { setSearched }
            />

            <div className="leave-section__table">
                <table className="leave-table">
                    <thead>
                        <tr>
                            <th>Leave Type</th>
                            <th>Leave Date</th>
                            <th>No Of Days</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Casual Leave</td>
                            <td>07 May 2024 - 07 May 2024</td>
                            <td>1</td>
                            <td>07 May 2024</td>
                            <td className="leave-table__status leave-table__status--approved"><span>Approved</span></td>
                        </tr>
                        <tr>
                            <td>Casual Leave</td>
                            <td>07 May 2024 - 07 May 2024</td>
                            <td>1</td>
                            <td>07 May 2024</td>
                            <td className="leave-table__status leave-table__status--approved"><span>Approved</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        {/* <Pagination
            books = { filteredLeave }
            totalpages = { totalPages }
            activePage = { activePage }
            setActivePage = { setActivePage }
            handlePagination = { handlePagination }
        /> */}
    </>
}

const Attendance = () => {

    const [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ activePage, setActivePage ] = useState( 1 ),
        [ searched, setSearched ] = useState( '' )

    return <>
        <div>
            <div className="">
                <div>
                    <h3 className="">Attendance</h3>
                    <div className="fees__filter-button dropdown">
                        <span className="cmg-active-dropdown-item">
                            <span className="icon"><FontAwesomeIcon icon={ faCalendarMinus } /></span>
                            <span className="label">Year: 2024 / 2025</span>
                        </span>
                        <ul className="cmg-dropdown">
                            <li className="cmg-list-item active">Year: 2024 / 2025</li>
                            <li className="cmg-list-item">Year: 2023 / 2024</li>
                            <li className="cmg-list-item">Year: 2022 / 2023</li>
                        </ul>
                        <span className="fees-dropdown-icon"><FontAwesomeIcon icon={ faAngleDown } /></span>
                    </div>
                </div>
                <div>
                    <div>
                        <span className="icon"></span>
                        <div>
                            <p>Present</p>
                            <span>265</span>
                        </div>
                    </div>
                    <div>
                        <span className="icon"></span>
                        <div>
                            <p>Present</p>
                            <span>265</span>
                        </div>
                    </div>
                    <div>
                        <span className="icon"></span>
                        <div>
                            <p>Present</p>
                            <span>265</span>
                        </div>
                    </div>
                    <div>
                        <span className="icon"></span>
                        <div>
                            <p>Present</p>
                            <span>265</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <h3 className="">Leave & Attendance</h3>
                    <div className="fees__filter-button dropdown">
                        <span className="cmg-active-dropdown-item">
                            <span className="icon"><FontAwesomeIcon icon={ faCalendarMinus } /></span>
                            <span className="label">Year: 2024 / 2025</span>
                        </span>
                        <ul className="cmg-dropdown">
                            <li className="cmg-list-item active">Year: 2024 / 2025</li>
                            <li className="cmg-list-item">Year: 2023 / 2024</li>
                            <li className="cmg-list-item">Year: 2022 / 2023</li>
                        </ul>
                        <span className="fees-dropdown-icon"><FontAwesomeIcon icon={ faAngleDown } /></span>
                    </div>
                </div>
                <div>
                    <div>
                        <span className="icon"></span>
                        <p>Present</p>
                    </div>
                    <div>
                        <span className="icon"></span>
                        <p>Absent</p>
                    </div>
                    <div>
                        <span className="icon"></span>
                        <p>Late</p>
                    </div>
                    <div>
                        <span className="icon"></span>
                        <p>HalfDay</p>
                    </div>
                    <div>
                        <span className="icon"></span>
                        <p>holiday</p>
                    </div>
                </div>
                <RowAndSearch
                    rowsPerPage = { rowsPerPage }
                    setRowsPerPage = { setRowsPerPage }
                    setSearched = { setSearched }
                />
            </div>
        </div>
    </>
}

/**
 * MARK: fees
 */
const Fees = () => {
    return <>
        <div className="fees-wrapper">
            <div className="fees-header">
                <h3 className="fees-title">Fees</h3>
                <div className="fees__filter-button dropdown">
                    <span className="cmg-active-dropdown-item">
                        <span className="icon"><FontAwesomeIcon icon={ faCalendarMinus } /></span>
                        <span className="label">Year: 2024 / 2025</span>
                    </span>
                    <ul className="cmg-dropdown">
                        <li className="cmg-list-item active">Year: 2024 / 2025</li>
                        <li className="cmg-list-item">Year: 2023 / 2024</li>
                        <li className="cmg-list-item">Year: 2022 / 2023</li>
                    </ul>
                    <span className="fees-dropdown-icon"><FontAwesomeIcon icon={ faAngleDown } /></span>
                </div>
            </div>

            {/* <RowAndSearch
                rowsPerPage = { rowsPerPage }
                setRowsPerPage = { setRowsPerPage }
                setSearched = { setSearched }
            /> */}

            <div className="fees-table-wrapper">
                <table className="fees-table">
                    <thead>
                        <tr>
                            <th>Fees Group</th>
                            <th>Due Date</th>
                            <th>Amount $</th>
                            <th>Status</th>
                            <th>Ref Id</th>
                            <th>Mode</th>
                            <th>Date Paid</th>
                            <th>Discount $</th>
                            <th>Fine $</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Class 1 General</td>
                            <td>10 Jan 2024</td>
                            <td>25000</td>
                            <td>Paid</td>
                            <td>#4566</td>
                            <td>Cash</td>
                            <td>05 Jan 2024</td>
                            <td>10%</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>Class 1 General</td>
                            <td>10 Jan 2024</td>
                            <td>25000</td>
                            <td>Paid</td>
                            <td>#4566</td>
                            <td>Cash</td>
                            <td>05 Jan 2024</td>
                            <td>10%</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>Class 1 General</td>
                            <td>10 Jan 2024</td>
                            <td>25000</td>
                            <td>Paid</td>
                            <td>#4566</td>
                            <td>Cash</td>
                            <td>05 Jan 2024</td>
                            <td>10%</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
            {/* <Pagination /> */}
    </>
}

/**
 * MARK: Exam & Results
 */
const Exam = () => {
    return <>
        <div>
            <div className="">
                <h3 className="">Fees</h3>
                <div className="fees__filter-button dropdown">
                    <span className="cmg-active-dropdown-item">
                        <span className="icon"><FontAwesomeIcon icon={ faCalendarMinus } /></span>
                        <span className="label">Year: 2024 / 2025</span>
                    </span>
                    <ul className="cmg-dropdown">
                        <li className="cmg-list-item active">Year: 2024 / 2025</li>
                        <li className="cmg-list-item">Year: 2023 / 2024</li>
                        <li className="cmg-list-item">Year: 2022 / 2023</li>
                    </ul>
                    <span className="fees-dropdown-icon"><FontAwesomeIcon icon={ faAngleDown } /></span>
                </div>
            </div>

            <div>

            </div>
        </div>
    </>
}

/**
 * MARK: Library
 */
const Library = () => {
    return <>
        <div className="library">
            <div className="library__header">
                <h3 className="library__title">Library</h3>
                <div className="library__filter-button dropdown">
                    <span className="cmg-active-dropdown-item">
                        <span className="icon"><FontAwesomeIcon icon={ faCalendarMinus } /></span>
                        <span className="label">This Year</span>
                    </span>
                    <ul className="cmg-dropdown">
                        <li className="cmg-list-item active">This Year</li>
                        <li className="cmg-list-item">This Month</li>
                        <li className="cmg-list-item">This Week</li>
                    </ul>
                </div>
            </div>

            <div className="library__list">
                <div className="library__card">
                    <div className="library__thumbnail thumbnail"></div>
                    <h2 className="library__book-title">The Small-Town Library</h2>
                    <div className="library__dates">
                        <span className="library__date-item">
                            <span className="library__date-label">Book taken on</span>
                            <p className="library__date-value">25 Jan 2024</p>
                        </span>
                        <span className="library__date-item">
                            <span className="library__date-label">Last Date</span>
                            <p className="library__date-value">25 Jan 2024</p>
                        </span>
                    </div>
                </div>

                <div className="library__card">
                    <div className="library__thumbnail thumbnail"></div>
                    <h2 className="library__book-title">The Small-Town Library</h2>
                    <div className="library__dates">
                        <span className="library__date-item">
                            <span className="library__date-label">Book taken on</span>
                            <p className="library__date-value">25 Jan 2024</p>
                        </span>
                        <span className="library__date-item">
                            <span className="library__date-label">Last Date</span>
                            <p className="library__date-value">25 Jan 2024</p>
                        </span>
                    </div>
                </div>

                <div className="library__card">
                    <div className="library__thumbnail thumbnail"></div>
                    <h2 className="library__book-title">The Small-Town Library</h2>
                    <div className="library__dates">
                        <span className="library__date-item">
                            <span className="library__date-label">Book taken on</span>
                            <p className="library__date-value">25 Jan 2024</p>
                        </span>
                        <span className="library__date-item">
                            <span className="library__date-label">Last Date</span>
                            <p className="library__date-value">25 Jan 2024</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </>
}