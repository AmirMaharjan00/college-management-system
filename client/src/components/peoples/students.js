import { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { TodaysDate } from '../includes/components-hooks'
import { GLOBALCONTEXT } from '../../App'

export const StudentsList = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { setOverlay, showPayFeesForm, setShowPayFeesForm, setHeaderOverlay, } = Global;
    let test = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]

    return <main className="cmg-main" id="cmg-main">
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