import { createContext, useState } from 'react'
import './App.css';
import './components/assets/externals/boxicons/css/boxicons.css'
import { Index } from './components/index.js'
import { Login } from './components/forms/login.js'

export const GLOBALCONTEXT = createContext()

function App() {
  const [ isLoggedIn, setIsloggedIn ] = useState( false )

  /* Global Context Object */
  let globalContextObject = {
    isLoggedIn,
    setIsloggedIn
  }

  return <GLOBALCONTEXT.Provider value={ globalContextObject }>
    { isLoggedIn ? <Index /> : <Login /> }
  </GLOBALCONTEXT.Provider>
}

export default App;
