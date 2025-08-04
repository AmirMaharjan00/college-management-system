/**
 * TimeTable
 */
// import { useState, useEffect, useMemo } from 'react'
// import { useLocation } from 'react-router'
// import { ourFetch, fetchCallback } from '../functions'
// import { Link } from 'react-router-dom'
// import { useDate } from '../includes/hooks'
// import { TodaysDate } from '../includes/components-hooks'
// import { useCallback } from 'react'
import './time-table.scss'


export const TimeTable = () => {
    // const location = useLocation(),
    //     { user: userId } = location.state,
    //     [ userDetails, setUserDetails ] = useState({}),
    //     { getDate, getTime, convertedDate } = useDate(),
    //     capitalizeRole = useMemo(() => {
    //         let { role } = userDetails
    //         if( role ) return role.slice( 0, 1 ).toUpperCase() + role.slice( 1 )
    //     }, [ userDetails ])

    //     useEffect(() => {
    //         ourFetch({
    //             api: '/user-by-id',
    //             callback: fetchCallback,
    //             setter: setUserDetails,
    //             body: JSON.stringify({ id: userId })
    //         })   
    //     }, [ userId ])


    return <main className="cmg-main" id="cmg-main">
        {/* <div className='page-header'>
            <div className="dashboard-intro">
                <h2 className="user-name">{ `${ capitalizeRole }s Details` }</h2>
                <ul className="cmg-breadcrumb" id="cmg-breadcrumb">
                    <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item"><Link to={ `/dashboard/${ userDetails?.role }s` }>{ `${ capitalizeRole }s` }</Link></li>
                    <li className="breadcrumb-item">{ `${ capitalizeRole } Details` }</li>
                </ul>
            </div>
            <TodaysDate />
        </div> */}

        <div className="timetable">
            <div className="timetable__header">
                <h3 className="timetable__title">Time Table</h3>
                <button className="timetable__filter-button">Filter</button>
            </div>

            <div className="timetable__week">
                <div className="timetable__day">
                    <h3 className="timetable__day-name">Sunday</h3>
                    <div className="timetable__period">
                        <p className="timetable__time">Time</p>
                        <span className="timetable__subject">Subject: Maths</span>
                        <div className="timetable__teacher">
                        <div className="timetable__thumbnail thumbnail"></div>
                        <p className="timetable__teacher-name">Saroj Maharjan</p>
                        </div>
                    </div>
                    <div className="timetable__period">
                        <p className="timetable__time">Time</p>
                        <span className="timetable__subject">Subject: English</span>
                        <div className="timetable__teacher">
                        <div className="timetable__thumbnail thumbnail"></div>
                        <p className="timetable__teacher-name">Saroj Maharjan</p>
                        </div>
                    </div>
                </div>

                <div className="timetable__day">
                    <h3 className="timetable__day-name">Monday</h3>
                    <div className="timetable__period">
                        <p className="timetable__time">Time</p>
                        <span className="timetable__subject">Subject: Maths</span>
                        <div className="timetable__teacher">
                        <div className="timetable__thumbnail thumbnail"></div>
                        <p className="timetable__teacher-name">Saroj Maharjan</p>
                        </div>
                    </div>
                    <div className="timetable__period">
                        <p className="timetable__time">Time</p>
                        <span className="timetable__subject">Subject: English</span>
                        <div className="timetable__teacher">
                        <div className="timetable__thumbnail thumbnail"></div>
                        <p className="timetable__teacher-name">Saroj Maharjan</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="timetable-footer">
                <div className="timetable__break">
                    <span className="timetable__break-label label-blue">Morning Break</span>
                    <div className="timetable__break-time">Time</div>
                </div>
                <div className="timetable__break">
                    <span className="timetable__break-label label-yellow">Lunch</span>
                    <div className="timetable__break-time">Time</div>
                </div>
                <div className="timetable__break">
                    <span className="timetable__break-label label-blue">Evening Break</span>
                    <div className="timetable__break-time">Time</div>
                </div>
            </div>
        </div>
    </main>
}