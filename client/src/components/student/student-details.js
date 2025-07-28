import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { ourFetch } from '../functions'
import { Link } from 'react-router-dom'
import { useDate } from '../includes/hooks'
import { TodaysDate } from '../includes/components-hooks'
import './student-details.scss'


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

        <div className='student-body'>
                <div className="student-sidebar">
                    <div>
                        <div>
                            <figure></figure>
                            <div>
                                <span>Active</span>
                                <h2>Janet Daniel</h2>
                                <p>AD123456</p>
                            </div>
                        </div>
                        <div>
                            <h3>Basic Information</h3>
                            <div>
                                <p>
                                    <span>Roll No</span>
                                    <span>35013</span>
                                </p>
                                <p>
                                    <span>Gender</span>
                                    <span>Female</span>
                                </p>
                                <p>
                                    <span>Date Of Birth</span>
                                    <span>25 Jan 2008</span>
                                </p>
                                <p>
                                    <span>Mother Tongue</span>
                                    <span>Nepali</span>
                                </p>
                                <p>
                                    <span>Language</span>
                                    <span>Nepali</span>
                                </p>
                            </div>
                            <button>Add Fees</button>
                        </div>
                    </div>
                    <div>
                        <h3>Primary Contact Info</h3>
                        <div>
                            <span className="icon"></span>
                            <div>
                                <p>Phone Number</p>
                                <p>+ 1 324324</p>
                            </div>
                        </div>
                        <div>
                            <span className="icon"></span>
                            <div>
                                <p>Phone Number</p>
                                <p>+ 1 324324</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3>Sibiling Information</h3>
                        <div>
                            <div className="thumb">
                                <figure></figure>
                            </div>
                            <div>
                                <p>Ralph Claudia</p>
                                <span>III, B</span>
                            </div>
                        </div>
                        <div>
                            <div className="thumb">
                                <figure></figure>
                            </div>
                            <div>
                                <p>Julie Scott</p>
                                <span>V, A</span>
                            </div>
                        </div>
                    </div>

                    <div>

                    </div>
                </div>

                <div className="student-main">
                    <div className="student-tab">
                        <ul>
                            <li>Student Details</li>
                            <li>Time Table</li>
                            <li>Leave & Attendance</li>
                            <li>Fees</li>
                            <li>Exam & Results</li>
                            <li>Library</li>
                        </ul>
                    </div>
                    <div className="personal-information">
                        <h3>Parents Information</h3>
                        <div>
                            <div className="parents">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </main>
}