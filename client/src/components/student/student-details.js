import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { ourFetch } from '../functions'
import { Link } from 'react-router-dom'
import { useDate } from '../includes/hooks'
import { TodaysDate } from '../includes/components-hooks'
import './profile.scss'


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

        <div className="personal-info-wrapper">
            {/* Left Section */}
            {/* <div className="left-panel">
                <h3>Personal Information</h3>
                <div className="profile-section">
                {image ? (
                    <img src="#" alt="Profile" className="profile-img" />
                ) : (
                    <div className="upload-placeholder">
                    <label htmlFor="upload-input">Click to Upload</label>
                    <input
                        type="file"
                        id="upload-input"
                        accept=""
                        onChange={handleImageChange}
                        hidden
                    />
                    <p>or drag and drop</p>
                    <small>JPG or PNG (Max 450 x 450 px)</small>
                    </div>
                )}
                {image && (
                    <div className="image-actions">
                    <button onClick={handleDelete}>Delete</button>
                    <label htmlFor="upload-input" className="update-btn">Update</label>
                    </div>
                )}
                </div>
            </div> */}

            {/* Right Section */}
            <div className="right-panel">
                <div className="header">
                <h3>Personal Information</h3>
                <button className="edit-btn">Edit</button>
                </div>
                <div className="form-fields">
                <div className="row">
                    <label>First Name</label>
                    <input type="text" placeholder="Enter First Name" />
                    <label>Last Name</label>
                    <input type="text" placeholder="Enter Last Name" />
                </div>
                <label>Email Address</label>
                <input type="email" placeholder="Enter Email" />
                <div className="row">
                    <label>User Name</label>
                    <input type="text" placeholder="Enter User Name" />
                    <label>Phone Number</label>
                    <input type="tel" placeholder="Enter Phone Number" />
                </div>
                </div>
            </div>

            <div className="address-info-wrapper">
                {/* Address Info */}
                <div className="card">
                    <div className="card-header">
                    <h3>Address Information</h3>
                    <button className="edit-btn">Edit</button>
                    </div>
                    <div className="form-fields">
                    <input type="text" placeholder="Enter Address" />
                    <div className="row">
                        <input type="text" placeholder="Enter Country" />
                        <input type="text" placeholder="Enter State" />
                    </div>
                    <div className="row">
                        <input type="text" placeholder="City" />
                        <input type="text" placeholder="Enter Postal Code" />
                    </div>
                    </div>
                </div>

                {/* Password Section */}
                <div className="card">
                    <div className="card-header">
                    <h3>Password</h3>
                    <button className="change-btn">Change</button>
                    </div>
                    <div className="form-fields">
                    <div className="password-input">
                        <input type="password" placeholder="Current Password" />
                        <span className="toggle-icon">👁️‍🗨️</span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
}