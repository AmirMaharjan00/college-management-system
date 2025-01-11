import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from './header'
import { Main } from './main'
import { Sidebar } from './sidebar'
import { GLOBALCONTEXT } from '../App'

export const Index = () => {
    const global = useContext( GLOBALCONTEXT )
    const navigate = useNavigate()
    const { isLoggedIn, loggedInUser, setIsloggedIn } = global

    useEffect(() => {
        fetch( 'http://localhost:5000/isLoggedIn', {
            method: "POST",
            // headers: {
            //     "Content-Type": "application/json",
            // }
        })
        .then(( result ) => result.json())
        .then( ( data ) => { 
            console.log( data )
            if( data.success ) {
                // setLoggedInUser( data.result[0] )
                // setLoginSuccess( true )
            } else {
                // navigate( '/login' )
            }
        })
    }, [])

    let wrapperClass = 'cmg-wrapper';

    return <div className={ wrapperClass } id="cmg-wrapper">
        <Header />
        <div className="cmg-body" id="cmg-body">
            <Main />
            <Sidebar />
        </div>
    </div>
}