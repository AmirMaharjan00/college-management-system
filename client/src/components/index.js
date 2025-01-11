import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from './header'
import { Main } from './main'
import { Sidebar } from './sidebar'
import { GLOBALCONTEXT } from '../App'

export const Index = () => {
    const global = useContext( GLOBALCONTEXT )
    const navigate = useNavigate()
    const { setIsloggedIn, setLoggedInUser, setOverlay, overlay, isUserLogoutDropdownActive, setIsUserLogoutDropdownActive } = global

    useEffect(() => {
        fetch( 'http://localhost:5000/isLoggedIn', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        })
        .then(( result ) => result.json())
        .then( ( data ) => { 
            let { isLoggedIn, name } = data
            if( isLoggedIn ) {
                setLoggedInUser( name )
                setIsloggedIn( isLoggedIn )
            } else {
                navigate( '/login' )
            }
        })
    }, [])

    let wrapperClass = 'cmg-wrapper';

    /**
     * MARK: OVERLAY CLICK
     */
    const handleOverlay = () => {
        setOverlay( false )
        setIsUserLogoutDropdownActive( false )
    }

    return <>
        { overlay && <div className='cmg-overlay' id="cmg-overlay" onClick={ handleOverlay }></div> }
        <div className={ wrapperClass } id="cmg-wrapper">
            <Header />
            <div className="cmg-body" id="cmg-body">
                <Main />
                <Sidebar />
            </div>
        </div>
    </>
}