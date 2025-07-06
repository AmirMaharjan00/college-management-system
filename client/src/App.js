import { createContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './components/assets/sass/peoples.scss';
import './components/assets/css/main.css';
import './components/assets/css/fees.css';
import './components/assets/scss/fees.scss';
import './components/assets/externals/boxicons/css/boxicons.css'
import { Index } from './components/index.js'
import { Login } from './components/forms/login.js'
import { Registration } from './components/forms/registration.js'
import { ForgotPassword } from './components/forms/forgot-password.js'
import { ErrorPage } from './components/404.js'
import { ourFetch } from './components/functions.js'
import { Main } from './components/main.js'
import { StudentFees } from './components/student/fees.js'
import { Profile } from './components/profile.js'
import { StudentsList } from './components/peoples/students.js'
import { TeachersList } from './components/peoples/teachers.js'
import { StaffsList } from './components/peoples/staffs.js'

export const GLOBALCONTEXT = createContext()

function App() {
  const [ isLoggedIn, setIsloggedIn ] = useState( false )
  const [ loggedInUser, setLoggedInUser ] = useState({})
  const [ overlay, setOverlay ] = useState( false )
  const [ isDarkMode, setIsDarkMode ] = useState( 'light' )
  const [ isUserLogoutDropdownActive, setIsUserLogoutDropdownActive ] = useState( false )
  const [ isUserAddNewActive, setIsUserAddNewActive ] = useState( false )
  const [ isAcademicYearActive, setIsAcademicYearActive ] = useState( false )
  const [ isLanguageActive, setIsLanguageActive ] = useState( false )
  const [ newRegister, setNewRegister ] = useState( false )
  const [ isNotificationDropdownActive, setIsNotificationDropdownActive ] = useState( false )
  const [ isMessageDropdownActive, setIsMessageDropdownActive ] = useState( false )
  const [ isNotificationShown, setIsNotificationShown ] = useState( false )
  const [ notificationId, setNotificationId ] = useState( 0 )
  const [ showChat, setShowChat ] = useState( false )
  const [ chatId, setChatId ] = useState( 0 )
  const [ headerOverlay, setHeaderOverlay ] = useState( false )
  const [ leaveModal, setLeaveModal ] = useState( false )
  const [ showPayFeesForm, setShowPayFeesForm ] = useState( false )

  /* Global Context Object */
  let globalContextObject = {
    isLoggedIn, setIsloggedIn,
    loggedInUser, setLoggedInUser,
    overlay, setOverlay,
    isUserLogoutDropdownActive, setIsUserLogoutDropdownActive,
    isDarkMode, setIsDarkMode,
    isUserAddNewActive, setIsUserAddNewActive,
    isAcademicYearActive, setIsAcademicYearActive,
    isLanguageActive, setIsLanguageActive,
    newRegister, setNewRegister,
    isNotificationDropdownActive, setIsNotificationDropdownActive,
    isMessageDropdownActive, setIsMessageDropdownActive,
    isNotificationShown, setIsNotificationShown,
    notificationId, setNotificationId,
    showChat, setShowChat,
    chatId, setChatId,
    headerOverlay, setHeaderOverlay,
    leaveModal, setLeaveModal,
    showPayFeesForm, setShowPayFeesForm
  }

  return <GLOBALCONTEXT.Provider value={ globalContextObject }>
    <Router>
      <Links/>
    </Router>
  </GLOBALCONTEXT.Provider>
}

const Links = () => {
  return (
    <Routes>
      <Route exact path='/dashboard' element={ <Index/> }>
        <Route exact path='/dashboard' element={ <Main /> }/>
        <Route exact path='/dashboard/fees' element={ <StudentFees /> }/>
        <Route exact path='/dashboard/profile' element={ <Profile /> }/>
        <Route exact path='/dashboard/students' element={ <StudentsList /> }/>
        <Route exact path='/dashboard/teachers' element={ <TeachersList /> }/>
        <Route exact path='/dashboard/staffs' element={ <StaffsList /> }/>
      </Route>
      <Route exact path='/login' element={ <Login /> }/>
      <Route exact path='/registration' element={ <Registration /> }/>
      <Route exact path='/forgot-password' element={ <ForgotPassword/> }/>
      <Route path='*' element={ <ErrorPage/> } />
    </Routes>
  );
}


export default App;
