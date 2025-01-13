import { useContext, createContext } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from './assets/images/sscollege-logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGraduationCap, faUserGroup, faUsers, faFileInvoiceDollar, faMoon, faBell, faMessage, faUser } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import { GLOBALCONTEXT } from '../App';
import './assets/css/header.css'
import { ourFetch } from './functions';

const HeaderContext = createContext()
/**
 * Header
 * 
 * @since 1.0.0
 */
export const Header = () => {
    const Global = useContext( GLOBALCONTEXT )
    const { loggedInUser } = Global

    const contextObject = {

    }

    return <>
        <header className="cmg-header" id="cmg-header">
            <div className="header">
                <a href="{% url 'members' %}" className="logo-wrapper">
                    <figure className="image-wrapper">
                        <img src={ logo } alt="Shahid Smarak College Logo" />
                    </figure>
                    <h2 className="header-title">Shahid Smarak College</h2>
                </a>
                <button className="canvas-icon"><FontAwesomeIcon icon={ faBars } /></button>
            </div>
            <div className="cmg-search-actions-wrapper">
                <form action="#" id="header-search">
                    <input type="search" name="search" id="search" placeholder="Search..."/>
                </form>
                <div className="cmg-header-actions">
                    <div className="action academic-year-wrapper">
                        <span className="cmg-active-dropdown-item active-academic-year">Academic Year: 2080</span>
                        <ul className="academic-year-dropdown cmg-dropdown">
                            <li className="cmg-list-item active">Academic Year: 2080</li>
                            <li className="cmg-list-item">Academic Year: 2079</li>
                            <li className="cmg-list-item">Academic Year: 2078</li>
                        </ul>
                    </div>
                    <div className="action language-wrapper">
                        <span className="cmg-active-dropdown-item active-language">English</span>
                        <ul className="language-dropdown cmg-dropdown">
                            <li className="cmg-list-item active">English</li>
                            <li className="cmg-list-item">Nepali</li>
                        </ul>
                    </div>
                    <div className="action add-new-wrapper">
                        <span className="cmg-active-dropdown-item"><FontAwesomeIcon icon={ faSquarePlus } /></span>
                        <div className="dropdown-box cmg-dropdown">
                            <h2>Add New</h2>
                            <ul className="add-new-dropdown">
                                <li className="cmg-list-item">
                                    <span className="add-new-icon student"><FontAwesomeIcon icon={ faGraduationCap } /></span>
                                    <span>Student</span>
                                </li>
                                <li className="cmg-list-item">
                                    <span className="add-new-icon teacher"><FontAwesomeIcon icon={ faUserGroup } /></span>
                                    <span>Teachers</span>
                                </li>
                                <li className="cmg-list-item">
                                    <span className="add-new-icon staff"><FontAwesomeIcon icon={ faUsers } /></span>
                                    <span>Staffs</span>
                                </li>
                                <li className="cmg-list-item invoice">
                                    <span className="add-new-icon"><FontAwesomeIcon icon={ faFileInvoiceDollar } /></span>
                                    <span>Invoice</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <DarkMode />
                    <Notification />
                    <Message />
                    <User />
                </div>
            </div>
        </header>
    </>
}

/**
 * MARK: Dark Mode
 * 
 * @since 1.0.0
 */
const DarkMode = () =>{
    const Global = useContext( GLOBALCONTEXT )
    const { setIsDarkMode, isDarkMode, loggedInUser } = Global
    const { id } = loggedInUser

    const handleDarkMode = () => {
        let currentDarkMode = ( isDarkMode === 'dark' ? 'light' : 'dark' )
        ourFetch({
            api: '/set-dark-mode',
            callback: setDarkModeCallback,
            body: JSON.stringify({ view: currentDarkMode, id })
        })
    }

    /* Callback */
    const setDarkModeCallback = ( data ) => {
        let { success, view } = data
        if( success ) setIsDarkMode( view )
    }

    return <div className="action dark-mode-wrapper" onClick={ handleDarkMode }>
        <span className="dark-mode-icon"><FontAwesomeIcon icon={ faMoon } /></span>
    </div>
}

/**
 * MARK: Notification
 * 
 * @since 1.0.0
 */
const Notification = () =>{
    return <div className="action notification-wrapper">
        <span className="notification-icon"><FontAwesomeIcon icon={ faBell } /></span>
    </div>
}

/**
 * MARK: Message
 * 
 * @since 1.0.0
 */
const Message = () =>{
    return <div className="action message-wrapper">
        <span className="message-icon"><FontAwesomeIcon icon={ faMessage } /></span>
    </div>
}

/**
 * MARK: User
 * 
 * @since 1.0.0
 */
const User = () => {
    /* Global Context */
    const Global = useContext( GLOBALCONTEXT )
    const navigate = useNavigate()
    const {
        setIsloggedIn,
        loggedInUser,
        setLoggedInUser,
        setOverlay,
        isUserLogoutDropdownActive,
        setIsUserLogoutDropdownActive
    } = Global
    const { role, name, email } = loggedInUser

    /* Handle Click */
    const handleClick = () => {
        setIsUserLogoutDropdownActive( true )
        setOverlay( true )
    }
    
    /* Handle Logout */
    const handleLogout = () => {
        fetch( 'http://localhost:5000/logout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        })
        .then(( result ) => result.json())
        .then(( data ) => {
            let { logout } = data
            if( logout ) {
                setLoggedInUser({})
                setIsloggedIn( false )
                setOverlay( false )
                setIsUserLogoutDropdownActive( false )
                navigate( '/login' )
            }
        })
    }

    return <div className="action user-wrapper" id='cmg-head-user-wrapper'>
        <span className="user-icon" onClick={ handleClick }><FontAwesomeIcon icon={ faUser } /></span>
        { isUserLogoutDropdownActive && <ul className='user-dropdown'>
            <li className='head-wrapper cmg-list-item'>
                <h2 className='head name'>{ name }</h2>
                <span className='head email'>{ email }</span>
                <span className='head role'>{ role.slice( 0, 1 ).toUpperCase() + role.slice( 1 ) }</span>
            </li>
            <li className='seperator'></li>
            <li className='body cmg-list-item'>{ 'Dashboard' }</li>
            <li className='body cmg-list-item'>{ 'Profile' }</li>
            <li className='seperator'></li>
            <li className='body cmg-list-item'>{ 'Grades' }</li>
            <li className='body cmg-list-item'>{ 'Calender' }</li>
            <li className='body cmg-list-item'>{ 'Private files' }</li>
            <li className='body cmg-list-item'>{ 'Reports' }</li>
            <li className='seperator'></li>
            <li className='body cmg-list-item'>{ 'Preferences' }</li>
            <li className='seperator'></li>
            <li className='foot cmg-list-item'>
                <button className='logout-button' onClick={ handleLogout }>{ 'Log out' }</button>
            </li>
        </ul>}
    </div>
}