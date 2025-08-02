import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { ourFetch, fetchCallback } from '../functions'
import { Link } from 'react-router-dom'
import { useDate } from '../includes/hooks'
import { TodaysDate } from '../includes/components-hooks'
import './student-details.scss'
import { useCallback } from 'react'


/**
 * Student Details Component
 */
export const StudentDetails = () => {
    const location = useLocation(),
        { user } = location.state,
        { role } = user,
        { getDate, getTime } = useDate(),
        [ tab, setTab ] = useState( 'details' ),
        capitalizeRole = role.slice( 0, 1 ).toUpperCase() + role.slice( 1 )

    /**
     * Handle Tab click
     */
    const handleTabClick = ( current ) => {
        setTab( current )
    }

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
                <div className="student-profile student-sidebar-card">
                    <div className="student-profile__header">
                        <figure className="student-profile__avatar"></figure>
                        <div className="student-profile__info">
                            <span className="student-profile__status student-profile__status--active">Active</span>
                            <h2 className="student-profile__name">Janet Daniel</h2>
                            <p className="student-profile__id">AD123456</p>
                        </div>
                    </div>
                    <div className="student-profile__section student-profile__basic-info">
                        <h3 className="student-profile__section-title title">Basic Information</h3>
                        <div className="student-profile__details">
                            <p className="student-profile__detail">
                                <span className="student-profile__label">Roll No</span>
                                <span className="student-profile__value">35013</span>
                            </p>
                            <p className="student-profile__detail">
                                <span className="student-profile__label">Gender</span>
                                <span className="student-profile__value">Female</span>
                            </p>
                            <p className="student-profile__detail">
                                <span className="student-profile__label">Date Of Birth</span>
                                <span className="student-profile__value">25 Jan 2008</span>
                            </p>
                            <p className="student-profile__detail">
                                <span className="student-profile__label">Mother Tongue</span>
                                <span className="student-profile__value">Nepali</span>
                            </p>
                            <p className="student-profile__detail">
                                <span className="student-profile__label">Language</span>
                                <span className="student-profile__value">Nepali</span>
                            </p>
                        </div>
                        <button className="student-profile__button">Add Fees</button>
                    </div>
                </div>
                <div className="student-profile__section student-profile__contact-info student-sidebar-card">
                    <h3 className="student-profile__section-title">Primary Contact Info</h3>
                    <div className="student-profile__contact">
                        <span className="student-profile__icon icon"></span>
                        <div className="student-profile__contact-detail">
                            <p className="student-profile__label">Phone Number</p>
                            <p className="student-profile__value">+ 1 324324</p>
                        </div>
                    </div>
                    <div className="student-profile__contact">
                        <span className="student-profile__icon icon"></span>
                        <div className="student-profile__contact-detail">
                            <p className="student-profile__label">Phone Number</p>
                            <p className="student-profile__value">+ 1 324324</p>
                        </div>
                    </div>
                </div>

                <div className="sibling-info student-sidebar-card">
                    <h3 className="sibling-info__title student-profile__section-title title">Sibiling Information</h3>
                    <div className="sibling-info__card">
                        <div className="sibling-info__thumb">
                            <figure className="sibling-info__avatar"></figure>
                        </div>
                        <div className="sibling-info__details">
                            <p className="sibling-info__name">Ralph Claudia</p>
                            <span className="sibling-info__class">III, B</span>
                        </div>
                    </div>
                    <div className="sibling-info__card">
                        <div className="sibling-info__thumb">
                            <figure className="sibling-info__avatar"></figure>
                        </div>
                        <div className="sibling-info__details">
                            <p className="sibling-info__name">Julie Scott</p>
                            <span className="sibling-info__class">V, A</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="student-main">
                <div className="student-main__tabs">
                    <ul className="student-main__tab-list">
                        <li className={ `student-main__tab-item ${( tab === 'details' ? 'active' : '' )}` } onClick={() => handleTabClick( 'details' )}>Student Details</li>
                        <li className={ `student-main__tab-item ${( tab === 'time-table' ? 'active' : '' )}` } onClick={() => handleTabClick( 'time-table' )}>Time Table</li>
                        <li className={ `student-main__tab-item ${( tab === 'leave' ? 'active' : '' )}` } onClick={() => handleTabClick( 'leave' )}>Leave & Attendance</li>
                        <li className={ `student-main__tab-item ${( tab === 'fees' ? 'active' : '' )}` } onClick={() => handleTabClick( 'fees' )}>Fees</li>
                        <li className={ `student-main__tab-item ${( tab === 'exam' ? 'active' : '' )}` } onClick={() => handleTabClick( 'exam' )}>Exam & Results</li>
                        <li className={ `student-main__tab-item ${( tab === 'library' ? 'active' : '' )}` } onClick={() => handleTabClick( 'library' )}>Library</li>
                    </ul>
                </div>
                { ( tab === 'details' ) && <Details /> }
                { ( tab === 'time-table' ) && <TimeTable /> }
                { ( tab === 'leave' ) && <Leave /> }
                { ( tab === 'fees' ) && <Fees /> }
                { ( tab === 'exam' ) && <Exam /> }
                { ( tab === 'library' ) && <Library /> }
            </div>
        </div>
    </main>
}

/**
 * MARK: Student Details
 */
const Details = () => {
    return <>
        <div className="student-main__section personal-info">
            <h3 className="personal-info__title">Parents Information</h3>
            <div className="personal-info__list">
                <div className="parent-card">
                    <div className="parent-card__profile">
                        <figure className="parent-card__avatar"></figure>
                        <div className="parent-card__details">
                            <h3 className="parent-card__name">Jerald Vicinius</h3>
                            <span className="parent-card__role">Father</span>
                        </div>
                    </div>
                    <div className="parent-card__contact">
                        <p className="parent-card__label">Phone</p>
                        <span className="parent-card__value">+1 45545 46464</span>
                    </div>
                    <div className="parent-card__contact">
                        <p className="parent-card__label">Email</p>
                        <span className="parent-card__value">jera@example.com</span>
                    </div>
                    <button className="parent-card__reset-pass"></button>
                </div>

                <div className="parent-card">
                    <div className="parent-card__profile">
                        <figure className="parent-card__avatar"></figure>
                        <div className="parent-card__details">
                            <h3 className="parent-card__name">Jerald Vicinius</h3>
                            <span className="parent-card__role">Father</span>
                        </div>
                    </div>
                    <div className="parent-card__contact">
                        <p className="parent-card__label">Phone</p>
                        <span className="parent-card__value">+1 45545 46464</span>
                    </div>
                    <div className="parent-card__contact">
                        <p className="parent-card__label">Email</p>
                        <span className="parent-card__value">jera@example.com</span>
                    </div>
                    <button className="parent-card__reset-pass"></button>
                </div>
            </div>
        </div>

        <div className="student-main__section info-section">
            <div className="info-section__documents">
                <h3 className="info-section__title">Documents</h3>
            </div>
            <div className="info-section__address">
                <h3 className="info-section__title">Address</h3>
                <div className="info-section__address-list">
                    <div className="info-section__address-item">
                        <span className="info-section__icon icon"></span>
                        <div className="info-section__address-details">
                            <p className="info-section__label">Current Address</p>
                            <span className="info-section__value">3495 Red Hawk Road, Buffalo Lake, MN 55314</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

/**
 * MARK: Time Table
 */
const TimeTable = () => {
    return <div>
        Time table
    </div>
}

/**
 * MARK: leave
 */
const Leave = () => {
    return <div>
        Leave
    </div>
}

/**
 * MARK: fees
 */
const Fees = () => {
    return <div>
        Fees
    </div>
}

/**
 * MARK: Exam & Results
 */
const Exam = () => {
    return <div>
        Exam
    </div>
}

/**
 * MARK: Library
 */
const Library = () => {
    return <div>
        Library
    </div>
}