import { useContext, createContext, useState } from 'react'
import { Header } from './header'
import { Main } from './main'
import { Sidebar } from './sidebar'

export const Index = () => {
    let wrapperClass = 'cmg-wrapper';

    return <div className={ wrapperClass } id="cmg-wrapper">
        <Header />
        <div className="cmg-body" id="cmg-body">
            <Main />
            <Sidebar />
        </div>
    </div>
    
}