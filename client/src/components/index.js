import { useContext, useState, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { Header } from './header'
import { Main } from './main'
import { Sidebar } from './sidebar'
import { GLOBALCONTEXT } from '../App'
import { ourFetch } from './functions'

export const Index = () => {
    const global = useContext( GLOBALCONTEXT )
    const navigate = useNavigate()
    const { 
        setIsloggedIn,
        setLoggedInUser,
        setOverlay,
        overlay,
        setIsUserLogoutDropdownActive,
        setIsDarkMode,
        isDarkMode,
        setIsUserAddNewActive,
        setIsAcademicYearActive,
        setIsLanguageActive,
        setNewRegister,
        setIsNotificationDropdownActive,
        setIsNotificationShown,
        setNotificationId,
        setIsMessageDropdownActive
    } = global

    useEffect(() => {
        ourFetch({
            api: '/isLoggedIn',
            callback: userCallback,
        })
    }, [])

    /* User Callback */
    const userCallback = ( data ) => {
        let { isLoggedIn, user } = data
        if( isLoggedIn ) {
            setLoggedInUser( user )
            setIsloggedIn( isLoggedIn )
            if( isLoggedIn ) {
                let { id } = user
                ourFetch({
                    api: '/dark-mode',
                    callback: darkModeCallback,
                    body: JSON.stringify({ id })
                })
            }
        } else {
            navigate( '/login' )
        }
    }
    
    /* Dark Mode Callback */
    const darkModeCallback = ( data ) => {
        let { view, success } = data
        if( success ) setIsDarkMode( view )
    }

    let wrapperClass = 'cmg-wrapper';
    wrapperClass += ` ${isDarkMode}`;

    /**
     * MARK: OVERLAY CLICK
     */
    const handleOverlay = () => {
        setOverlay( false )
        setIsUserLogoutDropdownActive( false )
        setIsUserAddNewActive( false )
        setIsAcademicYearActive( false )
        setIsLanguageActive( false )
        setNewRegister( false )
        setIsNotificationDropdownActive( false )
        setIsNotificationShown( false )
        setNotificationId( 0 )
        setIsMessageDropdownActive( false )
    }

    return <>
        { overlay && <div className='cmg-overlay' id="cmg-overlay" onClick={ handleOverlay }></div> }
        <div className={ wrapperClass } id="cmg-wrapper">
            <Header />
            <div className="cmg-body" id="cmg-body">
                <Outlet />
                <Sidebar />
            </div>
        </div>
    </>
}