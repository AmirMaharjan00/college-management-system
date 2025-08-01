import { createContext, useState } from 'react'
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
import { Main } from './components/main.js'
import { StudentFees } from './components/student/fees.js'
import { Profile } from './components/profile.js'
import { StudentsList } from './components/peoples/students.js'
import { TeachersList } from './components/peoples/teachers.js'
import { StaffsList } from './components/peoples/staffs.js'
import { Payment, PaymentSuccess, PaymentFailure } from './components/student/payment.js'
import { Invoice } from './components/student/invoice.js'
import { StudentDetails } from './components/student/student-details.js'
import { Library } from './components/library/library.js'
import { Account } from './components/account/account.js'
import { History } from './components/account/history.js'
import { PayFees } from './components/account/pay-fees.js'
import { LibraryFines } from './components/library/fines.js'
import { LibraryIssued } from './components/library/issued.js'
import { LibraryBooks } from './components/library/books.js'
import { Complaints } from './components/academic/complaints.js'
import { Examinations } from './components/academic/examinations.js'
import { HomeWork } from './components/academic/home-work.js'
import { Routines } from './components/academic/routines.js'
import { Subjects } from './components/academic/subjects.js'
import { Syllabus } from './components/academic/syllabus.js'

export const GLOBALCONTEXT = createContext()

function App() {
  const [ isLoggedIn, setIsloggedIn ] = useState( false ),
    [ loggedInUser, setLoggedInUser ] = useState({}),
    [ overlay, setOverlay ] = useState( false ),
    [ isDarkMode, setIsDarkMode ] = useState( 'light' ),
    [ isUserLogoutDropdownActive, setIsUserLogoutDropdownActive ] = useState( false ),
    [ isUserAddNewActive, setIsUserAddNewActive ] = useState( false ),
    [ isAcademicYearActive, setIsAcademicYearActive ] = useState( false ),
    [ isLanguageActive, setIsLanguageActive ] = useState( false ),
    [ newRegister, setNewRegister ] = useState( false ),
    [ isNotificationDropdownActive, setIsNotificationDropdownActive ] = useState( false ),
    [ isMessageDropdownActive, setIsMessageDropdownActive ] = useState( false ),
    [ isNotificationShown, setIsNotificationShown ] = useState( false ),
    [ notificationId, setNotificationId ] = useState( 0 ),
    [ showChat, setShowChat ] = useState( false ),
    [ chatId, setChatId ] = useState( 0 ),
    [ headerOverlay, setHeaderOverlay ] = useState( false ),
    [ leaveModal, setLeaveModal ] = useState( false ),
    [ showPayFeesForm, setShowPayFeesForm ] = useState( false ),
    [ formVisibility, setFormVisibility ] = useState( false ),
    [ deleteBookVisibility, setDeleteBookVisibility ] = useState( false ),
    [ currentBookId, setCurrentBookId ] = useState( 0 ),
    [ returnBookVisibility, setReturnBookVisibility ] = useState( 0 ),
    [ canvasOpen, setCanvasOpen ] = useState( false )

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
    showPayFeesForm, setShowPayFeesForm,
    formVisibility, setFormVisibility,  // For adding new book
    deleteBookVisibility, setDeleteBookVisibility,  // For showing delete popup
    currentBookId, setCurrentBookId,  // holds the clicked book id
    returnBookVisibility, setReturnBookVisibility,  // Show return book form
    canvasOpen, setCanvasOpen,
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
        <Route exact path='/dashboard/profile' element={ <Profile /> }/>
        {/* Peoples */}
        <Route exact path='/dashboard/students' element={ <StudentsList /> }/>
        <Route exact path='/dashboard/teachers' element={ <TeachersList /> }/>
        <Route exact path='/dashboard/staffs' element={ <StaffsList /> }/>
         {/* Payment */}
        <Route exact path='/dashboard/fees' element={ <StudentFees /> }/>
        <Route exact path='/dashboard/payment' element={ <Payment /> }/>
        <Route exact path='/dashboard/payment-success' element={ <PaymentSuccess /> }/>
        <Route exact path='/dashboard/payment-failure' element={ <PaymentFailure /> }/>
        {/* User Details */}
        <Route exact path='/dashboard/user-details' element={ <StudentDetails /> }/>
        {/* Library */}
        <Route exact path='/dashboard/library' element={ <Library /> } />
        <Route exact path='/dashboard/library/books' element={ <LibraryBooks /> }/>
        <Route exact path='/dashboard/library/fines' element={ <LibraryFines /> }/>
        <Route exact path='/dashboard/library/issued' element={ <LibraryIssued /> }/>
        {/* Account */}
        <Route exact path='/dashboard/account' element={ <Account /> }/>
        <Route exact path='/dashboard/account/history' element={ <History /> }/>
        <Route exact path='/dashboard/account/pay-fees' element={ <PayFees /> }/>
        {/* Academic */}
        <Route exact path='/dashboard/academic/complaints' element={ <Complaints /> }/>
        <Route exact path='/dashboard/academic/examinations' element={ <Examinations /> }/>
        <Route exact path='/dashboard/academic/home-work' element={ <HomeWork /> }/>
        <Route exact path='/dashboard/academic/routines' element={ <Routines /> }/>
        <Route exact path='/dashboard/academic/subjects' element={ <Subjects /> }/>
        <Route exact path='/dashboard/academic/syllabus' element={ <Syllabus /> }/>
      </Route>
      <Route exact path='/login' element={ <Login /> }/>
      <Route exact path='/registration' element={ <Registration /> }/>
      <Route exact path='/forgot-password' element={ <ForgotPassword /> }/>
      <Route exact path='/invoice' element={ <Invoice /> }/>
      <Route path='*' element={ <ErrorPage/> } />
    </Routes>
  );
}

export default App;