import { useState, useEffect, useContext } from 'react'
import { GLOBALCONTEXT } from '../../App'
import { ourFetch } from '../functions'

/**
 * Registration Form
 * 
 * MARK: Registration
 * @since 1.0.0
 */
export const AddNewUser = ( args ) => {
    const Global = useContext( GLOBALCONTEXT )
    const { setOverlay, setNewRegister, setHeaderOverlay } = Global
    const { role = 'student' } = args
    const [ name, setName ] = useState( '' )
    const [ email, setEmail ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ contact, setContact ] = useState( '' )
    const [ address, setAddress ] = useState( '' )
    const [ gender, setGender ] = useState( 'male' )
    const [ nameErrorMsg, setNameErrorMsg ] = useState( '*' )
    const [ emailErrorMsg, setEmailErrorMsg ] = useState( '*' )
    const [ passwordErrorMsg, setPasswordErrorMsg ] = useState( '*' )
    const [ contactErrorMsg, setContactErrorMsg ] = useState( '*' )
    const [ addressErrorMsg, setAddressErrorMsg ] = useState( '*' )
    const [ registrationSuccess, setRegistrationSuccess ] = useState( false )
    const [ isSubmitted, setIsSubmitted ] = useState( false )
    const [ overlayMessage, setOverlayMessage ] = useState( '' )

    useEffect(() => {
        if( registrationSuccess ) {
            setTimeout(() => {
                setNewRegister( false )
                setOverlay( false )
                setHeaderOverlay( false )
            }, 3000)
        }
    }, [ registrationSuccess ])

    /* 
    * MARK:Handle Input Change
    */
    const handleInputChange = ( event ) => {
        let nameAttribute = event.target.name
        let value = event.target.value
        if( nameAttribute === 'name' ) {
            setName( value )
        }
        if( nameAttribute === 'email' ) {
            setEmail( value )
        }
        if( nameAttribute === 'password' ) {
            setPassword( value )
        }
        if( nameAttribute === 'contact' ) {
            setContact( value )
        }
        if( nameAttribute === 'address' ) {
            setAddress( value )
        }
        if( nameAttribute === 'gender' ) {
            setGender( value )
        }
    }

    /* 
    * Validate Name
    * MARK: Name
    */
    const validateName = () => {
        const nameRegex = /[a-zA-Z]/;
        let isValidName = nameRegex.test( name );
        const numberRegex = /[0-9]/;
        let hasNumber = numberRegex.test( name );
        /* Check if number exists */
        if( hasNumber ) {
            setNameErrorMsg( 'Name should not contain numbers.' )
            return false
        }
        /* Check if name is valid */
        if( ! isValidName ) {
            setNameErrorMsg( 'Name is not valid.' )
            return false
        } else {
            return true
        }
    }

    /* 
    * Validate Email
    * MARK: Email
    */
    const validateEmail = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let isValidEmail = emailRegex.test( email );
        if( ! isValidEmail ) {
            setEmailErrorMsg( 'Email is not valid.' )
            return false
        } else {
            return true
        }
    }

    /* 
    * Validate Password
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
    * Validate Contact Number
    * MARK: Contact Number
    */
    const validateContact = () => {
        const numberRegex = /[0-9]/;
        let isValidContact = numberRegex.test( contact );
        if( ! isValidContact ) {
            setContactErrorMsg( 'Number is not valid.' )
            return false
        } else {
            return true
        }
    }

    /* 
    * Validate Address
    * MARK: Address
    */
    const validateAddress = () => {
        const addressRegex = /[a-zA-Z0-9.-]/;
        let isValidAddress = addressRegex.test( address );
        if( ! isValidAddress ) {
            setAddressErrorMsg( 'Address is not valid.' )
            return false
        } else {
            return true
        }
    }

    /* 
    * Validate Gender
    * MARK: Gender
    */
    const validateGender = () => {
        const genderRegex = /[a-zA-Z]/;
        let isValidGender = genderRegex.test( gender );
        if( ! isValidGender ) {
            return false
        } else {
            return true
        }
    }

    /* 
    * Validate Role
    * MARK: Role
    */
    const validateRole = ( role ) => {
        const roleRegex = /[a-zA-Z]/;
        let isValidRole = roleRegex.test( role );
        if( ! isValidRole ) {
            return false
        } else {
            return true
        }
    }

    /* 
    * MARK: Form Submit
    */
    const formSubmit = ( event ) => {
        event.preventDefault()
        let isValidName = validateName()
        let isValidEmail = validateEmail()
        let isValidPassword = validatePassword()
        let isValidContact = validateContact()
        let isValidAddress = validateAddress()
        let isValidGender = validateGender()
        let isvalidateRole = validateRole()
        setIsSubmitted( true )
        if( isValidName && isValidEmail && isValidPassword && isValidContact && isValidAddress && isValidGender && isvalidateRole ) {
            ourFetch({
                api: '/insert-user',
                callback: callback,
                body: JSON.stringify({ name, email, password, contact, address, gender, role })
            })
        }
    }

    /* Callback */
    const callback = ( data ) => {
        const { message, success } = data
        if( success ) {
            setRegistrationSuccess( true )
        }
        setOverlayMessage( message )
    }

    /*
    * MARK: Main
    */
    return <div className='cmg-registration new-register' id="cmg-registration">
        <div className="college-logo-wrapper"></div>
        <div className='form-wrapper'>
            { isSubmitted && <div className={ `form-overlay ${ registrationSuccess && 'success' } ${ ! registrationSuccess && 'error' }` }>
                <h2 className='overlay-message'>{ overlayMessage }</h2>
            </div> }
            <form id="registration-form" method="POST">
                <div className='form-head'>
                    <h2 className='form-title'>{ `Register ${ role.slice( 0, 1 ).toUpperCase() + role.slice( 1 ) }.` }</h2>
                    <span className='form-excerpt'>{ 'Create a new account.' }</span>
                </div>
                <div className='form-field'>
                    <div className='form-field-label-wrapper'>
                        <label className='form-label'>{ 'Name' }</label>
                        <span className='form-error'>{ nameErrorMsg }</span>
                    </div>
                    <input type="text" name="name" value={ name } onChange={ handleInputChange } required />
                </div>
                <div className='form-field'>
                    <div className='form-field-label-wrapper'>
                        <label className='form-label'>{ 'Email' }</label>
                        <span className='form-error'>{ emailErrorMsg }</span>
                    </div>
                    <input type="email" name="email" value={ email } onChange={ handleInputChange } required/>
                </div>
                <div className='form-field'>
                    <div className='form-field-label-wrapper'>
                        <label className='form-label'>{ 'Password' }</label>
                        <span className='form-error'>{ passwordErrorMsg }</span>
                    </div>
                    <input type="password" name="password" value={ password } onChange={ handleInputChange } required/>
                </div>
                <div className='form-field'>
                    <div className='form-field-label-wrapper'>
                        <label className='form-label'>{ 'Contact Number' }</label>
                        <span className='form-error'>{ contactErrorMsg }</span>
                    </div>
                    <input type="number" name="contact" value={ contact } onChange={ handleInputChange } required/>
                </div>
                <div className='form-field'>
                    <div className='form-field-label-wrapper'>
                        <label className='form-label'>{ 'Address' }</label>
                        <span className='form-error'>{ addressErrorMsg }</span>
                    </div>
                    <input type="text" name="address" value={ address } onChange={ handleInputChange } required/>
                </div>
                <div className='form-field is-flex radio-field'>
                    <label className='form-label'>{ 'Gender : ' }</label>
                    <div className='form-field-inner-wrapper is-flex'>
                        <div className='form-field-inner'>
                            <input type="radio" name="gender" value="male" checked={ gender === 'male' ? true : false } onChange={ handleInputChange } required/>
                            <label className='form-label'>{ 'Male' }</label>
                        </div>
                        <div className='form-field-inner'>
                            <input type="radio" name="gender" value="female" checked={ gender === 'female' ? true : false } onChange={ handleInputChange } required/>
                            <label className='form-label'>{ 'Female' }</label>
                        </div>
                    </div>
                </div>
                <div className='form-submit'>
                    <button onClick={ formSubmit } disabled={ registrationSuccess }>{ registrationSuccess ? 'Registered Successfully' : 'Register' }</button>
                </div>
            </form>
        </div>
    </div>
}