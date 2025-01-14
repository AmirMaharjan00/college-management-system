import { useState, useEffect, useContext } from 'react'
import { GLOBALCONTEXT } from '../../App'
import { ourFetch } from '../functions'

/**
 * Registration Form
 * 
 * MARK: Registration
 * @since 1.0.0
 */
export const AddNewNotification = ( args ) => {
    const Global = useContext( GLOBALCONTEXT )
    const { setOverlay, setNewRegister, loggedInUser } = Global
    const { id } = loggedInUser
    const [ title, setTitle ] = useState( '' )
    const [ details, setDetails ] = useState( '' )
    const [ sendTo, setSendTo ] = useState( 'all' )
    const [ titleErrorMsg, setTitleErrorMsg ] = useState( '*' )
    const [ detailsErrorMsg, setDetailsErrorMsg ] = useState( '*' )
    const [ sendToErrorMsg, setPasswordErrorMsg ] = useState( '*' )
    const [ registrationSuccess, setRegistrationSuccess ] = useState( false )
    const [ registrationFailed, setRegistrationFailed ] = useState( false )
    const [ isSubmitted, setIsSubmitted ] = useState( false )
    const [ overlayMessage, setOverlayMessage ] = useState( '' )

    useEffect(() => {
        if( registrationSuccess ) {
            setTimeout(() => {
                setNewRegister( false )
                setOverlay( false )
            }, 3000)
        }
    }, [ registrationSuccess ])

    useEffect(() => {
        if( registrationFailed ) {
            setTimeout(() => {
                setOverlayMessage( '' )
                setRegistrationFailed( false )
                setIsSubmitted( false )
            }, 3000)
        }
    }, [ registrationFailed ])

    /* 
    * MARK:Handle Input Change
    */
    const handleInputChange = ( event ) => {
        let nameAttribute = event.target.name
        let value = event.target.value
        if( nameAttribute === 'title' ) {
            setTitle( value )
        }
        if( nameAttribute === 'excerpt' ) {
            setDetails( value )
        }
        if( nameAttribute === 'send-to' ) {
            setSendTo( value )
        }
    }

    /* 
    * Validate Title
    * MARK: Title
    */
    const validateTitle = () => {
        const titleRegex = /[a-zA-Z]/;
        let isValidName = titleRegex.test( title );
        /* Check if name is valid */
        if( ! isValidName ) {
            setTitleErrorMsg( 'Name is not valid.' )
            return false
        } else {
            return true
        }
    }

    /* 
    * Validate Details
    * MARK: Details
    */
    const validateDetails = () => {
        const detailsRegex = /[a-zA-Z0-9]/;
        let isValidDetails = detailsRegex.test( details );
        /* Check if details is valid */
        if( ! isValidDetails ) {
            setDetailsErrorMsg( 'Details is not valid.' )
            return false
        } else {
            return true
        }
    }

    /* 
    * Validate Send To
    * MARK: Send To
    */
    const validateSendTo = () => {
        const sendToRegex = /[a-zA-Z]/;
        let isValidSendTo = sendToRegex.test( sendTo );
        /* Check if send to is valid */
        if( ! isValidSendTo ) {
            setPasswordErrorMsg( 'Send to is not valid.' )
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
        let isValidTitle = validateTitle()
        let isValidDetails = validateDetails()
        let isValidSendTo = validateSendTo()
        if( isValidTitle && isValidDetails && isValidSendTo && id ) {
            ourFetch({
                api: '/insert-notification',
                callback: notificationCallback,
                body: JSON.stringify({ title, details, sendTo, id })
            })
            setIsSubmitted( true )
        }
    }

    /* Notification Callback */
    const notificationCallback = ( data ) => {
        let { message } = data
        if( data.success ) {
            setRegistrationSuccess( true )
        } else {
            setRegistrationFailed( true )
        }
        setOverlayMessage( message )
    }

    /*
    * MARK: Main
    */
    return <div className='cmg-registration new-register' id="cmg-registration">
        <div className="college-logo-wrapper"></div>
        <div className='form-wrapper'>
            { isSubmitted && <div className={ `form-overlay ${ registrationSuccess && 'success' } ${ registrationFailed && 'error' }` }>
                <h2 className='overlay-message'>{ overlayMessage }</h2>
            </div> }
            <form id="registration-form" method="POST">
                <div className='form-head'>
                    <h2 className='form-title'>{ `Add Notification.` }</h2>
                    <span className='form-excerpt'>{ 'Create a new notification.' }</span>
                </div>
                <div className='form-field'>
                    <div className='form-field-label-wrapper'>
                        <label className='form-label'>{ 'Title' }</label>
                        <span className='form-error'>{ titleErrorMsg }</span>
                    </div>
                    <input type="text" name="title" value={ title } onChange={ handleInputChange } required />
                </div>
                <div className='form-field'>
                    <div className='form-field-label-wrapper'>
                        <label className='form-label'>{ 'Details' }</label>
                        <span className='form-error'>{ detailsErrorMsg }</span>
                    </div>
                    <textarea name="excerpt" value={ details } onChange={ handleInputChange } required></textarea>
                </div>
                <div className='form-field'>
                    <div className='form-field-label-wrapper'>
                        <label className='form-label'>{ 'Send To' }</label>
                        <span className='form-error'>{ sendToErrorMsg }</span>
                    </div>
                    <select name="send-to" value={ sendTo } onChange={ handleInputChange }>
                        <option value="all">{ 'All' }</option>
                        <option value="student">{ 'Students' }</option>
                        <option value="teacher">{ 'Teachers' }</option>
                        <option value="staff">{ 'Staffs' }</option>
                    </select>
                </div>
                <div className='form-submit'>
                    <button onClick={ formSubmit } disabled={ registrationSuccess }>{ registrationSuccess ? 'Registered Successfully' : 'Add' }</button>
                </div>
            </form>
        </div>
    </div>
}