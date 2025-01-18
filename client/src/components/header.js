import { useContext, createContext, useState, useEffect, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import logo from './assets/images/sscollege-logo.jpg'
import background from './assets/images/background.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGraduationCap, faCircleXmark, faXmark, faPaperPlane, faUserGroup, faUsers, faBook, faMoon, faBell, faMessage, faUser } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import { GLOBALCONTEXT } from '../App';
import './assets/css/header.css'
import { ourFetch } from './functions';
import { AddNewUser } from './forms/add-new-user'
import { AddNewCourseSubject } from './forms/add-new-cs'
import { AddNewNotification } from './forms/add-new-notification'

export const HeaderContext = createContext()
/**
 * Header
 * 
 * @since 1.0.0
 */
export const Header = () => {
    const Global = useContext( GLOBALCONTEXT )
    const { newRegister, isNotificationShown, notificationId, chatId, showChat } = Global
    const [ registerNew, setRegisterNew ] = useState( 'student' )
    // console.log( Global, 'Global' )

    const contextObject = {
        registerNew, setRegisterNew
    }

    return <HeaderContext.Provider value={ contextObject }>
        { isNotificationShown && <div className='notification-overlay'></div> }
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
        { newRegister && ( [ 'student', 'teacher', 'staffs' ].includes( registerNew ) ) && <AddNewUser role={ registerNew }/> }
        { newRegister && ( [ 'course', 'subject' ].includes( registerNew ) ) && <AddNewCourseSubject type={ registerNew }/> }
        { newRegister && ( [ 'notification' ].includes( registerNew ) ) && <AddNewNotification type={ registerNew }/> }
        { isNotificationShown && <ShowNotification id={ notificationId } /> }
        { showChat && <Chat id={ chatId } /> }
    </HeaderContext.Provider>
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
    const Header = useContext( HeaderContext )
    const { isUserAddNewActive, setIsUserAddNewActive, setOverlay, setNewRegister } = Global
    const { setRegisterNew } = Header

    /* Handle Click */
    const handleClick = () => {
        setIsUserAddNewActive( ! isUserAddNewActive )
        setOverlay( true )
    }

    /* Add New Array */
    const addNewArray = {
        student: faGraduationCap,
        teacher: faUserGroup,
        staffs: faUsers,
        course: faBook,
        subject: faBook,
        notification: faBell
    }

    /* Handle Item Click */
    const handleItemClick = ( toRegister ) => {
        setNewRegister( true )
        setIsUserAddNewActive( false )
        setRegisterNew( toRegister )
    }

    return <div className="action add-new-wrapper" id="add-new-wrapper">
        <span className="cmg-active-dropdown-item" onClick={ handleClick }><FontAwesomeIcon icon={ faSquarePlus } /></span>
        { isUserAddNewActive && <div className="dropdown-box add-new-dropdown">
            <h2 className='dropdown-head'>Add New</h2>
            <ul className="add-new-dropdown-list">
                {
                    Object.entries( addNewArray ).map(([ key, value ]) => {
                        return <li className="cmg-list-item" onClick={() => handleItemClick( key )} key={ key }>
                            <span className="add-new-icon"><FontAwesomeIcon icon={ value } /></span>
                            <span className='add-new-label'>{ key.slice( 0, 1 ).toUpperCase() + key.slice( 1 ) }</span>
                        </li>
                    })
                }
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
    const Global = useContext( GLOBALCONTEXT )
    const { isNotificationDropdownActive, setIsNotificationDropdownActive, setOverlay, loggedInUser, setIsNotificationShown, setNotificationId } = Global
    const { role, id } = loggedInUser
    const [ notifications, setNotifications ] = useState([])
    const [ loadAll, setLoadAll ] = useState( false )

    useEffect(() => {
        ourFetch({
            api: '/notification',
            callback: notificationCallback
        })
    }, [ loggedInUser ])

    /* Notification Callback */
    const notificationCallback = ( data ) => {
        let { success, result } = data
        if( success ) {
            let test = result.filter(( notification ) => {
                let { sender, receiver } = notification
                if( ( sender !== id ) && ( receiver === role || receiver === 'all' ) ) {
                    return true
                }
            })
            setNotifications( test )
        }
    }

    /* Handle Click */
    const handleClick = () => {
        setIsNotificationDropdownActive( ! isNotificationDropdownActive )
        setOverlay( true )
    }

    /* Handle show all notification */
    const handleShowAllNotification = () => {
        setLoadAll( true )
    }

    /* Get Notification */
    const getNofication = ( notificationId ) => {
        setNotificationId( notificationId )
        setIsNotificationShown( true )
        setIsNotificationDropdownActive( false )
        setOverlay( false )
    }

    return <div className="action notification-wrapper" id="notification-wrapper">
        <span className="cmg-active-dropdown-item" onClick={ handleClick }><FontAwesomeIcon icon={ faBell } /></span>
        { isNotificationDropdownActive && <ul className='notification-dropdown'>
            <div className='notification-head'>
                <h2 className='title'>{ 'Notifications' }</h2>
            </div>
            {
                notifications.length > 0 ? notifications.map(( notification, index ) => {
                    let { id: notificationId, title, registered_date: date, receiver, sender } = notification 
                    if( ( receiver !== role && receiver !== 'all' ) || ( sender === id ) ) return
                    if( ! loadAll ) {
                        if( index >= 7 ) return
                    }
                    return <div className='cmg-list-item' onClick={() => getNofication( notificationId ) } key={ index }>
                        <figure className='thumb-wrapper'></figure>
                        <div className='notification-content'>
                            <h2 className='title'>{ title }</h2>
                            <span className='date'>{ date }</span>
                        </div>
                    </div>
                }) : 
                <div className='cmg-list-item no-item'>{ 'No notifications as of yet!' }</div>
            }
            { ! loadAll && notifications.length > 0 && <button className='notification-button' onClick={ handleShowAllNotification }>{ 'Show all notification' }</button> }
        </ul>}
    </div>
}

/**
 * MARK: Message
 * 
 * @since 1.0.0
 */
const Message = () =>{
    const Global = useContext( GLOBALCONTEXT )
    const { isMessageDropdownActive, setIsMessageDropdownActive, setOverlay, setChatId, setShowChat } = Global
    const [ search, setSearch ] = useState( '' )
    const [ users, setUsers ] = useState( '' )

    useEffect(() => {
        ourFetch({
            api: '/users',
            callback: usersCallback
        })
    }, [])

    /* Users Callback */
    const usersCallback = ( data ) => {
        let { success, result } = data
        if( success ) setUsers( result )
    }

    /* Handle Click */
    const handleClick = () => {
        setIsMessageDropdownActive( true )
        setOverlay( true )
    }

    /* Handle Search */
    const handleSearch = ( event ) => {
        setSearch( event.target.value )
    }

    /* Filter users according to search */
    const filteredUsers = useMemo(() => {
        if( search ) {
            return users.filter( user => user.name.toLowerCase().includes( search.toLowerCase() ) )
        }
        return users
    }, [ search, users ])

    /* Get Chat */
    const getChat = ( userId ) => {
        setIsMessageDropdownActive( false )
        setShowChat( true )
        setChatId( userId )
        setOverlay( false )
    }

    return <div className="action message-wrapper" id="message-wrapper">
        <span className="cmg-active-dropdown-item" onClick={ handleClick }><FontAwesomeIcon icon={ faMessage } /></span>
        { isMessageDropdownActive && <ul className='message-dropdown'>
            <div className='message-head'>
                <h2 className='title'>{ 'Chats' }</h2>
                <input type="text" placeholder='Search...' value={ search } onChange={ handleSearch } autoFocus/>
            </div>
            <div className='inner-list'>
                {
                    filteredUsers?.map(( user, index ) => {
                        let { name, id: userId } = user
                        return <div className='cmg-list-item' onClick={() => getChat( userId ) } key={ index }>
                            <figure className='thumb-wrapper'></figure>
                            <div className='notification-content'>
                                <span className='title'>{ name }</span>
                                <span className='last-message'>{ 'Hello, This is my last message.' }</span>
                            </div>
                        </div>
                    })
                }
            </div>
        </ul>}
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

    /* Handle Item click */
    const handleItemClick = () => {
        setIsUserLogoutDropdownActive( false )
        setOverlay( false )
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
            <li className='body cmg-list-item' onClick={ handleItemClick }><Link to="/dashboard" className='inner-item'>{ 'Dashboard' }</Link></li>
            <li className='body cmg-list-item' onClick={ handleItemClick }><Link to="/dashboard/profile" className='inner-item'>{ 'Profile' }</Link></li>
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

/**
 * MARK: Show Notification
 * 
 * @since 1.0.0
 */
const ShowNotification = ( props ) => {
    const Global = useContext( GLOBALCONTEXT )
    const { setIsNotificationShown } = Global
    const { id } = props
    const [ notification, setNotification ] = useState({})

    useEffect(() => {
        ourFetch({
            api: '/notification-by-id',
            callback: notificationCallback,
            body: JSON.stringify({ id })
        })
    }, [])

    /* Notification Callback */
    const notificationCallback = ( data ) => {
        let { result, success } = data
        if( success ) {
            setNotification( result )
        }
    }

    /* Handle Close */
    const handleClose = () => {
        setIsNotificationShown( false )
    }

    return <div className='cmg-view-notification' id="cmg-view-notification">
        <h2 className='title'>{ notification.title }</h2>
        <span className='date'>{ notification.registered_date }</span>
        <figure className='thumb-wrapper'>
            <img src={ background } alt="Notification Image" />
        </figure>
        <p className='excerpt'>{ notification.excerpt }</p>
        <FontAwesomeIcon className="close" icon={ faCircleXmark } onClick={ handleClose }/>
    </div>
}

/**
 * MARK: Chat
 * 
 * @since 1.0.0
 */
const Chat = ( props ) => {
    const Global = useContext( GLOBALCONTEXT )
    const { setShowChat } = Global
    const { id } = props
    const [ chat, setChat ] = useState({})
    const { name } = chat

    useEffect(() => {
        ourFetch({
            api: '/user-by-id',
            callback: chatCallback,
            body: JSON.stringify({ id })
        })
    }, [])

    /* Chat Callback */
    const chatCallback = ( data ) => {
        // console.log( data )
        let { result, success } = data
        if( success ) {
            setChat( result )
        }
    }

    /* Handle Close */
    const handleClose = () => {
        setShowChat( false )
    }

    return <div className='cmg-chat' id="cmg-chat">
        <div className='head'>
            <div className='user'>
                <figure className='thumb-wrapper'>
                    <img src={ background } alt="Notification Image" />
                </figure>
                <h2 className='title'>{ name }</h2>
            </div>
            <FontAwesomeIcon className="close" icon={ faXmark } onClick={ handleClose } />
        </div>
        <div className='body'>
            Say hi.
        </div>
        <div className='foot'>
            <input type="text" placeholder='Aa' autoFocus/>
            <FontAwesomeIcon className="send" icon={ faPaperPlane } />
        </div>
    </div>
}