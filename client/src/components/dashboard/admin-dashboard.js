import { useContext, useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { GLOBALCONTEXT } from '../../App'
import student from '../assets/images/student.png'
import teacher from '../assets/images/teacher.png'
import course from '../assets/images/course.png'
import staff from '../assets/images/staff.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faChevronDown, faChevronRight, faCheckDouble, faXmark, faCircleExclamation, faIcons, faCoins, faSackDollar, faCalendarDays, faMoneyBillTrendUp, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { ourFetch, getOrdinals, firstLetterCapitalize, formatDate, fetchCallback } from '../functions'
import { Bar } from 'react-chartjs-2'
import { AddNewUser } from '../forms/add-new-user'
import { LineChart } from '../charts'
// import 
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/**
 * MARK: Admin Dashboard
 * 
 * @since 1.0.0
 */
export const AdminDashboard = () => {
    const global = useContext( GLOBALCONTEXT ),
        { formVisibility, setFormVisibility, setOverlay, setHeaderOverlay, loggedInUser } = global,
        { role, name } = loggedInUser,
        [  ] = useState( false )

    /**
     * handle new student click
     */
    const handleNewStudentClick = () => {
        setFormVisibility( true )
        setOverlay( true )
        setHeaderOverlay( true )
    }

    return <>
        { formVisibility && <AddNewUser /> }
        <div className="dashboard-head">
            <div className="dashboard-intro">
                <h2 className="user-name">Admin Dashboard</h2>
                <ul className="cmg-breadcrumb" id="cmg-breadcrumb">
                    <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item">Admin Dashboard</li>
                </ul>
            </div>
            <div className="dashboard-actions">
                <button className="button-action add-student cmg-btn-spacing" onClick={ handleNewStudentClick }>
                    <FontAwesomeIcon icon={ faUserPlus }/>
                    <span>Add New Student</span>
                </button>
                <Link to="/dashboard/account">
                    <button className="button-action fees">Fees Details</button>
                </Link>
            </div>
        </div>{/* .dashboard-head */}
        <div className="dashboard-welcome">
            <div className="welcome-wrapper">
                <h2 className="welcome-label">{`Welcome Back, ${ name }`}</h2>
                <span className="welcome-description">Have a Good Day at Work.</span>
            </div>
            <div className="update-wrapper">
                <span className="reload-icon"><FontAwesomeIcon icon={ faArrowsRotate } /></span>
                <span className="update-label">Updated Recently on 15 June 2024</span>
            </div>
        </div>{/* .dashboard-welcome */}
        <Highlights />
        <div className="fees-leave-request-wrapper" id="fees-leave-request-wrapper">
            <FeesCollection />
            <LeaveRequest />
        </div>{/* #fees-leave-request-wrapper */}
        <div id="dashboard-links" className="dashboard-links">
            <Link to="/dashboard/library" className='link card'>
                <span className="link-icon"><FontAwesomeIcon icon={ faCalendarDays } /></span>
                <span className="link-label">Library</span>
                <span className="link-view-more"><FontAwesomeIcon icon={ faChevronRight } /></span>
            </Link>
            <div className="link card">
                <span className="link-icon"><FontAwesomeIcon icon={ faIcons } /></span>
                <span className="link-label">New Events</span>
                <span className="link-view-more"><FontAwesomeIcon icon={ faChevronRight } /></span>
            </div>
            <Link to="/dashboard/academic/complaints" className='link card'>
                <span className="link-icon"><FontAwesomeIcon icon={ faCircleExclamation } /></span>
                <span className="link-label">Complaints</span>
                <span className="link-view-more"><FontAwesomeIcon icon={ faChevronRight } /></span>
            </Link>
            <Link to="/dashboard/account" className='link card'>
                <span className="link-icon"><FontAwesomeIcon icon={ faCoins} /></span>
                <span className="link-label">Finance & Accounts</span>
                <span className="link-view-more"><FontAwesomeIcon icon={ faChevronRight } /></span>
            </Link>
        </div>{/* #dashboard-links */}
        <div className="dashboard-earnings" id="dashboard-earnings">
            <Earnings />
            <div className="notice-board">
                <div className="head">
                    <h2 className="label">Notice board</h2>
                    <button className="view-all">
                        <span className="button-label">View All</span>
                        <span className="button-icon"><FontAwesomeIcon icon={ faChevronRight} /></span>
                    </button>
                </div>
                <div className="foot">
                    <div className="notice">
                        <span className="notice-icon"><FontAwesomeIcon icon={ faFlag } /></span>
                        <div className="notice-main">
                            <span className="notice-title">New Syllabus Instructions</span>
                            <div className="notice-date-wrapper">
                                <span className="notice-date-label">
                                    <span className="notice-date-icon"><FontAwesomeIcon icon={ faCalendarDays } /></span>
                                    <span className="notice-date-added">Added on : </span>
                                </span>
                                <span className="notice-date">11 March 2024</span>
                            </div>
                        </div>
                        <span className="notice-duration">20 Days</span>
                    </div>
                    <div className="notice">
                        <span className="notice-icon"><FontAwesomeIcon icon={ faFlag } /></span>
                        <div className="notice-main">
                            <span className="notice-title">New Syllabus Instructions</span>
                            <div className="notice-date-wrapper">
                                <span className="notice-date-label">
                                    <span className="notice-date-icon"><FontAwesomeIcon icon={ faCalendarDays } /></span>
                                    <span className="notice-date-added">Added on : </span>
                                </span>
                                <span className="notice-date">11 March 2024</span>
                            </div>
                        </div>
                        <span className="notice-duration">20 Days</span>
                    </div>
                    <div className="notice">
                        <span className="notice-icon"><FontAwesomeIcon icon={ faFlag } /></span>
                        <div className="notice-main">
                            <span className="notice-title">New Syllabus Instructions</span>
                            <div className="notice-date-wrapper">
                                <span className="notice-date-label">
                                    <span className="notice-date-icon"><FontAwesomeIcon icon={ faCalendarDays } /></span>
                                    <span className="notice-date-added">Added on : </span>
                                </span>
                                <span className="notice-date">11 March 2024</span>
                            </div>
                        </div>
                        <span className="notice-duration">20 Days</span>
                    </div>
                    <div className="notice">
                        <span className="notice-icon"><FontAwesomeIcon icon={ faFlag } /></span>
                        <div className="notice-main">
                            <span className="notice-title">New Syllabus Instructions</span>
                            <div className="notice-date-wrapper">
                                <span className="notice-date-label">
                                    <span className="notice-date-icon"><FontAwesomeIcon icon={ faCalendarDays } /></span>
                                    <span className="notice-date-added">Added on : </span>
                                </span>
                                <span className="notice-date">11 March 2024</span>
                            </div>
                        </div>
                        <span className="notice-duration">20 Days</span>
                    </div>
                    <div className="notice">
                        <span className="notice-icon"><FontAwesomeIcon icon={ faFlag } /></span>
                        <div className="notice-main">
                            <span className="notice-title">New Syllabus Instructions</span>
                            <div className="notice-date-wrapper">
                                <span className="notice-date-label">
                                    <span className="notice-date-icon"><FontAwesomeIcon icon={ faCalendarDays } /></span>
                                    <span className="notice-date-added">Added on : </span>
                                </span>
                                <span className="notice-date">11 March 2024</span>
                            </div>
                        </div>
                        <span className="notice-duration">20 Days</span>
                    </div>
                </div>
            </div>
            <div className="finance-details">
                <div className="collection">
                    <div className="collection-details">
                        <span className="label">Total Fees Collected</span>
                        <h2 className="money">$25,000,02</h2>
                    </div>
                    <div className="collection-percent">
                        <span className="icon"><FontAwesomeIcon icon={ faMoneyBillTrendUp } /></span>
                        <span className="percent">1.2%</span>
                    </div>
                </div>
                <div className="collection">
                    <div className="collection-details">
                        <span className="label">Fine Collected Till Date</span>
                        <h2 className="money">$25,000,02</h2>
                    </div>
                    <div className="collection-percent">
                        <span className="icon"><FontAwesomeIcon icon={ faMoneyBillTrendUp } /></span>
                        <span className="percent">1.2%</span>
                    </div>
                </div>
                <div className="collection">
                    <div className="collection-details">
                        <span className="label">Student Not Paid</span>
                        <h2 className="money">$25,000,02</h2>
                    </div>
                    <div className="collection-percent">
                        <span className="icon"><FontAwesomeIcon icon={ faMoneyBillTrendUp } /></span>
                        <span className="percent">1.2%</span>
                    </div>
                </div>
                <div className="collection">
                    <div className="collection-details">
                        <span className="label">Total Outstanding</span>
                        <h2 className="money">$25,000,02</h2>
                    </div>
                    <div className="collection-percent">
                        <span className="icon"><FontAwesomeIcon icon={ faMoneyBillTrendUp } /></span>
                        <span className="percent">1.2%</span>
                    </div>
                </div>
            </div>
        </div>{/* #dashboard-earnings */}
        <div id="dashboard-foot" className="dashboard-foot">
            <SubjectCompletion />
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
                    <span className="label">Todo</span>
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
                let { role, total } = user
                if( role in counts ) {
                    setCounts(( prev ) => {
                        return {
                            ...prev,
                            [ role ]: { ...prev[ role ], new: total }
                        }
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

/**
 * Subject Completion
 * 
 * MARK: SUBJECT COMPLETION
 */
export const SubjectCompletion = () => {
    const [ courses, setCourses ] = useState({
        result: [],
        success: false
    })
    const [ subjects, setSubjects ] = useState({
        result: [],
        success: false
    })
    const { result: courseResults, success: courseSucess } = courses
    const { result: subjectResults, success: subjectSucess } = subjects
    const [ activeCourseIndex, setActiveCourseIndex ] = useState( 0 )
    const [ activeSemester, setActiveSemester ] = useState( 1 )

    const activeCourseId = courseResults.length > 0 ? courseResults[ activeCourseIndex ].id : 0
    const activeCourseName = courseResults.length > 0 ? courseResults[ activeCourseIndex ].abbreviation : 'BCA'
    const activeSemesterCount = courseResults.length > 0 ? courseResults[ activeCourseIndex ].semester : 4
    const semesterArray = Array.from({ length: activeSemesterCount }, ( _, index ) => index + 1 ) 

    useEffect(() => {
        ourFetch({
            api: '/select',
            callback: setCourses,
            body: JSON.stringify({ table: 'courses' })
        })

        ourFetch({
            api: '/select',
            callback: setSubjects,
            body: JSON.stringify({ table: 'subjects' })
        })
    }, [])

    const subjectList = useMemo(() => {
        let newSubjectList = subjectSucess && subjectResults?.filter(( subject ) => {
            let { course_id: courseId, semester } = subject
            return ( ( courseId === activeCourseId ) && ( semester === activeSemester ) )
        })
        return newSubjectList
    }, [ activeCourseId, subjectResults, activeSemester ])

    const handleCourseClick = ( index ) => {
        setActiveCourseIndex( index )
    }

    const handleSemesterClick = ( semester ) => {
        setActiveSemester( semester )
    }
    
    return <div className="dashboard-foot-item subject-completion">
        <div className="head">
            <span className="label">{ 'Subject Completion' }</span>
            <div className='dropdowns-wrapper'>
                <div className="dropdown courses-wrapper">
                    <span className="cmg-active-dropdown-item">
                        <span className="label">{ activeCourseName }</span>
                        <span className="icon"><FontAwesomeIcon icon={ faChevronDown } /></span>
                    </span>
                    <ul className="cmg-dropdown">
                        {
                            courseSucess && courseResults?.map(( course, index ) => {
                                let { abbreviation, id } = course
                                let listClass = 'cmg-list-item'
                                if( id === activeCourseId ) listClass += ' active'
                                return <li className={ listClass } key={ index } onClick={() => handleCourseClick( index ) }>{ abbreviation }</li>
                            })
                        }
                    </ul>
                </div>
                { activeSemesterCount !== 0 && <div className="dropdown semester-wrapper">
                    <span className="cmg-active-dropdown-item">
                        <span className="label">{ `${ getOrdinals( activeSemester ) } semester` }</span>
                        <span className="icon"><FontAwesomeIcon icon={ faChevronDown } /></span>
                    </span>
                    <ul className="cmg-dropdown">
                        {
                            semesterArray?.map(( semester, index ) => {
                                let listClass = 'cmg-list-item'
                                if( activeSemester === semester ) listClass += ' active'
                                return <li className={ listClass } key={ index } onClick={() => handleSemesterClick( semester ) }>{ `${ getOrdinals( semester ) } semester` }</li>
                            })
                        }
                    </ul>
                </div> }
            </div>
        </div>
        <div className="foot">
            <ul className="subject-lists">
                {
                    subjectList.length > 0 ? subjectList?.map(( subject, index ) => {
                        let { name, completion } = subject
                        return <li className="subject" key={ index }>
                            <span className="subject-label">{ name }</span>
                            <div className="subject-progress-wrap">
                                <progress className="subject-progress" value={ completion } max="100" />
                                <span className="indicator">{ `${ completion }%` }</span>
                            </div>
                        </li>
                    }) : <li className='subject'>{ 'No Subjects in this course.' }</li>
                }
            </ul>
        </div>
    </div>
}

/**
 * MARK: LEAVE REQUEST
 */
const LeaveRequest = () => {
    const [ leaveRequests, setLeaveRequests ] = useState({
        result: [],
        success: false
    })
    const { result, success } = leaveRequests
    const [ dateDuration, setDateDuration ] = useState( 'today' )
    const [ update, setUpdate ] = useState( false )

    useEffect(() => {
        ourFetch({
            api: '/select-leave-via-date',
            callback: setLeaveRequests,
            body: JSON.stringify({ dateDuration })
        })
        setUpdate( false )
    }, [ dateDuration, update ])

    /* Handle dropdown click */
    const handleDropdownClick = ( event ) => {
        let { target } = event,
            classList = target.classList;

        if( classList.contains( 'active' ) ) return;
        if( classList.contains( 'today' ) ) {
            setDateDuration( 'today' )
        } else if( classList.contains( 'this-week' ) ) {
            setDateDuration( 'this-week' )
        } else if( classList.contains( 'last-week' ) ) {
            setDateDuration( 'last-week' )
        } else if( classList.contains( 'this-month' ) ) {
            setDateDuration( 'this-month' )
        }
    }

    /* Handle button click */
    const handleButtonClick = ( leaveId, status ) => {
        ourFetch({
            api: '/update-leave-status',
            callback: leaveActionCallback,
            body: JSON.stringify({ id: leaveId, status })
        })
    }

    // Callback
    const leaveActionCallback = ( data ) => {
        let { result: res, success } = data
        if( success ) setUpdate( true )
    }

    return <div className="leave-requests-wrapper element">
        <div className="head">
            <span className="label">{ 'Leave Requests' }</span>
            <div className="dropdown time-period-wrapper">
                <span className="cmg-active-dropdown-item">
                    <span className="label">{ dateDuration.replaceAll( '-', ' ' ) }</span>
                    <span className="icon"><FontAwesomeIcon icon={ faChevronDown } /></span>
                </span>
                <ul className="cmg-dropdown" onClick={ handleDropdownClick }>
                    <li className={ `cmg-list-item today${ dateDuration === 'today' ? ' active' : '' }` }>{ 'Today' }</li>
                    <li className={ `cmg-list-item this-week${ dateDuration === 'this-week' ? ' active' : '' }` }>{ 'This Week' }</li>
                    <li className={ `cmg-list-item last-week${ dateDuration === 'last-week' ? ' active' : '' }` }>{ 'Last Week' }</li>
                    <li className={ `cmg-list-item this-month${ dateDuration === 'this-month' ? ' active' : '' }` }>{ 'This Month' }</li>
                </ul>
            </div>
        </div>
        <div className="foot">
            {
                success && result.map(( leave, index ) => {
                    let { name, leaveType, role = 'admin', start, end, appliedOn, profile, id: leaveId, status } = leave
                    return <div className="leave-request" key={ index }>
                        <div className="leave-applicant">
                            <figure className="applicant-thumb"><img src={ profile } alt="#" /></figure>
                            <div className="applicant-info">
                                <div className="name-type-wrapper">
                                    <h2 className="applicant">{ name }</h2>
                                    <span className={ `application-type ${ leaveType }` }>{ firstLetterCapitalize( leaveType ) }</span>
                                </div>
                                <span className="applicant-post">{ firstLetterCapitalize( role ) }</span>
                            </div>
                            { status === 'pending' ? <div className="applicant-request">
                                <button className="request request-accept" onClick={ () => handleButtonClick( leaveId, 'completed' ) }><FontAwesomeIcon icon={ faCheckDouble } /></button>
                                <button className="request request-reject" onClick={ () => handleButtonClick( leaveId, 'cancelled' ) }><FontAwesomeIcon icon={ faXmark } /></button>
                            </div> :
                            <span className={`application-status ${ status }`}>{ status }</span> }
                        </div>
                        <div className="leave-date">
                            <div className="action leave-wrapper">
                                <span className="leave-label">{ 'Leave: ' }</span>
                                <span className="leave">{ `${ formatDate( start ) } - ${ formatDate( end ) }` }</span>
                            </div>
                            <div className="action apply-wrapper">
                                <span className="apply-label">{ 'Apply on : ' }</span>
                                <span className="apply-date">{ formatDate( appliedOn ) }</span>
                            </div>
                        </div>
                    </div>
                })
            }
            { result.length <= 0 && <div>{ 'No leave requests.' }</div> }
        </div>
    </div>
}

/**
 * MARK: Fees Collection
 */
const FeesCollection = () => {
    const [fees, setFees] = useState({
        result: [],
        success: false
    });

    const months = useMemo(() => {
        return (fees.result ?? []).map(item => item.month);
    }, [fees]);

    const amounts = useMemo(() => {
        return (fees.result ?? []).map(item => item.total);
    }, [fees]);

    useEffect(() => {
        ourFetch({
            api: '/dashboard-fees-collection',
            callback: (res) => {
                setFees({
                    result: res.result ?? res.data ?? [],
                    success: res.success
                });
            }
        });
    }, []);

    return <div className="fees-collection-wrapper element">
        <div className="head">
            <span className="label">{ 'Fees Collection' }</span>
            <div className="dropdown time-period-wrapper">
                <span className="cmg-active-dropdown-item">
                    <span className="label">{ 'Last 8 Quater' }</span>
                    <span className="icon"><FontAwesomeIcon icon={ faChevronDown } /></span>
                </span>
                <ul className="cmg-dropdown">
                    <li className="cmg-list-item active">{ 'This Month' }</li>
                    <li className="cmg-list-item">This Year</li>
                    <li className="cmg-list-item">Last 12 Quater</li>
                    <li className="cmg-list-item">Last 16 Quater</li>
                </ul>
            </div>
        </div>
        <div className="body">
            <BarChart
                months = { months }
                amounts = { amounts }
            />
        </div>
    </div>
}

const BarChart = ({ months, amounts }) => {
    // Data for the chart
    const data = {
      labels: months,
      datasets: [
        {
          label: 'Sales (in USD)', // Label for the bars
          data: amounts, // Data points
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
          borderColor: 'rgba(75, 192, 192, 1)', // Border color
          borderWidth: 1,
          fill: false
        },
      ],
    };
  
    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false, // ignore default aspect ratio
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />
}

/**
 * MARK: Earnings
 */
const Earnings = () => {
    const [ earnings, setEarnings ] = useState({
        income: 0,
        expense: 0
    }),
    [ monthly, setMonthly ] = useState([]),
    { income, expense } = earnings,
    filteredMonthly = useMemo(() => {
        return monthly.reduce(( _thisVal, item ) => {
            let { income, expense } = item
            _thisVal[ 'income' ].push( income )
            _thisVal[ 'expense' ].push( expense )
            return _thisVal
        }, { income: [], expense: [] })
    }, [ monthly ])

    useEffect(() => {
        ourFetch({
            api: '/get-total-yearly-expense-income',
            callback: fetchCallback,
            setter: setEarnings
        })
        ourFetch({
            api: '/get-monthly-expense-income',
            callback: fetchCallback,
            setter: setMonthly
        })
    }, [])

    return <div className="finance-wrapper">
        <div className="finance total-earnings-wrapper">
            <div className="total-earnings">
                <div className="finance-head">
                    <span className="finance-label">Total Earnings</span>
                    <h2 className="finance-number">{ `Rs. ${ income }` }</h2>
                </div>
                <span className="finance-icon"><FontAwesomeIcon icon={ faSackDollar } /></span>
            </div>
            <div className="diagram">
                <LineChart
                    short = { true }
                    label = "Income"
                    _thisData = { filteredMonthly.income }
                    useApi = { false }
                />
            </div>
        </div>
        <div className="finance total-expenses-wrapper">
            <div className="total-earnings">
                <div className="finance-head">
                    <span className="finance-label">Total Expenses</span>
                    <h2 className="finance-number">{ `Rs. ${ expense }` }</h2>
                </div>
                <span className="finance-icon"><FontAwesomeIcon icon={ faSackDollar } /></span>
            </div>
            <div className="diagram">
                <LineChart
                    short = { true }
                    label = "Expenses"
                    _thisData = { filteredMonthly.expense }
                    useApi = { false }
                />
            </div>
        </div>
    </div>
}