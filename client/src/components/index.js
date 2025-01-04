import { useContext, useState } from 'react'
import { Header } from './header'
import { Main } from './main'
import { Sidebar } from './sidebar'
import { GLOBALCONTEXT } from '../App'
import { Login } from './forms/login'

export const Index = () => {
    const global = useContext( GLOBALCONTEXT )
    const { isLoggedIn, loggedInUser } = global
    let wrapperClass = 'cmg-wrapper';
    console.log( loggedInUser )

    return isLoggedIn ? <div className={ wrapperClass } id="cmg-wrapper">
        <Header />
        <div className="cmg-body" id="cmg-body">
            <Main />
            <Sidebar />
        </div>
    </div> : <Login />
    
}