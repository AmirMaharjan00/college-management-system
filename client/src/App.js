import { createContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './components/assets/css/main.css';
import './components/assets/externals/boxicons/css/boxicons.css'
import { Index } from './components/index.js'
import { Login } from './components/forms/login.js'
import { Registration } from './components/forms/registration.js'
import { ForgotPassword } from './components/forms/forgot-password.js'
import { ErrorPage } from './components/404.js'
import { ourFetch } from './components/functions.js'

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

  /* Global Context Object */
  let globalContextObject = {
    isLoggedIn, setIsloggedIn,
    loggedInUser, setLoggedInUser,
    overlay, setOverlay,
    isUserLogoutDropdownActive, setIsUserLogoutDropdownActive,
    isDarkMode, setIsDarkMode,
    isUserAddNewActive, setIsUserAddNewActive,
    isAcademicYearActive, setIsAcademicYearActive,
    isLanguageActive, setIsLanguageActive
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
      {/* <Route exact path='/swt-user' element={ Subscriber }>
        <Route exact path='/swt-user' element={ SubscriberDashboard }/>
        <Route exact path='/swt-user/setting' element={ SubscriberSetting }/>
        <Route exact path='/swt-user/report' element={ SubscriberReport }/>
      </Route>
      <Route exact path='/swt-admin' element={ Admin }>
        <Route exact path='/swt-admin' element={ Dashboard }/>
        <Route exact path='/swt-admin/pages' element={ <Pages /> }/>
        <Route exact path='/swt-admin/media' element={ Media }/>
        <Route exact path='/swt-admin/products' element={ <Products /> }/>
        <Route exact path='/swt-admin/settings' element={ Settings }/>
        <Route exact path='/swt-admin/report' element={ Report }/>
        <Route exact path='/swt-admin/users' element={ <Users /> }/>
      </Route> */}
      <Route exact path='/login' element={ <Login /> }/>
      <Route exact path='/registration' element={ <Registration /> }/>
      <Route exact path='/forgot-password' element={ <ForgotPassword/> }/>
      {/* <Route exact path='/swt-admin/swt-registration' element={ AdminRegistration }/> */}
      <Route exact path='/dashboard' element={ <Index/> }/>
      <Route path='*' element={ <ErrorPage/> } />
    </Routes>
  );
}


export default App;
