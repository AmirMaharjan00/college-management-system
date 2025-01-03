import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableList } from '@fortawesome/free-solid-svg-icons';

/**
 * Sidebar
 * 
 * @since 1.0.0
 */
export const Sidebar = () => {
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
            <div className="cmg-menu-item layout-menu">
                <h2 className="submenu-heading">
                    <span>Layout</span>
                </h2>
                <ul className="cmg-submenu">
                    <li className="cmg-list-item"><a href="#">Default</a></li>
                    <li className="cmg-list-item"><a href="#">Mini</a></li>
                    <li className="cmg-list-item"><a href="#">RTL</a></li>
                    <li className="cmg-list-item"><a href="#">Box</a></li>
                    <li className="cmg-list-item"><a href="#">Dark</a></li>
                </ul>
            </div>
            <div className="cmg-menu-item peoples-menu">
                <h2 className="submenu-heading">
                    <span>Peoples</span>
                </h2>
                <ul className="cmg-submenu">
                    <li className="cmg-list-item"><a href="#">Student</a></li>
                    <li className="cmg-list-item"><a href="#">Parents</a></li>
                    <li className="cmg-list-item"><a href="#">Guardians</a></li>
                    <li className="cmg-list-item"><a href="#">Teachers</a></li>
                </ul>
            </div>
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
        </div>
    </aside>
}