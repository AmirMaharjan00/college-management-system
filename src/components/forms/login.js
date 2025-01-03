import react from 'react'
import logo from '../assets/images/sscollege-logo.jpg'
import './assets/forms.css'

/**
 * Login Component
 * 
 * MARK: LOGIN
 * @since 1.0.0
 */
export const Login = () => {
    return <div className='cmg-login' id="cmg-login">
        <div class="college-logo-wrapper">
            <figure className='login-logo'>
                <img src={ logo } alt="Logo"/>
            </figure>
            <span className='quote'>{ 'By the community, for the community.' }</span>
        </div>
        <form>
            <h2 className='form-title'>Login</h2>
            <p className='form-field'>
                <input placeholder='Username' required/>
            </p>
            <p className='form-field'>
                <input placeholder='Password' required/>
            </p>
            <p className='form-submit'>
                <input type="submit" value="Login"/>
            </p>
        </form>
    </div>
}