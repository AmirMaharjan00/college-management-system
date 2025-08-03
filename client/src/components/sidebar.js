import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableList, faGraduationCap, faUserTie, faUsers, faBookAtlas, faBookOpen, faCoins, faSackDollar, faLinesLeaning, faTimeline, faReceipt, faTable, faClipboardList, faListCheck, faFilePen, faCircleExclamation, faMoneyCheckDollar, faBasketShopping, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext, useCallback, useMemo } from 'react'
import { GLOBALCONTEXT } from '../App'
import { Link, useLocation } from 'react-router-dom'
import './assets/scss/sidebar.scss'
import './assets/scss/sidebar.scss'

/**
 * Sidebar
 * 
 * @since 1.0.0
 */
export const Sidebar = () => {
    const global = useContext( GLOBALCONTEXT ),
        { loggedInUser, canvasOpen } = global,
        { role } = loggedInUser,
        location = useLocation(),
        getClass = useCallback(( id ) => {
            return `cmg-list-item${( id === location.pathname ? ' active' : '' )}`
        }, [ location ])

    return <aside className="cmg-sidebar" id="cmg-sidebar">
        <div className="cmg-menu">
            <div className="cmg-menu-item main-menu">
                <h2 className="submenu-heading">
                    <span>Main</span>
                </h2>
                <ul className="cmg-submenu">
                    <li className={ getClass( '/dashboard' ) }>
                        <Link to="/dashboard" className='cmg-icon-wrapper'>
                            <span className="cmg-icon"><i className='bx bxs-dashboard'></i></span>
                            <span className="cmg-icon-label">Dashboard</span>
                        </Link>
                    </li>
                    <li className={ getClass( '/application' ) }>
                        <a href="#" className="cmg-icon-wrapper">
                            <span className="cmg-icon"><FontAwesomeIcon icon={ faTableList } /></span>
                            <span className="cmg-icon-label">Application</span>
                        </a>
                    </li>
                </ul>
            </div>
            {
                ( role === 'admin' ) && <div className="cmg-menu-item">
                    <h2 className="submenu-heading">
                        <span>Peoples</span>
                    </h2>
                    <ul className="cmg-submenu">
                        <li className={ getClass( '/dashboard/students' ) }>
                            <Link to="/dashboard/students" className='cmg-icon-wrapper'>
                                <span className='cmg-icon'><FontAwesomeIcon icon={ faGraduationCap } /></span>
                                <span className='cmg-icon-label'>Students</span>
                            </Link>
                        </li>
                        <li className={ getClass( '/dashboard/teachers' ) }>
                            <Link to="/dashboard/teachers" className='cmg-icon-wrapper'>
                                <span className='cmg-icon'><FontAwesomeIcon icon={ faUserTie } /></span>
                                <span className='cmg-icon-label'>Teachers</span>
                            </Link>
                        </li>
                        <li className={ getClass( '/dashboard/staffs' ) }>
                            <Link to="/dashboard/staffs" className='cmg-icon-wrapper'>
                                <span className='cmg-icon'><FontAwesomeIcon icon={ faUsers } /></span>
                                <span className='cmg-icon-label'>Staff</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            }
            <div className="cmg-menu-item academic-menu">
                <h2 className="submenu-heading">
                    <span>Academic</span>
                </h2>
                <ul className="cmg-submenu">
                    <li className={ getClass( 'routines' ) }>
                        <Link to="/dashboard/academic/routines" className='cmg-icon-wrapper'>
                            <span className='cmg-icon'><FontAwesomeIcon icon={ faTable }/></span>
                            <span className='cmg-icon-label'>Class Routines</span>
                        </Link>
                    </li >
                    <li className={ getClass( 'subjects' ) }>
                        <Link to="/dashboard/academic/subjects" className='cmg-icon-wrapper'>
                            <span className='cmg-icon'><FontAwesomeIcon icon={ faBookOpen }/></span>
                            <span className='cmg-icon-label'>Subject</span>
                        </Link>
                    </li >
                    <li className={ getClass( 'syllabus' ) }>
                        <Link to="/dashboard/academic/syllabus" className='cmg-icon-wrapper'>
                            <span className='cmg-icon'><FontAwesomeIcon icon={ faClipboardList }/></span>
                            <span className='cmg-icon-label'>Syllabus</span>
                        </Link>
                    </li >
                    <li className={ getClass( 'home-work' ) }>
                        <Link to="/dashboard/academic/home-work" className='cmg-icon-wrapper'>
                            <span className='cmg-icon'><FontAwesomeIcon icon={ faListCheck }/></span>
                            <span className='cmg-icon-label'>Home Work</span>
                        </Link>
                    </li >
                    <li className={ getClass( 'examinations' ) }>
                        <Link to="/dashboard/academic/examinations" className='cmg-icon-wrapper'>
                            <span className='cmg-icon'><FontAwesomeIcon icon={ faFilePen }/></span>
                            <span className='cmg-icon-label'>Examinations</span>
                        </Link>
                    </li >
                    <li className={ getClass( 'complaints' ) }>
                        <Link to="/dashboard/academic/complaints" className='cmg-icon-wrapper'>
                            <span className='cmg-icon'><FontAwesomeIcon icon={ faCircleExclamation }/></span>
                            <span className='cmg-icon-label'>Complaints</span>
                        </Link>
                    </li >
                </ul >
            </div>
            {
                ( role === 'admin' ) && <>
                    <div className="cmg-menu-item">
                        <h2 className="submenu-heading">
                            <span>Library</span>
                        </h2>
                        <ul className="cmg-submenu">
                            <li className={ getClass( '/dashboard/library' ) }>
                                <Link to="/dashboard/library" className='cmg-icon-wrapper'>
                                    <span className='cmg-icon'><FontAwesomeIcon icon={ faLinesLeaning } /></span>
                                    <span className='cmg-icon-label'>Manage Library</span>
                                </Link>
                            </li>
                            <li className={ getClass( '/dashboard/library/books' ) }>
                                <Link to="/dashboard/library/books" className='cmg-icon-wrapper'>
                                    <span className='cmg-icon'><FontAwesomeIcon icon={ faBookAtlas } /></span>
                                    <span className='cmg-icon-label'>All Books</span>
                                </Link>
                            </li>
                            <li className={ getClass( '/dashboard/library/issued' ) }>
                                <Link to="/dashboard/library/issued" className='cmg-icon-wrapper'>
                                    <span className='cmg-icon'><FontAwesomeIcon icon={ faBookOpen } /></span>
                                    <span className='cmg-icon-label'>Issued Books</span>
                                </Link>
                            </li>
                            <li className={ getClass( '/dashboard/library/fines' ) }>
                                <Link to="/dashboard/library/fines" className='cmg-icon-wrapper'>
                                    <span className='cmg-icon'><FontAwesomeIcon icon={ faCoins } /></span>
                                    <span className='cmg-icon-label'>Fines</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="cmg-menu-item">
                        <h2 className="submenu-heading">
                            <span>Account</span>
                        </h2>
                        <ul className="cmg-submenu">
                            <li className={ getClass( '/dashboard/account' ) }>
                                <Link to="/dashboard/account" className='cmg-icon-wrapper'>
                                    <span className='cmg-icon'><FontAwesomeIcon icon={ faSackDollar } /></span>
                                    <span className='cmg-icon-label'>Manage Accounts</span>
                                </Link>
                            </li>
                            <li className={ getClass( '/dashboard/account/history' ) }>
                                <Link to="/dashboard/account/history" className='cmg-icon-wrapper'>
                                    <span className='cmg-icon'><FontAwesomeIcon icon={ faTimeline } /></span>
                                    <span className='cmg-icon-label'>History</span>
                                </Link>
                            </li>
                            <li className={ getClass( '/dashboard/account/payroll' ) }>
                                <Link to="/dashboard/account/payroll" className='cmg-icon-wrapper'>
                                    <span className='cmg-icon'><FontAwesomeIcon icon={ faMoneyCheckDollar } /></span>
                                    <span className='cmg-icon-label'>Payroll</span>
                                </Link>
                            </li>
                            <li className={ getClass( '/dashboard/account/expense-tracking' ) }>
                                <Link to="/dashboard/account/expense-tracking" className='cmg-icon-wrapper'>
                                    <span className='cmg-icon'><FontAwesomeIcon icon={ faBasketShopping } /></span>
                                    <span className='cmg-icon-label'>Expense Tracking</span>
                                </Link>
                            </li>
                            <li className={ getClass( '/dashboard/account/pay-fees' ) }>
                                <Link to="/dashboard/account/pay-fees" className='cmg-icon-wrapper'>
                                    <span className='cmg-icon'><FontAwesomeIcon icon={ faReceipt } /></span>
                                    <span className='cmg-icon-label'>Pay Fees</span>
                                </Link>
                            </li>
                            <li className={ getClass( '/dashboard/account/manage-income' ) }>
                                <Link to="/dashboard/account/manage-income" className='cmg-icon-wrapper'>
                                    <span className='cmg-icon'><FontAwesomeIcon icon={ faMoneyBill } /></span>
                                    <span className='cmg-icon-label'>Manage Income</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
        </div>
    </aside>
}