import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './assets/forms.css'
import { GLOBALCONTEXT } from '../../App'

/**
 * Login Component
 * 
 * MARK: LOGIN
 * @since 1.0.0
 */
export const Login = () => {
    const global = useContext( GLOBALCONTEXT )
    const { setIsloggedIn, loggedInUser, setLoggedInUser } = global
    const navigate = useNavigate()
    const [ username, setUsername ] = useState( '' )
    const [ usernameErrorMsg, setUsernameErrorMsg ] = useState( '*' )
    const [ password, setPassword ] = useState( '' )
    const [ passwordErrorMsg, setPasswordErrorMsg ] = useState( '*' )
    const [ loginSuccess, setLoginSuccess ] = useState( false )

    useEffect(() => {
        if( loginSuccess ) {
            setIsloggedIn( true )
            navigate( '/dashboard' )
        }
    }, [ loginSuccess ])

    /* 
    * MARK: Input Change Handle
    */
    const handleInputChange = ( event ) => {
        let nameAttribute = event.target.name
        let value = event.target.value
        if( nameAttribute === 'username' ) {
            setUsername( value )
        }
        if( nameAttribute === 'password' ) {
            setPassword( value )
        }
    }

    /* 
    * MARK: Form Submit 
    */
    const formSubmit = ( event ) => {
        event.preventDefault()
        let isValidEmail = validateEmail()
        let isValidPassword = validatePassword()
        if( isValidEmail && isValidPassword ) {
            fetch( 'http://localhost:5000/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password })
            })
            .then(( result ) => result.json())
            .then( ( data ) => {
                console.log( data )
                // if( data.success ) {
                    // setLoggedInUser( data.result[0] )
                    setLoginSuccess( data )
                // }
            })
        }
    }

    /*
    * MARK: Password
    */
    const validatePassword = () => {
        if( password.length < 8 ) setPasswordErrorMsg( 'Password is not 8 characters long.' )
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        const specialCharactersRegex = /[!"#$%&'()*+,-./:;<=>?@^_`{|}~]/;
        let isUppercaseValid = uppercaseRegex.test( password );
        let isLowercaseValid = lowercaseRegex.test( password );
        let isNumberValid = numberRegex.test( password );
        let isSpecialCharacterValid = specialCharactersRegex.test( password );
        /* Check Upper case */
        if( ! isUppercaseValid ) {
            setPasswordErrorMsg( 'Password must contain 1 uppercase.' )
            return false
        }
        /* Check Lower case */
        if( ! isLowercaseValid ) {
            setPasswordErrorMsg( 'Password must contain 1 lowercase.' )
            return false
        }
        /* Check Number */
        if( ! isNumberValid ) {
            setPasswordErrorMsg( 'Password must contain 1 number.' )
            return false
        }
        /* Check Special Characters */
        if( ! isSpecialCharacterValid ) {
            setPasswordErrorMsg( 'Password must contain 1 special character.' )
            return false
        }
        /* Run if all criteria meets */
        if( isUppercaseValid && isLowercaseValid && isNumberValid && isSpecialCharacterValid ) {
            return true
        }
    }

    /* 
    * MARK: Email
    */
    const validateEmail = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let isValidEmail = emailRegex.test( username );
        if( ! isValidEmail ) {
            setUsernameErrorMsg( 'Email is not valid.' )
            return false
        } else {
            return true
        }
    }

    /**
     * MARK: Main
     */
    return <div id="root-inner">
        <div className='cmg-login' id="cmg-login">
            <div className="college-logo-wrapper"></div>
            <form id="login-form" onSubmit={ formSubmit } method="POST">
                <div className='form-head'>
                    <h2 className='form-title'>{ 'Log In' }</h2>
                    <span className='form-excerpt'>{ 'Welcome Back ! Please enter your details.' }</span>
                </div>
                <div className='form-field'>
                    <div className='form-field-label-wrapper'>
                        <label className='form-label'>{ 'Email' }</label>
                        <span className='form-error'>{ usernameErrorMsg }</span>
                    </div>
                    <input type="email" name="username" value={ username } onChange={ handleInputChange } required/>
                </div>
                <div className='form-field'>
                    <div className='form-field-label-wrapper'>
                        <label className='form-label'>{ 'Password' }</label>
                        <span className='form-error'>{ passwordErrorMsg }</span>
                    </div>
                    <input type="password" name="password" value={ password } onChange={ handleInputChange } required/>
                    <span className='form-desc'><Link to="/forgot-password">{ 'Forgot Password ?' }</Link></span>
                </div>
                <div className='form-submit'>
                    <button>{ 'Log In' }</button>
                </div>
                <div className='form-field form-sign-up'>
                    <span>{ 'Don\'t have account ? ' }</span>
                    <Link to="/registration">{ 'Sign Up' }</Link>
                </div>
            </form>
        </div>
    </div>
}