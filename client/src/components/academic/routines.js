/**
 * Routines
 */
import '../assets/scss/routines.scss'

export const Routines = () => {

    return <main className="cmg-main" id="cmg-main">

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