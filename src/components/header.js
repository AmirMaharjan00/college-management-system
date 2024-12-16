import logo from './assets/images/sscollege-logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGraduationCap, faUserGroup, faUsers, faFileInvoiceDollar, faMoon, faBell, faMessage, faUser } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus} from '@fortawesome/free-regular-svg-icons';

/**
 * Header
 * 
 * @since 1.0.0
 */
export const Header = () => {
    return <>
        <header class="cmg-header" id="cmg-header">
            <div class="header">
                <a href="{% url 'members' %}" class="logo-wrapper">
                    <figure class="image-wrapper">
                        <img src={ logo } alt="Shahid Smarak College Logo" />
                    </figure>
                    <h2 class="header-title">Shahid Smarak College</h2>
                </a>
                <button class="canvas-icon"><FontAwesomeIcon icon={ faBars } /></button>
            </div>
            <div class="cmg-search-actions-wrapper">
                <form action="" id="header-search">
                    <input type="search" name="search" id="search" placeholder="Search..."/>
                </form>
                <div class="cmg-header-actions">
                    <div class="action academic-year-wrapper">
                        <span class="cmg-active-dropdown-item active-academic-year">Academic Year: 2080</span>
                        <ul class="academic-year-dropdown cmg-dropdown">
                            <li class="cmg-list-item active">Academic Year: 2080</li>
                            <li class="cmg-list-item">Academic Year: 2079</li>
                            <li class="cmg-list-item">Academic Year: 2078</li>
                        </ul>
                    </div>
                    <div class="action language-wrapper">
                        <span class="cmg-active-dropdown-item active-language">English</span>
                        <ul class="language-dropdown cmg-dropdown">
                            <li class="cmg-list-item active">English</li>
                            <li class="cmg-list-item">Nepali</li>
                        </ul>
                    </div>
                    <div class="action add-new-wrapper">
                        <span class="cmg-active-dropdown-item"><FontAwesomeIcon icon={ faSquarePlus } /></span>
                        <div class="dropdown-box cmg-dropdown">
                            <h2>Add New</h2>
                            <ul class="add-new-dropdown">
                                <li class="cmg-list-item">
                                    <span class="add-new-icon student"><FontAwesomeIcon icon={ faGraduationCap } /></span>
                                    <span>Student</span>
                                </li>
                                <li class="cmg-list-item">
                                    <span class="add-new-icon teacher"><FontAwesomeIcon icon={ faUserGroup } /></span>
                                    <span>Teachers</span>
                                </li>
                                <li class="cmg-list-item">
                                    <span class="add-new-icon staff"><FontAwesomeIcon icon={ faUsers } /></span>
                                    <span>Staffs</span>
                                </li>
                                <li class="cmg-list-item invoice">
                                    <span class="add-new-icon"><FontAwesomeIcon icon={ faFileInvoiceDollar } /></span>
                                    <span>Invoice</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="action dark-mode-wrapper">
                        <span class="dark-mode-icon"><FontAwesomeIcon icon={ faMoon } /></span>
                    </div>
                    <div class="action notification-wrapper">
                        <span class="notification-icon"><FontAwesomeIcon icon={ faBell } /></span>
                    </div>
                    <div class="action message-wrapper">
                        <span class="message-icon"><FontAwesomeIcon icon={ faMessage } /></span>
                    </div>
                    <div class="action user-wrapper">
                        <span class="user-icon"><FontAwesomeIcon icon={ faUser } /></span>
                    </div>
                </div>
            </div>
        </header>
    </>
}