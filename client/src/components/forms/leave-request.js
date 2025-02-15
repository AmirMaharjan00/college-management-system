import { useState, useContext, useEffect } from 'react'
import './assets/forms.css'
import { ourFetch } from '../functions'
import { GLOBALCONTEXT } from '../../App'

/**
 * Leave Request Form
 * 
 * MARK: Leave Request
 * @since 1.0.0
 */
export const LeaveRequest = () => {
    const Global = useContext( GLOBALCONTEXT )
    const { setLeaveModal, setOverlay, setHeaderOverlay } = Global
    
    const [ from, setFrom ] = useState( '' )
    const [ to, setTo ] = useState( '' )
    const [ type, setType ] = useState( 'casual' )
    const [ description, setDescription ] = useState( '' )
    const [ fromErrorMsg, setFromErrorMsg ] = useState( '*' )
    const [ toErrorMsg, setToErrorMsg ] = useState( '*' )
    const [ descriptionErrorMsg, setDescriptionErrorMsg ] = useState( '*' )
    const [ applySuccess, setApplySuccess ] = useState( false )
    const [ isSubmitted, setIsSubmitted ] = useState( false )
    const [ overlayMessage, setOverlayMessage ] = useState( '' )

    useEffect(() => {
        if( applySuccess ) {
            setTimeout(() => {
                setLeaveModal( false )
                setOverlay( false )
                setHeaderOverlay( false )
            }, 3000)
        }
    }, [ applySuccess ])

    /* 
    * MARK:Handle Input Change
    */
    const handleInputChange = ( event ) => {
        let nameAttribute = event.target.name
        let value = event.target.value
        if( nameAttribute === 'leaveFrom' ) {
            setFrom( value )
        }
        if( nameAttribute === 'leaveTo' ) {
            setTo( value )
        }
        if( nameAttribute === 'description' ) {
            setDescription( value )
        }
        if( nameAttribute === 'type' ) {
            setType( value )
        }
    }

    /* 
    * Validate Address
    * MARK: Address
    */
    const validateDescription = () => {
        const descriptionRegex = /[a-zA-Z0-9.-]/;
        let isValidDescription = descriptionRegex.test( description );
        if( ! isValidDescription ) {
            setDescriptionErrorMsg( 'Description is not valid.' )
            return false
        } else {
            return true
        }
    }

    /* 
    * Validate Date
    * MARK: Date
    */
    const validateDate = ( date, type ) => {
        let timestamp = Date.parse( date )
        if( isNaN( timestamp ) ) {
            if( type === 'start' ) setFromErrorMsg( 'Date is not valid.' )
            if( type === 'end' ) setToErrorMsg( 'Date is not valid.' )
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
        let isValidFrom = validateDate( from, 'start' )
        let isValidTo = validateDate( to, 'end' )
        let isValidDescription = validateDescription()
        if( isValidFrom && isValidTo && isValidDescription ) {
            ourFetch({
                api: '/insert-leave',
                callback: callback,
                body: JSON.stringify({ from, to, type, description })
            })
            setIsSubmitted( true )
        }
    }

    /* Callback */
    const callback = ( data ) => {
        const { success, message } = data
        if( success ) {
            setApplySuccess( true )
            setOverlayMessage( message )
        } else {
            setOverlayMessage( message )
        }
    }

    /*
    * MARK: Main
    */
    return <div id="root-inner">
        <div className='cmg-leave' id="cmg-leave">
            <div className="college-logo-wrapper"></div>
            <div className='form-wrapper'>
                { isSubmitted && <div className={ `form-overlay ${ applySuccess && 'success' } ${ ! applySuccess && 'error' }` }>
                    <h2 className='overlay-message'>{ overlayMessage }</h2>
                </div> }
                <form id="leave-form" method="POST">
                    <div className='form-head'>
                        <h2 className='form-title'>{ 'Request Leave' }</h2>
                        <span className='form-excerpt'>{ 'Apply for a leave.' }</span>
                    </div>
                    <div className='form-field'>
                        <div className='form-field-label-wrapper'>
                            <label className='form-label'>{ 'From' }</label>
                            <span className='form-error'>{ fromErrorMsg }</span>
                        </div>
                        <input type="date" name="leaveFrom" value={ from } onChange={ handleInputChange } required />
                    </div>
                    <div className='form-field'>
                        <div className='form-field-label-wrapper'>
                            <label className='form-label'>{ 'To' }</label>
                            <span className='form-error'>{ toErrorMsg }</span>
                        </div>
                        <input type="date" name="leaveTo" value={ to } onChange={ handleInputChange } required/>
                    </div>
                    <div className='form-field'>
                        <div className='form-field-label-wrapper'>
                            <label className='form-label'>{ 'Type' }</label>
                        </div>
                        <select name="type" onChange={ handleInputChange } required>
                            <option value={ 'casual' }>{ 'Casual Leave' }</option>
                            <option value={ 'sick' }>{ 'Sick Leave' }</option>
                            <option value={ 'personal' }>{ 'Personal Leave' }</option>
                            <option value={ 'study' }>{ 'Study Leave' }</option>
                            <option value={ 'paternity' }>{ 'Paternity Leave' }</option>
                            <option value={ 'emergency' }>{ 'Emergency Leave' }</option>
                        </select>
                    </div>
                    <div className='form-field'>
                        <div className='form-field-label-wrapper'>
                            <label className='form-label'>{ 'Description' }</label>
                            <span className='form-error'>{ descriptionErrorMsg }</span>
                        </div>
                        <textarea name="description" onChange={ handleInputChange } value={ description } required></textarea>
                    </div>
                    <div className='form-submit'>
                        <button onClick={ formSubmit }>{ 'Request' }</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}