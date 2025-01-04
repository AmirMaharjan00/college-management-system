import { useContext } from 'react'
import { Link } from 'react-router-dom'
import './assets/forms.css'
import { GLOBALCONTEXT } from '../../App'

/**
 * Login Component
 * 
 * MARK: LOGIN
 * @since 1.0.0
 */
export const ForgotPassword = () => {
    const global = useContext( GLOBALCONTEXT )
    const { isLoggedIn, setIsloggedIn } = global

    return <div className='cmg-forgot-password' id="cmg-forgot-password">
        <div className="college-logo-wrapper"></div>
        <form id="forgot-password-form">
            <div className='form-head'>
                <h2 className='form-title'>{ 'Change your password' }</h2>
                <span className='form-excerpt'>{ 'Enter a new password below to change your password.' }</span>
            </div>
            <div className='form-field'>
                <div className='form-field-label-wrapper'>
                    <label className='form-label'>{ 'New Password' }</label>
                    <span className='form-error'>{ '*' }</span>
                </div>
                <input type="password" required/>
            </div>
            <div className='form-field'>
                <div className='form-field-label-wrapper'>
                    <label className='form-label'>{ 'Confirm Password' }</label>
                    <span className='form-error'>{ '*' }</span>
                </div>
                <input type="password" required/>
            </div>
            <div className='form-submit'>
                <button>{ 'Change Password' }</button>
            </div>
        </form>
    </div>
}