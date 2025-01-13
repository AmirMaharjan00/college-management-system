import { useContext, createContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
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
                <Link to="/dashboard" className="logo-wrapper">
                    <figure className="image-wrapper">
                        <img src={ logo } alt="Shahid Smarak College Logo" />
                    </figure>
                    <h2 className="header-title">Shahid Smarak College</h2>
                </Link>
                <button className="canvas-icon"><FontAwesomeIcon icon={ faBars } /></button>
            </div>
            <div className="cmg-search-actions-wrapper">
                <form action="#" id="header-search">
                    <input type="search" name="search" id="search" placeholder="Search..."/>
                </form>
                <div className="cmg-header-actions">
                    <AcademicYear />
                    <Language />
                    <AddNew />
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
 * MARK: Academic Year
 * 
 * @since 1.0.0
 */
const AcademicYear = () => {
    const Global = useContext( GLOBALCONTEXT )
    const { isAcademicYearActive, setIsAcademicYearActive, setOverlay } = Global

    /* Handle Click */
    const handleClick = () => {
        setIsAcademicYearActive( ! isAcademicYearActive )
        setOverlay( true )
    }

    return <div className="action academic-year-wrapper" id="academic-year-wrapper">
        <span className="cmg-active-dropdown-item active-academic-year" onClick={ handleClick }>Academic Year: 2080</span>
        { isAcademicYearActive && <ul className="academic-year-dropdown">
            <li className="cmg-list-item active">Academic Year: 2080</li>
            <li className="cmg-list-item">Academic Year: 2079</li>
            <li className="cmg-list-item">Academic Year: 2078</li>
        </ul> }
    </div>
}

/**
 * MARK: Language
 * 
 * @since 1.0.0
 */
const Language = () => {
    const Global = useContext( GLOBALCONTEXT )
    const { isLanguageActive, setIsLanguageActive, setOverlay } = Global

    /* Handle Click */
    const handleClick = () => {
        setIsLanguageActive( ! isLanguageActive )
        setOverlay( true )
    }

    return <div className="action language-wrapper" id="language-wrapper">
        <span className="cmg-active-dropdown-item active-language" onClick={ handleClick }>English</span>
        { isLanguageActive && <ul className="language-dropdown">
            <li className="cmg-list-item active">English</li>
            <li className="cmg-list-item">Nepali</li>
        </ul> }
    </div>
}

/**
 * MARK: Add New
 * 
 * @since 1.0.0
 */
const AddNew = () => {
    const Global = useContext( GLOBALCONTEXT )
    const { isUserAddNewActive, setIsUserAddNewActive, setOverlay } = Global

    /* Handle Click */
    const handleClick = () => {
        setIsUserAddNewActive( ! isUserAddNewActive )
        setOverlay( true )
    }

    return <div className="action add-new-wrapper" id="add-new-wrapper">
        <span className="cmg-active-dropdown-item" onClick={ handleClick }><FontAwesomeIcon icon={ faSquarePlus } /></span>
        { isUserAddNewActive && <div className="dropdown-box add-new-dropdown">
            <h2 className='dropdown-head'>Add New</h2>
            <ul className="add-new-dropdown-list">
                <li className="cmg-list-item">
                    <span className="add-new-icon student"><FontAwesomeIcon icon={ faGraduationCap } /></span>
                    <span className='add-new-label'>Student</span>
                </li>
                <li className="cmg-list-item">
                    <span className="add-new-icon teacher"><FontAwesomeIcon icon={ faUserGroup } /></span>
                    <span className='add-new-label'>Teachers</span>
                </li>
                <li className="cmg-list-item">
                    <span className="add-new-icon staff"><FontAwesomeIcon icon={ faUsers } /></span>
                    <span className='add-new-label'>Staffs</span>
                </li>
                <li className="cmg-list-item invoice">
                    <span className="add-new-icon"><FontAwesomeIcon icon={ faFileInvoiceDollar } /></span>
                    <span className='add-new-label'>Invoice</span>
                </li>
            </ul>
        </div> }
    </div>
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

    return <div className="action dark-mode-wrapper">
        <span className="cmg-active-dropdown-item" onClick={ handleDarkMode }><FontAwesomeIcon icon={ faMoon } /></span>
    </div>
}

/**
 * MARK: Notification
 * 
 * @since 1.0.0
 */
const Notification = () =>{
    return <div className="action notification-wrapper">
        <span className="cmg-active-dropdown-item"><FontAwesomeIcon icon={ faBell } /></span>
    </div>
}

/**
 * MARK: Message
 * 
 * @since 1.0.0
 */
const Message = () =>{
    return <div className="action message-wrapper">
        <span className="cmg-active-dropdown-item"><FontAwesomeIcon icon={ faMessage } /></span>
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
        <span className="cmg-active-dropdown-item" onClick={ handleClick }><FontAwesomeIcon icon={ faUser } /></span>
        { isUserLogoutDropdownActive && <ul className='user-dropdown'>
            <li className='head-wrapper cmg-list-item'>
                <h2 className='head name'>{ name }</h2>
                <span className='head email'>{ email }</span>
                <span className='head role'>{ role.slice( 0, 1 ).toUpperCase() + role.slice( 1 ) }</span>
            </li>
            <li className='seperator'></li>
            <li className='body cmg-list-item'><Link to="/dashboard" className='inner-item'>{ 'Dashboard' }</Link></li>
            <li className='body cmg-list-item'><Link className='inner-item'>{ 'Profile' }</Link></li>
            <li className='seperator'></li>
            <li className='body cmg-list-item'><Link className='inner-item'>{ 'Grades' }</Link></li>
            <li className='body cmg-list-item'><Link className='inner-item'>{ 'Calender' }</Link></li>
            <li className='body cmg-list-item'><Link className='inner-item'>{ 'Private files' }</Link></li>
            <li className='body cmg-list-item'><Link className='inner-item'>{ 'Reports' }</Link></li>
            <li className='seperator'></li>
            <li className='body cmg-list-item'><Link className='inner-item'>{ 'Preferences' }</Link></li>
            <li className='seperator'></li>
            <li className='foot cmg-list-item'>
                <button className='logout-button' onClick={ handleLogout }>{ 'Log out' }</button>
            </li>
        </ul>}
    </div>
}