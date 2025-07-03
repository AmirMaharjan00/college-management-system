import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableList, faGraduationCap, faUserTie, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react'
import { GLOBALCONTEXT } from '../App'
import { Link } from 'react-router-dom'


/**
 * Sidebar
 * 
 * @since 1.0.0
 */
export const Sidebar = () => {
    const global = useContext( GLOBALCONTEXT ),
        { role } = global.loggedInUser;

    return <aside className="cmg-sidebar" id="cmg-sidebar">
        <div className="cmg-menu">
            <div className="cmg-menu-item main-menu">
                <h2 className="submenu-heading">
                    <span>Main</span>
                </h2>
                <ul className="cmg-submenu">
                    <li className="cmg-list-item active">
                        <a href="#" className="cmg-icon-wrapper">
                            <span className="cmg-icon"><i className='bx bxs-dashboard'></i></span>
                            <span className="cmg-icon-label">Dashboard</span>
                        </a>
                    </li>
                    <li className="cmg-list-item">
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
                        <li className="cmg-list-item">
                            <Link to="/dashboard/students">
                                <span className='cmg-icon'><FontAwesomeIcon icon={ faGraduationCap } /></span>
                                <span className='cmg-icon-label'>Students</span>
                            </Link>
                        </li>
                        <li className="cmg-list-item">
                            <Link to="/dashboard/teachers">
                                <span className='cmg-icon'><FontAwesomeIcon icon={ faUserTie } /></span>
                                <span className='cmg-icon-label'>Teachers</span>
                            </Link>
                        </li>
                        <li className="cmg-list-item">
                            <Link to="/dashboard/staffs">
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
                    <li className="cmg-list-item"><a href="#">Classes</a></li>
                    <li className="cmg-list-item"><a href="#">Class Room</a></li>
                    <li className="cmg-list-item"><a href="#">Class Routines</a></li>
                    <li className="cmg-list-item"><a href="#">Section</a></li>
                    <li className="cmg-list-item"><a href="#">Subject</a></li>
                    <li className="cmg-list-item"><a href="#">Syllabus</a></li>
                    <li className="cmg-list-item"><a href="#">Time Table</a></li>
                    <li className="cmg-list-item"><a href="#">Home Work</a></li>
                    <li className="cmg-list-item"><a href="#">Examinations</a></li>
                    <li className="cmg-list-item"><a href="#">Reasons</a></li>
                </ul>
            </div>
            {
                ( role === 'admin' ) && <>
                    <div className="cmg-menu-item">
                        <h2 className="submenu-heading">
                            <span>Library</span>
                        </h2>
                        <ul className="cmg-submenu">
                            <li className="cmg-list-item"><a href="#">Issued</a></li>
                            <li className="cmg-list-item"><a href="#">Books</a></li>
                            <li className="cmg-list-item"><a href="#">Fines</a></li>
                        </ul>
                    </div>
                    <div className="cmg-menu-item">
                        <h2 className="submenu-heading">
                            <span>Account</span>
                        </h2>
                        <ul className="cmg-submenu">
                            <li className="cmg-list-item"><a href="#">Issued</a></li>
                            <li className="cmg-list-item"><a href="#">Books</a></li>
                            <li className="cmg-list-item"><a href="#">Fines</a></li>
                        </ul>
                    </div>
                </>
            }
        </div>
    </aside>
}