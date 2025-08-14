import { useContext, useEffect, useMemo } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { Header } from './header'
import { Sidebar } from './sidebar'
import { GLOBALCONTEXT } from '../App'
import { ourFetch, fetchCallback } from './functions'

export const Index = () => {
    const global = useContext( GLOBALCONTEXT )
    const navigate = useNavigate()
    const { setIsloggedIn, setLoggedInUser, overlay, setIsDarkMode, isDarkMode, canvasOpen } = global,
    bodyClass = useMemo(() => {
        return `cmg-body${( canvasOpen ? ' open' : '' )}`
    }, [ canvasOpen ]),
    wrapperClass = useMemo(() => {
        return `cmg-wrapper ${ isDarkMode }`
    }, [ isDarkMode ])

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
                    callback: fetchCallback,
                    setter: setIsDarkMode,
                    body: JSON.stringify({ id })
                })
            }
        } else {
            navigate( '/login' )
        }
    }

    return <>
        { overlay && <Overlay /> }
        <div className={ wrapperClass } id="cmg-wrapper">
            <Header />
            <div className={ bodyClass } id="cmg-body">
                <Outlet />
                <Sidebar />
            </div>
        </div>
    </>
}

/**
 * Overlay
 * 
 * MARK: OVERLAY
 */
export const Overlay = () => {
    const global = useContext( GLOBALCONTEXT )
    const {
        setOverlay,
        setIsUserLogoutDropdownActive,
        setIsUserAddNewActive,
        setIsAcademicYearActive,
        setIsLanguageActive,
        setNewRegister,
        setIsNotificationDropdownActive,
        setIsNotificationShown,
        setNotificationId,
        setIsMessageDropdownActive,
        setHeaderOverlay,
        setLeaveModal,
        setShowPayFeesForm,
        setFormVisibility,
        setDeleteBookVisibility,
        setCurrentBookId,
        setReturnBookVisibility
    } = global

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
        setHeaderOverlay( false )
        setLeaveModal( false )
        setShowPayFeesForm( false )
        setFormVisibility( false )
        setDeleteBookVisibility( false )
        setReturnBookVisibility( false )
        setCurrentBookId( 0 )
    }

    return <div className='cmg-overlay' id="cmg-overlay" onClick={ handleOverlay }></div>
}