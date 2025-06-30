import { useContext, useState, useRef, useEffect } from 'react'
import './assets/css/profile.css'
import galaxy from './assets/images/galaxy.jpg'
import profile from './assets/images/user.jpg'
import { GLOBALCONTEXT } from '../App'
import { ourFetch } from './functions'

export const Profile = () => {
    const Global = useContext( GLOBALCONTEXT )
    const { loggedInUser } = Global
    const [ value, setValue ] = useState({ 
        email: loggedInUser.email,
        name: loggedInUser.name,
        role: loggedInUser.role,
        contact: loggedInUser.contact,
        address: loggedInUser.address,
        gender: loggedInUser.gender 
    })
    const { name, email, role, contact, address, gender } = value
    const [ disabled, setDisabled ] = useState( true )
    const [ profilePreview, setProfilePreview ] = useState( '' )
    const [ hasProfileChanged, setHasProfileChanged ] = useState( false )
    const profilePicElement = useRef( 0 )
    const nameRef = useRef( 0 )

    useEffect(() => {
        setValue({
            email: loggedInUser.email,
            name: loggedInUser.name,
            role: loggedInUser.role,
            contact: loggedInUser.contact,
            address: loggedInUser.address,
            gender: loggedInUser.gender 
        })
    }, [ loggedInUser ])

    /* Handle Edit Click */
    const handleEditClick = () => {
        setDisabled( false )
        if( nameRef.current ) {
            nameRef.current.focus()
        }
    }

    /* Handle Profile Change */
    const handleProfileChange = () => {
        if( profilePicElement.current ) {
            profilePicElement.current.click()
        }
    }

    /* Handle Profile Picture Logic */
    const handleProfilePic = ( event ) => {
        let files = event.target.files
        if( files.length > 0 ) {
            let picture = files[0]
            let pictureUrl = URL.createObjectURL( picture )
            setHasProfileChanged( true )
            setProfilePreview( picture )
        }
    }

    /* Handle Change */
    const handleChange = ( event ) => {
        let name = event.target.name
        let val = event.target.value
        setValue({
            ...value,
            [ name ]: val
        })
    }

    /* Handle Save */
    const handleSave = () => {
        // console.log( profilePreview, 'Image' )
        // console.log( value, 'Value' )

        const formData = new FormData();
        formData.append('image', profilePreview); // 'image' should match your backend field name

        ourFetch({
            api: '/upload',
            callback: uploadCallback,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: JSON.stringify( formData )
        })
    }

    /**
     * Upload Callback
     */
    const uploadCallback = ( data ) => {
        console.log( data )
    }

    return <main className="cmg-main" id="cmg-main">
        <div className='profile-wrapper' id="profile-wrapper">
            <div className='profile-head'>
                <figure className='banner-holder'>
                    <img src={ galaxy } alt="Galaxy Image" className='galaxy-image' />
                    <figure className='thumb-wrapper'>
                        <img src={ hasProfileChanged ? profilePreview :profile } alt="User Profile" className='user-profile' />
                    </figure>
                </figure>
                <div className='user-info'>
                    <h2 className='info name'>{ name }</h2>
                    <span className='info email'>{ email }</span>
                    <div className='user-meta'>
                        <span className='info role'>{ role?.slice( 0, 1 ).toUpperCase() + role?.slice( 1 ) }</span>
                        <input type="file" id="file-input" ref={ profilePicElement } onChange={ handleProfilePic }/>
                        { ! disabled && <button className='change-profile' onClick={ handleProfileChange }>{ 'Change Profile Picture' }</button> }
                        <button className={ `edit ${ disabled ? 'locked' : 'unlocked' }` } disabled={ ! disabled } onClick={ handleEditClick }>{ disabled ? 'Edit' : 'You can now Edit.' }</button>
                    </div>
                </div>
            </div>
            <div className='profile-body'>
                <form id="profile-form" method="POST" encType="multipart/form-data" action='/upload'>
                    <div className='form-field'>
                        <label className='first form-label'>{ 'Name: ' }</label>
                        <input className="second" name='name' disabled={ disabled } type="text" value={ name } ref={ nameRef } onChange={ handleChange } />
                    </div>
                    <div className='form-field'>
                        <label className='form-label'>{ 'Email: ' }</label>
                        <input className="second" name='email' disabled={ disabled } type="email" value={ email } onChange={ handleChange } />
                    </div>
                    <div className='form-field'>
                        <label className='form-label'>{ 'Contact: ' }</label>
                        <input className="second" name='contact' disabled={ disabled } type="number" value={ contact } onChange={ handleChange } />
                    </div>
                    <div className='form-field'>
                        <label className='form-label'>{ 'Address: ' }</label>
                        <input className="second" name='address' disabled={ disabled } type="text" value={ address } onChange={ handleChange } />
                    </div>
                    <div className='form-field'>
                        <label className='form-label'>{ 'Gender: ' }</label>
                        <div className='second form-field-inner-wrapper'>
                            <div className='form-field-inner'>
                                <input type="radio" name="gender" checked={ gender === 'male' ? true : false } value='male' onChange={ handleChange } />
                                <label className='form-label'>{ 'Male' }</label>
                            </div>
                            <div className='form-field-inner'>
                                <input type="radio" name="gender" checked={ gender === 'female' ? true : false } value='female' onChange={ handleChange } />
                                <label className='form-label'>{ 'Female' }</label>
                            </div>
                        </div>
                    </div>
                    { ! disabled && <button className='save-change' onClick={ handleSave }>{ 'Save Changes' }</button> }
                </form>
            </div>
        </div>
    </main>
}