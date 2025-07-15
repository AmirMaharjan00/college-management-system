import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { ourFetch } from '../functions'
import { Link } from 'react-router-dom'
import { useDate } from '../includes/hooks'
import { TodaysDate } from '../includes/components-hooks'


/**
 * Student Details Component
 */
export const StudentDetails = () => {
    const location = useLocation(),
        { user } = location.state,
        { role } = user,
        { getDate, getTime } = useDate(),
        capitalizeRole = role.slice( 0, 1 ).toUpperCase() + role.slice( 1 )

    return <main className="cmg-main student-details" id="cmg-main">
        <div className='page-header'>
            <div className="dashboard-intro">
                <h2 className="user-name">{ `${ capitalizeRole }s Details` }</h2>
                <ul className="cmg-breadcrumb" id="cmg-breadcrumb">
                    <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item"><Link to={ `/dashboard/${ role }s` }>{ `${ capitalizeRole }s` }</Link></li>
                    <li className="breadcrumb-item">{ `${ capitalizeRole } Details` }</li>
                </ul>
            </div>
            <TodaysDate />
        </div>
    </main>
}