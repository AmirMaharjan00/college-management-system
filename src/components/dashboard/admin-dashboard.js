import student from '../assets/images/student.png'
import teacher from '../assets/images/teacher.png'
import course from '../assets/images/course.png'
import staff from '../assets/images/staff.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faChevronDown, faChevronRight, faCheckDouble, faXmark, faCircleExclamation, faIcons, faCoins, faSackDollar, faCalendarDays, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-regular-svg-icons';

/**
 * Admin Dashboard
 * 
 * @since 1.0.0
 */
export const AdminDashboard = () => {
    return <>
        <div class="dashboard-head">
            <div class="dashboard-intro">
                <h2 class="user-name">Admin Dashboard</h2>
                <ul class="cmg-breadcrumb" id="cmg-breadcrumb">
                    <li class="breadcrumb-item">Dashboard</li>
                    <li class="breadcrumb-item">Admin Dashboard</li>
                </ul>
            </div>
            <div class="dashboard-actions">
                <button class="button-action add-student">
                    <span></span>
                    <span>Add New Student</span>
                </button>
                <button class="button-action fees">Fees Details</button>
            </div>
        </div>{/* .dashboard-head */}
        <div class="dashboard-welcome">
            <div class="welcome-wrapper">
                <h2 class="welcome-label">Welcome Back, Mr. Herald</h2>
                <span class="welcome-description">Have a Good Day at Work.</span>
            </div>
            <div class="update-wrapper">
                <span class="reload-icon"><FontAwesomeIcon icon={ faArrowsRotate } /></span>
                <span class="update-label">Updated Recently on 15 June 2024</span>
            </div>
        </div>{/* .dashboard-welcome */}
        <div class="dashboard-highlights">
            <div class="highlight student">
                <div class="highlight-head">
                    <figure class="highlight-thumb"><img src={ student } alt="student" /></figure>
                    <div class="highlight-info">
                        <span class="count total-count">3697</span>
                        <span class="label highlight-label">Total Students</span>
                    </div>
                </div>
                <div class="highlight-foot">
                    <div class="old-wrapper">
                        <span class="old-label">Old: </span>
                        <span class="old-count">3696</span>
                    </div>
                    <div class="new-wrapper">
                        <span class="new-label">New: </span>
                        <span class="new-count">1</span>
                    </div>
                </div>
            </div>
            <div class="highlight teacher">
                <div class="highlight-head">
                    <figure class="highlight-thumb"><img src={ teacher } alt="teacher" /></figure>
                    <div class="highlight-info">
                        <span class="count total-count">3697</span>
                        <span class="label highlight-label">Total Teachers</span>
                    </div>
                </div>
                <div class="highlight-foot">
                    <div class="old-wrapper">
                        <span class="old-label">Old: </span>
                        <span class="old-count">3696</span>
                    </div>
                    <div class="new-wrapper">
                        <span class="new-label">New: </span>
                        <span class="new-count">1</span>
                    </div>
                </div>
            </div>
            <div class="highlight staff">
                <div class="highlight-head">
                    <figure class="highlight-thumb"><img src={ staff } alt="staff" /></figure>
                    <div class="highlight-info">
                        <span class="count total-count">3697</span>
                        <span class="label highlight-label">Total Staffs</span>
                    </div>
                </div>
                <div class="highlight-foot">
                    <div class="old-wrapper">
                        <span class="old-label">Old: </span>
                        <span class="old-count">3696</span>
                    </div>
                    <div class="new-wrapper">
                        <span class="new-label">New: </span>
                        <span class="new-count">1</span>
                    </div>
                </div>
            </div>
            <div class="highlight course">
                <div class="highlight-head">
                    <figure class="highlight-thumb"><img src={ course } alt="course" /></figure>
                    <div class="highlight-info">
                        <span class="count total-count">3697</span>
                        <span class="label highlight-label">Total Courses</span>
                    </div>
                </div>
                <div class="highlight-foot">
                    <div class="old-wrapper">
                        <span class="old-label">Old: </span>
                        <span class="old-count">3696</span>
                    </div>
                    <div class="new-wrapper">
                        <span class="new-label">New: </span>
                        <span class="new-count">1</span>
                    </div>
                </div>
            </div>
        </div>{/* .dashboard-highlights */}
        <div class="fees-leave-request-wrapper" id="fees-leave-request-wrapper">
            <div class="fees-collection-wrapper element">
                <div class="head">
                    <span class="label">Fees Collection</span>
                    <div class="time-period-wrapper">
                        <span class="cmg-active-dropdown-item">
                            <span class="label">Last 8 Quater</span>
                            <span class="icon"><FontAwesomeIcon icon={ faChevronDown } /></span>
                        </span>
                        <ul class="cmg-dropdown">
                            <li class="cmg-list-item active">This Month</li>
                            <li class="cmg-list-item">This Year</li>
                            <li class="cmg-list-item">Last 12 Quater</li>
                            <li class="cmg-list-item">Last 16 Quater</li>
                        </ul>
                    </div>
                </div>
                <div class="body">

                </div>
            </div>
            <div class="leave-requests-wrapper element">
                <div class="head">
                    <span class="label">Leave Requests</span>
                    <div class="time-period-wrapper">
                        <span class="cmg-active-dropdown-item">
                            <span class="label">Today</span>
                            <span class="icon"><FontAwesomeIcon icon={ faChevronDown } /></span>
                        </span>
                        <ul class="cmg-dropdown">
                            <li class="cmg-list-item active">This Week</li>
                            <li class="cmg-list-item">Last Week</li>
                            <li class="cmg-list-item">This Month</li>
                        </ul>
                    </div>
                </div>
                <div class="foot">
                    <div class="leave-request">
                        <div class="leave-applicant">
                            <figure class="applicant-thumb"><img src="" alt="" /></figure>
                            <div class="applicant-info">
                                <div class="name-type-wrapper">
                                    <h2 class="applicant">Ramien</h2>
                                    <span class="application-type">Casual</span>
                                </div>
                                <span class="applicant-post">Accountant</span>
                            </div>
                            <div class="applicant-request">
                                <button class="request request-accept"><FontAwesomeIcon icon={ faCheckDouble } /></button>
                                <button class="request request-reject"><FontAwesomeIcon icon={ faXmark } /></button>
                            </div>
                        </div>
                        <div class="leave-date">
                            <div class="action leave-wrapper">
                                <span class="leave-label">Leave: </span>
                                <span class="leave">12 - 13 May</span>
                            </div>
                            <div class="action apply-wrapper">
                                <span class="apply-label">Apply on : </span>
                                <span class="apply-date">12 May</span>
                            </div>
                        </div>
                    </div>
                    <div class="leave-request">
                        <div class="leave-applicant">
                            <figure class="applicant-thumb"><img src="" alt="" /></figure>
                            <div class="applicant-info">
                                <div class="name-type-wrapper">
                                    <h2 class="applicant">James</h2>
                                    <span class="application-type">Emergency</span>
                                </div>
                                <span class="applicant-post">Physics Teacher</span>
                            </div>
                            <div class="applicant-request">
                                <button class="request request-accept"><FontAwesomeIcon icon={ faCheckDouble } /></button>
                                <button class="request request-reject"><FontAwesomeIcon icon={ faXmark } /></button>
                            </div>
                        </div>
                        <div class="leave-date">
                            <div class="action leave-wrapper">
                                <span class="leave-label">Leave: </span>
                                <span class="leave">12 - 13 May</span>
                            </div>
                            <div class="action apply-wrapper">
                                <span class="apply-label">Apply on : </span>
                                <span class="apply-date">12 May</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>{/* #fees-leave-request-wrapper */}
        <div id="dashboard-links" class="dashboard-links">
            <div class="link">
                <span class="link-icon"><FontAwesomeIcon icon={ faCalendarDays } /></span>
                <span class="link-label">View Attendence</span>
                <span class="link-view-more"><FontAwesomeIcon icon={ faChevronRight } /></span>
            </div>
            <div class="link">
                <span class="link-icon"><FontAwesomeIcon icon={ faIcons } /></span>
                <span class="link-label">New Events</span>
                <span class="link-view-more"><FontAwesomeIcon icon={ faChevronRight } /></span>
            </div>
            <div class="link">
                <span class="link-icon"><FontAwesomeIcon icon={ faCircleExclamation} /></span>
                <span class="link-label">Complaints</span>
                <span class="link-view-more"><FontAwesomeIcon icon={ faChevronRight } /></span>
            </div>
            <div class="link">
                <span class="link-icon"><FontAwesomeIcon icon={ faCoins} /></span>
                <span class="link-label">Finance & Accounts</span>
                <span class="link-view-more"><FontAwesomeIcon icon={ faChevronRight } /></span>
            </div>
        </div>{/* #dashboard-links */}
        <div class="dashboard-earnings" id="dashboard-earnings">
            <div class="finance-wrapper">
                <div class="finance total-earnings-wrapper">
                    <div class="total-earnings">
                        <div class="finance-head">
                            <span class="finance-label">Total Earnings</span>
                            <h2 class="finance-number">$64, 522,24</h2>
                        </div>
                        <span class="finance-icon"><FontAwesomeIcon icon={ faSackDollar } /></span>
                    </div>
                    <div class="diagram"></div>
                </div>
                <div class="finance total-expenses-wrapper">
                    <div class="total-earnings">
                        <div class="finance-head">
                            <span class="finance-label">Total Expenses</span>
                            <h2 class="finance-number">$60,522,24</h2>
                        </div>
                        <span class="finance-icon"><FontAwesomeIcon icon={ faSackDollar } /></span>
                    </div>
                    <div class="diagram"></div>
                </div>
            </div>
            <div class="notice-board">
                <div class="head">
                    <h2 class="label">Leave Requests</h2>
                    <button class="view-all">
                        <span class="button-label">View All</span>
                        <span class="button-icon"><FontAwesomeIcon icon={ faChevronRight} /></span>
                    </button>
                </div>
                <div class="foot">
                    <div class="notice">
                        <span class="notice-icon"><FontAwesomeIcon icon={ faFlag } /></span>
                        <div class="notice-main">
                            <span class="notice-title">New Syllabus Instructions</span>
                            <div class="notice-date-wrapper">
                                <span class="notice-date-label">
                                    <span class="notice-date-icon"><FontAwesomeIcon icon={ faCalendarDays } /></span>
                                    <span class="notice-date-added">Added on : </span>
                                </span>
                                <span class="notice-date">11 March 2024</span>
                            </div>
                        </div>
                        <span class="notice-duration">20 Days</span>
                    </div>
                    <div class="notice">
                        <span class="notice-icon"><FontAwesomeIcon icon={ faFlag } /></span>
                        <div class="notice-main">
                            <span class="notice-title">New Syllabus Instructions</span>
                            <div class="notice-date-wrapper">
                                <span class="notice-date-label">
                                    <span class="notice-date-icon"><FontAwesomeIcon icon={ faCalendarDays } /></span>
                                    <span class="notice-date-added">Added on : </span>
                                </span>
                                <span class="notice-date">11 March 2024</span>
                            </div>
                        </div>
                        <span class="notice-duration">20 Days</span>
                    </div>
                    <div class="notice">
                        <span class="notice-icon"><FontAwesomeIcon icon={ faFlag } /></span>
                        <div class="notice-main">
                            <span class="notice-title">New Syllabus Instructions</span>
                            <div class="notice-date-wrapper">
                                <span class="notice-date-label">
                                    <span class="notice-date-icon"><FontAwesomeIcon icon={ faCalendarDays } /></span>
                                    <span class="notice-date-added">Added on : </span>
                                </span>
                                <span class="notice-date">11 March 2024</span>
                            </div>
                        </div>
                        <span class="notice-duration">20 Days</span>
                    </div>
                    <div class="notice">
                        <span class="notice-icon"><FontAwesomeIcon icon={ faFlag } /></span>
                        <div class="notice-main">
                            <span class="notice-title">New Syllabus Instructions</span>
                            <div class="notice-date-wrapper">
                                <span class="notice-date-label">
                                    <span class="notice-date-icon"><FontAwesomeIcon icon={ faCalendarDays } /></span>
                                    <span class="notice-date-added">Added on : </span>
                                </span>
                                <span class="notice-date">11 March 2024</span>
                            </div>
                        </div>
                        <span class="notice-duration">20 Days</span>
                    </div>
                    <div class="notice">
                        <span class="notice-icon"><FontAwesomeIcon icon={ faFlag } /></span>
                        <div class="notice-main">
                            <span class="notice-title">New Syllabus Instructions</span>
                            <div class="notice-date-wrapper">
                                <span class="notice-date-label">
                                    <span class="notice-date-icon"><FontAwesomeIcon icon={ faCalendarDays } /></span>
                                    <span class="notice-date-added">Added on : </span>
                                </span>
                                <span class="notice-date">11 March 2024</span>
                            </div>
                        </div>
                        <span class="notice-duration">20 Days</span>
                    </div>
                </div>
            </div>
            <div class="finance-details">
                <div class="collection">
                    <div class="collection-details">
                        <span class="label">Total Fees Collected</span>
                        <h2 class="money">$25,000,02</h2>
                    </div>
                    <div class="collection-percent">
                        <span class="icon"><FontAwesomeIcon icon={ faMoneyBillTrendUp } /></span>
                        <span class="percent">1.2%</span>
                    </div>
                </div>
                <div class="collection">
                    <div class="collection-details">
                        <span class="label">Fine Collected Till Date</span>
                        <h2 class="money">$25,000,02</h2>
                    </div>
                    <div class="collection-percent">
                        <span class="icon"><FontAwesomeIcon icon={ faMoneyBillTrendUp } /></span>
                        <span class="percent">1.2%</span>
                    </div>
                </div>
                <div class="collection">
                    <div class="collection-details">
                        <span class="label">Student Not Paid</span>
                        <h2 class="money">$25,000,02</h2>
                    </div>
                    <div class="collection-percent">
                        <span class="icon"><FontAwesomeIcon icon={ faMoneyBillTrendUp } /></span>
                        <span class="percent">1.2%</span>
                    </div>
                </div>
                <div class="collection">
                    <div class="collection-details">
                        <span class="label">Total Outstanding</span>
                        <h2 class="money">$25,000,02</h2>
                    </div>
                    <div class="collection-percent">
                        <span class="icon"><FontAwesomeIcon icon={ faMoneyBillTrendUp } /></span>
                        <span class="percent">1.2%</span>
                    </div>
                </div>
            </div>
        </div>{/* #dashboard-earnings */}
        <div id="dashboard-foot" class="dashboard-foot">
            <div class="dashboard-foot-item subject-completion">
                <div class="head">
                    <span class="label">Subject Completion</span>
                    <div class="dropdown courses-wrapper">
                        <span class="cmg-active-dropdown-item">
                            <span class="label">BCA</span>
                            <span class="icon"><FontAwesomeIcon icon={ faChevronDown } /></span>
                        </span>
                        <ul class="cmg-dropdown">
                            <li class="cmg-list-item active">BCA</li>
                            <li class="cmg-list-item">BBS</li>
                            <li class="cmg-list-item">BSW</li>
                            <li class="cmg-list-item">BBA</li>
                            <li class="cmg-list-item">Class 12</li>
                            <li class="cmg-list-item">Class 11</li>
                        </ul>
                    </div>
                </div>
                <div class="foot">
                    <ul class="subject-lists">
                        <li class="subject">
                            <span class="subject-label">Cyber Law and Professional Ethics</span>
                            <span class="completion">
                                <div class="partial"></div>
                            </span>
                        </li>
                        <li class="subject">
                            <span class="subject-label">Cloud Computing</span>
                            <span class="completion">
                                <div class="partial"></div>
                            </span>
                        </li>
                        <li class="subject">
                            <span class="subject-label">Internship</span>
                            <span class="completion">
                                <div class="partial"></div>
                            </span>
                        </li>
                        <li class="subject">
                            <span class="subject-label">Artificial Intelligence</span>
                            <span class="completion">
                                <div class="partial"></div>
                            </span>
                        </li>
                        <li class="subject">
                            <span class="subject-label">Software Project Management</span>
                            <span class="completion">
                                <div class="partial"></div>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="dashboard-foot-item student-activity">
                <div class="head">
                    <span class="label">Student Activity</span>
                    <div class="dropdown time-period-wrapper">
                        <span class="cmg-active-dropdown-item">
                            <span class="label">Today</span>
                            <span class="icon"><FontAwesomeIcon icon={ faChevronDown } /></span>
                        </span>
                        <ul class="cmg-dropdown">
                            <li class="cmg-list-item active">This Week</li>
                            <li class="cmg-list-item">Last Week</li>
                            <li class="cmg-list-item">This Month</li>
                        </ul>
                    </div>
                </div>
                <div class="foot">
                    <ul class="activities">
                        <li class="activity">
                            <figure class="image-thumb"><img src="" alt="" /></figure>
                            <div class="activity-detail">
                                <span class="activity-label">1st place in "Chess"</span>
                                <span class="activity-venue">This event took place in Out School.</span>
                            </div>
                        </li>
                        <li class="activity">
                            <figure class="image-thumb"><img src="" alt="" /></figure>
                            <div class="activity-detail">
                                <span class="activity-label">1st place in "Chess"</span>
                                <span class="activity-venue">This event took place in Out School.</span>
                            </div>
                        </li>
                        <li class="activity">
                            <figure class="image-thumb"><img src="" alt="" /></figure>
                            <div class="activity-detail">
                                <span class="activity-label">1st place in "Chess"</span>
                                <span class="activity-venue">This event took place in Out School.</span>
                            </div>
                        </li>
                        <li class="activity">
                            <figure class="image-thumb"><img src="" alt="" /></figure>
                            <div class="activity-detail">
                                <span class="activity-label">1st place in "Chess"</span>
                                <span class="activity-venue">This event took place in Out School.</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="dashboard-foot-item to-do-list">
                <div class="head">
                    <span class="label">Subject Completion</span>
                    <div class="dropdown time-period-wrapper">
                        <span class="cmg-active-dropdown-item">
                            <span class="label">Today</span>
                            <span class="icon"><FontAwesomeIcon icon={ faChevronDown } /></span>
                        </span>
                        <ul class="cmg-dropdown">
                            <li class="cmg-list-item active">This Week</li>
                            <li class="cmg-list-item">Last Week</li>
                            <li class="cmg-list-item">This Month</li>
                        </ul>
                    </div>
                </div>
                <div class="foot">
                    <div class="list">
                        <input type="checkbox" name="" id="" />
                        <div class="todo-detail">
                            <span class="todo-label">Send Reminder to Students</span>
                            <span class="todo-time">01: 00 PM</span>
                        </div>
                        <div class="todo-status complete">Completed</div>
                    </div>
                    <div class="list">
                        <input type="checkbox" name="" id="" />
                        <div class="todo-detail">
                            <span class="todo-label">Send Reminder to Students</span>
                            <span class="todo-time">01: 00 PM</span>
                        </div>
                        <div class="todo-status pending">Pending</div>
                    </div>
                    <div class="list">
                        <input type="checkbox" name="" id="" />
                        <div class="todo-detail">
                            <span class="todo-label">Send Reminder to Students</span>
                            <span class="todo-time">01: 00 PM</span>
                        </div>
                        <div class="todo-status complete">Completed</div>
                    </div>
                    <div class="list">
                        <input type="checkbox" name="" id="" />
                        <div class="todo-detail">
                            <span class="todo-label">Send Reminder to Students</span>
                            <span class="todo-time">01: 00 PM</span>
                        </div>
                        <div class="todo-status cancelled">Cancelled</div>
                    </div>
                </div>
            </div>
        </div>

    </>
}