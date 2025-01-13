import { useContext } from 'react'
import { AdminDashboard } from './dashboard/admin-dashboard'
import { StudentDashboard } from './dashboard/student-dashboard'
import { TeacherDashboard } from './dashboard/teacher-dashboard'
import { GLOBALCONTEXT } from '../App'

/**
 * Main
 * 
 * @since 1.0.0
 */
export const Main = () => {
    const global = useContext( GLOBALCONTEXT )
    const { loggedInUser } = global
    const { role } = loggedInUser

    return <main className="cmg-main" id="cmg-main">
        { role === 'admin' && <AdminDashboard /> }
        { role === 'student' && <StudentDashboard /> }
        { role === 'teacher' && <TeacherDashboard /> }
    </main>
}