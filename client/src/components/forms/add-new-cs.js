import { useState, useEffect, useContext } from 'react'
import { GLOBALCONTEXT } from '../../App'
import { ourFetch } from '../functions'

/**
 * Registration Form
 * 
 * MARK: Registration
 * @since 1.0.0
 */
export const AddNewCourseSubject = ( args ) => {
    const Global = useContext( GLOBALCONTEXT )
    const { setOverlay, setNewRegister } = Global
    const { type = 'course' } = args
    const [ name, setName ] = useState( '' )
    const [ abbreviation, setAbbreviation ] = useState( '' )
    const [ duration, setDuration ] = useState( 4 )
    const [ semester, setSemester ] = useState( 1 )
    const [ course, setCourse ] = useState( 1 )
    const [ courses, setCourses ] = useState([])
    const [ nameErrorMsg, setNameErrorMsg ] = useState( '*' )
    const [ abbreviationErrorMsg, setAbbreviationErrorMsg ] = useState( '*' )
    const [ semesterErrorMsg, setSemesterErrorMsg ] = useState( '*' )
    const [ durationErrorMsg, setDurationErrorMsg ] = useState( '*' )
    const [ courseErrorMsg, setCourseErrorMessage ] = useState( '*' )
    const [ registrationSuccess, setRegistrationSuccess ] = useState( false )
    const [ registrationFailed, setRegistrationFailed ] = useState( false )
    const [ isSubmitted, setIsSubmitted ] = useState( false )
    const [ overlayMessage, setOverlayMessage ] = useState( '' )

    useEffect(() => {
        if( type === 'subject' ) {
            ourFetch({
                api: '/courses',
                callback: getCoursesCallback
            })
        }
    }, [])

    /* Get Subject Callback */
    const getCoursesCallback = ( data ) => {
        if( data.success ) {
            setCourses( data.result )
        }
    }

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
        if( nameAttribute === 'name' ) {
            setName( value )
        }
        if( nameAttribute === 'abbreviation' ) {
            setAbbreviation( value )
        }
        if( nameAttribute === 'duration' ) {
            setDuration( value )
        }
        if( nameAttribute === 'semester' ) {
            setSemester( value )
        }
        if( nameAttribute === 'course' ) {
            setCourse( value )
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
    * Validate Abbreviation
    * MARK: Abbreviation
    */
    const validateAbbreviation = () => {
        const abbreviationRegex = /[a-zA-Z]/;
        let isValidAbbreviation = abbreviationRegex.test( abbreviation );
        if( ! isValidAbbreviation ) {
            setAbbreviationErrorMsg( 'Abbreviation is not valid.' )
            return false
        } else {
            return true
        }
    }

    /* 
    * Validate Duration
    * MARK: Duration
    */
    const validateDuration = () => {
        const numberRegex = /[0-9]/;
        let isValidDuration = numberRegex.test( duration );
        if( ! isValidDuration ) {
            setDurationErrorMsg( `${ type === 'course' ? 'Duration' : 'Year' } is not valid.` )
            return false
        } else {
            return true
        }
    }
    
    /* 
    * Validate Semester
    * MARK: Semester
    */
    const validateSemester = () => {
        const numberRegex = /[0-9]/;
        let isValidDuration = numberRegex.test( semester );
        if( ! isValidDuration ) {
            setSemesterErrorMsg( 'Semester is not valid.' )
            return false
        } else {
            return true
        }
    }
    
    /* 
    * Validate Course
    * MARK: Course
    */
    const validateCourse = () => {
        const numberRegex = /[0-9]/;
        let isValidDuration = numberRegex.test( course );
        if( ! isValidDuration ) {
            setCourseErrorMessage( 'Course is not Valid' )
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
        let isValidAbbreviation = validateAbbreviation()
        let isValidDuration = validateDuration()
        let isValidSemester = validateSemester()
        let isValidCourse = validateCourse()
        if( isValidName && isValidAbbreviation && isValidDuration && type === 'course' ) {
            setIsSubmitted( true )
            ourFetch({
                api: '/insert-course',
                callback: coursesCallback,
                body: JSON.stringify({ name, abbreviation, duration })
            })
        }
        if( isValidName && isValidSemester && isValidDuration && type === 'subject' && isValidCourse ) {
            setIsSubmitted( true )
            ourFetch({
                api: '/insert-subject',
                callback: subjectsCallback,
                body: JSON.stringify({ name, semester, duration, course })
            })
        }
    }

    /* Courses Callback */
    const coursesCallback = ( data ) => {
        let { message } = data
        if( data.success ) {
            setRegistrationSuccess( true )
        } else {
            setRegistrationFailed( true )
        }
        setOverlayMessage( message )
    }

    /* Subjects Callback */
    const subjectsCallback = ( data ) => {
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
                    <h2 className='form-title'>{ `Add ${ type.slice( 0, 1 ).toUpperCase() + type.slice( 1 ) }.` }</h2>
                    <span className='form-excerpt'>{ `Create a new ${ type }.` }</span>
                </div>
                <div className='form-field'>
                    <div className='form-field-label-wrapper'>
                        <label className='form-label'>{ 'Name' }</label>
                        <span className='form-error'>{ nameErrorMsg }</span>
                    </div>
                    <input type="text" name="name" placeholder={ type === 'course' ? 'Bachelor in Computer Application' : 'Economics' } value={ name } onChange={ handleInputChange } required />
                </div>
                { type === 'course' && <div className='form-field'>
                    <div className='form-field-label-wrapper'>
                        <label className='form-label'>{ 'Abbreviation' }</label>
                        <span className='form-error'>{ abbreviationErrorMsg }</span>
                    </div>
                    <input type="text" name="abbreviation" placeholder="BCA" value={ abbreviation } onChange={ handleInputChange } required />
                </div> }
                { type === 'subject' && <div className='form-field'>
                    <div className='form-field-label-wrapper'>
                        <label className='form-label'>{ 'Semester' }</label>
                        <span className='form-error'>{ semesterErrorMsg }</span>
                    </div>
                    <input type="number" name="semester" value={ semester } onChange={ handleInputChange } required />
                </div> }
                <div className='form-field'>
                    <div className='form-field-label-wrapper'>
                        <label className='form-label'>{ type === 'course' ? 'Course Duration (in years)' : 'Year' }</label>
                        <span className='form-error'>{ durationErrorMsg }</span>
                    </div>
                    <input type="number" name="duration" value={ duration } onChange={ handleInputChange } required />
                </div>
                { type === 'subject' && <div className='form-field'>
                    <div className='form-field-label-wrapper'>
                        <label className='form-label'>{ 'Course' }</label>
                        <span className='form-error'>{ courseErrorMsg }</span>
                    </div>
                    <select name='course' value={ course } onChange={ handleInputChange }>
                        {
                            courses?.map(( courseItem ) => {
                                let { id, name, abbreviation } = courseItem
                                return <option value={ id }>{ `${ abbreviation } (${ name })` }</option>
                            })
                        }
                    </select>
                </div> }
                <div className='form-submit'>
                    <button onClick={ formSubmit } disabled={ registrationSuccess }>{ registrationSuccess ? 'Registered Successfully' : 'Register' }</button>
                </div>
            </form>
        </div>
    </div>
}