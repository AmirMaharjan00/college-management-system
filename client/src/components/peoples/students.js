import { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { TodaysDate } from '../includes/components-hooks'
import { GLOBALCONTEXT } from '../../App'
import { Link } from 'react-router-dom'

export const StudentsList = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { setOverlay, showPayFeesForm, setShowPayFeesForm, setHeaderOverlay, } = Global;
    let test = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]

    return <main className="cmg-main" id="cmg-main">
        <div className='page-header students-list'>
            <div className="dashboard-intro">
                <h2 className="user-name">Students List</h2>
                <ul className="cmg-breadcrumb" id="cmg-breadcrumb">
                    <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item">Students</li>
                    <li className="breadcrumb-item">All Students</li>
                </ul>
            </div>
            <div className='action-buttons'>
                <button>Refresh</button>
                <button>Print</button>
                <button>Export</button>
                <button>Add Student</button>
            </div>
        </div>
        <div className='list-head'>
            <div className='filter-wrapper'>
                <h2>Students List</h2>
                <div className='filters'>
                    <div></div>
                    <div className='layouts'>
                        <button>List</button>
                        <button>grid</button>
                    </div>
                    <select className='sort-by'>
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </div>
            </div>
            <div className='pagination-search-wrapper'>
                <div className='pagination-wrapper'>
                    <span>Row Per Page</span>
                    <select>
                        <option value="10" selected>10</option>
                        <option value="10">20</option>
                        <option value="10">30</option>
                    </select>
                    <span>Entries</span>
                </div>
                <div className='search-wrapper'>
                    <input type="search" name="student-search" placeholder='Search...'/>
                </div>
            </div>
        </div>
        <div className='student-fees-wrapper' id="student-fees-wrapper">
            <table className='table-wrapper'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Semester</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th>Date of Join</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        test.map(() => {
                            return <tr>
                                <td>S.No</td>
                                <td>Student ID</td>
                                <td>Name</td>
                                <td>Class</td>
                                <td>Semester</td>
                                <td>Gender</td>
                                <td>Status</td>
                                <td>Date of Join</td>
                                <td>Action</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </main>
}