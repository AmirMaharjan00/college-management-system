import { useContext, useEffect, useState } from 'react'
import { GLOBALCONTEXT } from '../../App'
import student from '../assets/images/student.png'
import teacher from '../assets/images/teacher.png'
import course from '../assets/images/course.png'
import staff from '../assets/images/staff.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faChevronDown, faChevronRight, faCheckDouble, faXmark, faCircleExclamation, faIcons, faCoins, faSackDollar, faCalendarDays, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { ourFetch, fetchCallback } from '../functions'
import { Link } from 'react-router-dom'

/**
 * MARK: Student Dashboard
 * 
 * @since 1.0.0
 */
export const StudentDashboard = () => {
    const Global = useContext( GLOBALCONTEXT )
    const { loggedInUser } = Global
    const { role, name, gender } = loggedInUser

    return <>
        <div className="dashboard-head">
            <div className="dashboard-intro">
                <h2 className="user-name">Student Dashboard</h2>
                <ul className="cmg-breadcrumb" id="cmg-breadcrumb">
                    <li className="breadcrumb-item">Dashboard</li>
                    <li className="breadcrumb-item">Student Dashboard</li>
                </ul>
            </div>
            <div className="dashboard-actions">
                <Link className="button-action fees" to="/dashboard/fees">{ 'Fees Details' }</Link>
            </div>
        </div>{/* .dashboard-head */}
        <div className="dashboard-welcome">
            <div className="welcome-wrapper">
                <h2 className="welcome-label">{`Welcome Back, ${ ( gender === 'male' ? 'Mr.' : 'Mrs.' ) } ${ name }`}</h2>
                <span className="welcome-description">Have a Good Day at Work.</span>
            </div>
            <div className="update-wrapper">
                <span className="reload-icon"><FontAwesomeIcon icon={ faArrowsRotate } /></span>
                <span className="update-label">Updated Recently on 15 June 2024</span>
            </div>
        </div>{/* .dashboard-welcome */}
        <Highlights />
        <div className="fees-leave-request-wrapper" id="fees-leave-request-wrapper">
            <div className="fees-collection-wrapper element">
                <div className="head">
                    <span className="label">Fees Collection</span>
                    <input type="date"/>
                    <div className="dropdown time-period-wrapper">
                        <span className="cmg-active-dropdown-item">
                            <span className="label">Last 8 Quater</span>
                            <span className="icon"><FontAwesomeIcon icon={ faChevronDown } /></span>
                        </span>
                        <ul className="cmg-dropdown">
                            <li className="cmg-list-item active">This Month</li>
                            <li className="cmg-list-item">This Year</li>
                            <li className="cmg-list-item">Last 12 Quater</li>
                            <li className="cmg-list-item">Last 16 Quater</li>
                        </ul>
                    </div>
                </div>
                <div className="body">

                </div>
            </div>
            <div className="leave-requests-wrapper element">
                <div className="head">
                    <span className="label">Leave Requests</span>
                    <div className="dropdown time-period-wrapper">
                        <span className="cmg-active-dropdown-item">
                            <span className="label">Today</span>
                            <span className="icon"><FontAwesomeIcon icon={ faChevronDown } /></span>
                        </span>
                        <ul className="cmg-dropdown">
                            <li className="cmg-list-item active">This Week</li>
                            <li className="cmg-list-item">Last Week</li>
                            <li className="cmg-list-item">This Month</li>
                        </ul>
                    </div>
                </div>
                <div className="foot">
                    <div className="leave-request">
                        <div className="leave-applicant">
                            <figure className="applicant-thumb"><img src="#" alt="#" /></figure>
                            <div className="applicant-info">
                                <div className="name-type-wrapper">
                                    <h2 className="applicant">Ramien</h2>
                                    <span className="application-type">Casual</span>
                                </div>
                                <span className="applicant-post">Accountant</span>
                            </div>
                            <div className="applicant-request">
                                <button className="request request-accept"><FontAwesomeIcon icon={ faCheckDouble } /></button>
                                <button className="request request-reject"><FontAwesomeIcon icon={ faXmark } /></button>
                            </div>
                        </div>
                        <div className="leave-date">
                            <div className="action leave-wrapper">
                                <span className="leave-label">Leave: </span>
                                <span className="leave">12 - 13 May</span>
                            </div>
                            <div className="action apply-wrapper">
                                <span className="apply-label">Apply on : </span>
                                <span className="apply-date">12 May</span>
                            </div>
                        </div>
                    </div>
                    <div className="leave-request">
                        <div className="leave-applicant">
                            <figure className="applicant-thumb"><img src="#" alt="#" /></figure>
                            <div className="applicant-info">
                                <div className="name-type-wrapper">
                                    <h2 className="applicant">James</h2>
                                    <span className="application-type">Emergency</span>
                                </div>
                                <span className="applicant-post">Physics Teacher</span>
                            </div>
                            <div className="applicant-request">
                                <button className="request request-accept"><FontAwesomeIcon icon={ faCheckDouble } /></button>
                                <button className="request request-reject"><FontAwesomeIcon icon={ faXmark } /></button>
                            </div>
                        </div>
                        <div className="leave-date">
                            <div className="action leave-wrapper">
                                <span className="leave-label">Leave: </span>
                                <span className="leave">12 - 13 May</span>
                            </div>
                            <div className="action apply-wrapper">
                                <span className="apply-label">Apply on : </span>
                                <span className="apply-date">12 May</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>{/* #fees-leave-request-wrapper */}
        <div id="dashboard-links" className="dashboard-links">
            <div className="link">
                <span className="link-icon"><FontAwesomeIcon icon={ faCalendarDays } /></span>
                <span className="link-label">View Attendence</span>
                <span className="link-view-more"><FontAwesomeIcon icon={ faChevronRight } /></span>
            </div>
            <div className="link">
                <span className="link-icon"><FontAwesomeIcon icon={ faIcons } /></span>
                <span className="link-label">New Events</span>
                <span className="link-view-more"><FontAwesomeIcon icon={ faChevronRight } /></span>
            </div>
            <div className="link">
                <span className="link-icon"><FontAwesomeIcon icon={ faCircleExclamation} /></span>
                <span className="link-label">Complaints</span>
                <span className="link-view-more"><FontAwesomeIcon icon={ faChevronRight } /></span>
            </div>
            <div className="link">
                <span className="link-icon"><FontAwesomeIcon icon={ faCoins} /></span>
                <span className="link-label">Finance & Accounts</span>
                <span className="link-view-more"><FontAwesomeIcon icon={ faChevronRight } /></span>
            </div>
        </div>{/* #dashboard-links */}
        <div id="dashboard-foot" className="dashboard-foot">
            <div className="dashboard-foot-item subject-completion">
                <div className="head">
                    <span className="label">Subject Completion</span>
                    <div className="dropdown courses-wrapper">
                        <span className="cmg-active-dropdown-item">
                            <span className="label">BCA</span>
                            <span className="icon"><FontAwesomeIcon icon={ faChevronDown } /></span>
                        </span>
                        <ul className="cmg-dropdown">
                            <li className="cmg-list-item active">BCA</li>
                            <li className="cmg-list-item">BBS</li>
                            <li className="cmg-list-item">BSW</li>
                            <li className="cmg-list-item">BBA</li>
                            <li className="cmg-list-item">Class 12</li>
                            <li className="cmg-list-item">Class 11</li>
                        </ul>
                    </div>
                </div>
                <div className="foot">
                    <ul className="subject-lists">
                        <li className="subject">
                            <span className="subject-label">Cyber Law and Professional Ethics</span>
                            <span className="completion">
                                <div className="partial"></div>
                            </span>
                        </li>
                        <li className="subject">
                            <span className="subject-label">Cloud Computing</span>
                            <span className="completion">
                                <div className="partial"></div>
                            </span>
                        </li>
                        <li className="subject">
                            <span className="subject-label">Internship</span>
                            <span className="completion">
                                <div className="partial"></div>
                            </span>
                        </li>
                        <li className="subject">
                            <span className="subject-label">Artificial Intelligence</span>
                            <span className="completion">
                                <div className="partial"></div>
                            </span>
                        </li>
                        <li className="subject">
                            <span className="subject-label">Software Project Management</span>
                            <span className="completion">
                                <div className="partial"></div>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="dashboard-foot-item student-activity">
                <div className="head">
                    <span className="label">Student Activity</span>
                    <div className="dropdown time-period-wrapper">
                        <span className="cmg-active-dropdown-item">
                            <span className="label">Today</span>
                            <span className="icon"><FontAwesomeIcon icon={ faChevronDown } /></span>
                        </span>
                        <ul className="cmg-dropdown">
                            <li className="cmg-list-item active">This Week</li>
                            <li className="cmg-list-item">Last Week</li>
                            <li className="cmg-list-item">This Month</li>
                        </ul>
                    </div>
                </div>
                <div className="foot">
                    <ul className="activities">
                        <li className="activity">
                            <figure className="image-thumb"><img src="#" alt="#" /></figure>
                            <div className="activity-detail">
                                <span className="activity-label">1st place in "Chess"</span>
                                <span className="activity-venue">This event took place in Out School.</span>
                            </div>
                        </li>
                        <li className="activity">
                            <figure className="image-thumb"><img src="#" alt="#" /></figure>
                            <div className="activity-detail">
                                <span className="activity-label">1st place in "Chess"</span>
                                <span className="activity-venue">This event took place in Out School.</span>
                            </div>
                        </li>
                        <li className="activity">
                            <figure className="image-thumb"><img src="#" alt="#" /></figure>
                            <div className="activity-detail">
                                <span className="activity-label">1st place in "Chess"</span>
                                <span className="activity-venue">This event took place in Out School.</span>
                            </div>
                        </li>
                        <li className="activity">
                            <figure className="image-thumb"><img src="#" alt="#" /></figure>
                            <div className="activity-detail">
                                <span className="activity-label">1st place in "Chess"</span>
                                <span className="activity-venue">This event took place in Out School.</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="dashboard-foot-item to-do-list">
                <div className="head">
                    <span className="label">Subject Completion</span>
                    <div className="dropdown time-period-wrapper">
                        <span className="cmg-active-dropdown-item">
                            <span className="label">Today</span>
                            <span className="icon"><FontAwesomeIcon icon={ faChevronDown } /></span>
                        </span>
                        <ul className="cmg-dropdown">
                            <li className="cmg-list-item active">This Week</li>
                            <li className="cmg-list-item">Last Week</li>
                            <li className="cmg-list-item">This Month</li>
                        </ul>
                    </div>
                </div>
                <div className="foot">
                    <div className="list">
                        <input type="checkbox" name="#" id="#" />
                        <div className="todo-detail">
                            <span className="todo-label">Send Reminder to Students</span>
                            <span className="todo-time">01: 00 PM</span>
                        </div>
                        <div className="todo-status complete">Completed</div>
                    </div>
                    <div className="list">
                        <input type="checkbox" name="#" id="#" />
                        <div className="todo-detail">
                            <span className="todo-label">Send Reminder to Students</span>
                            <span className="todo-time">01: 00 PM</span>
                        </div>
                        <div className="todo-status pending">Pending</div>
                    </div>
                    <div className="list">
                        <input type="checkbox" name="#" id="#" />
                        <div className="todo-detail">
                            <span className="todo-label">Send Reminder to Students</span>
                            <span className="todo-time">01: 00 PM</span>
                        </div>
                        <div className="todo-status complete">Completed</div>
                    </div>
                    <div className="list">
                        <input type="checkbox" name="#" id="#" />
                        <div className="todo-detail">
                            <span className="todo-label">Send Reminder to Students</span>
                            <span className="todo-time">01: 00 PM</span>
                        </div>
                        <div className="todo-status cancelled">Cancelled</div>
                    </div>
                </div>
            </div>
        </div>

    </>
}

/**
 * MARK: HIGHLIGHT
 */
const Highlights = () => {
    const [ counts, setCounts ] = useState({
       student: {
            new: 0,
            old: 0
       } ,
       teacher: {
            new: 0,
            old: 0
       } ,
       staff: {
            new: 0,
            old: 0
       } ,
       course: {
            new: 0,
            old: 0
       } 
    })

    useEffect(() => {
        ourFetch({
            api: '/users-student-teacher',
            callback: usersFetchCallback
        })
        ourFetch({
            api: '/courses',
            callback: coursesFetchCallback
        })
    }, [])

    let highlightsArray = {
        student: {
            label: 'Total Students',
            image: student
        },
        teacher: {
            label: 'Total Teachers',
            image: teacher
        },
        staff: {
            label: 'Total Staffs',
            image: staff
        },
        course: {
            label: 'Total Courses',
            image: course
        }
    }
    
    /* Users Callback */
    const usersFetchCallback = ( data ) => {
        let { result, success } = data
        if( success ) {
            result.map(( user ) => {
                let { role } = user
                if( role in counts ) {
                    setCounts({ 
                        ...counts,
                        [ role ]: { ...counts[ role ], new: counts[ role ][ 'new' ] + 1 }
                    })
                }
            })
        }
    }
    
    /* Courses Callback */
    const coursesFetchCallback = ( data ) => {
        let { result, success } = data
        if( success ) {
            setCounts(( prev ) => {
                return { 
                    ...prev,
                    course: { ...prev[ 'course' ], new: result.length }
                }
            })
        }
    }

    return <div className="dashboard-highlights">
        {
            Object.entries( highlightsArray ).map(([ id, values ]) => {
                let { label, image } = values
                return <div className={ `highlight ${id}` } key={ id }>
                    <div className="highlight-head">
                        <figure className="highlight-thumb"><img src={ image } alt={ id } /></figure>
                        <div className="highlight-info">
                            <span className="count total-count">{ counts[ id ].old + counts[ id ].new }</span>
                            <span className="label highlight-label">{ label }</span>
                        </div>
                    </div>
                    <div className="highlight-foot">
                        <div className="old-wrapper">
                            <span className="old-label">{ 'Old: ' }</span>
                            <span className="old-count">{ counts[ id ].old }</span>
                        </div>
                        <div className="new-wrapper">
                            <span className="new-label">{ 'New: ' }</span>
                            <span className="new-count">{ counts[ id ].new }</span>
                        </div>
                    </div>
                </div>
            })
        }
    </div>
}