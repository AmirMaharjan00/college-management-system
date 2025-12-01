import { useContext, useState, useRef, useEffect } from 'react'
import './assets/css/profile.css'
import galaxy from './assets/images/galaxy.jpg'
import { GLOBALCONTEXT } from '../App'
import { ourFetch, fetchCallback } from './functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export const Profile = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { loggedInUser } = Global,
        [ value, setValue ] = useState({
            email: loggedInUser.email,
            name: loggedInUser.name,
            role: loggedInUser.role,
            contact: loggedInUser.contact,
            address: loggedInUser.address,
            gender: loggedInUser.gender,
            profile: loggedInUser.profile
        }),
        meta = [ 'dob', 'secondaryContact', 'motherName', 'fatherName', 'motherEmail', 'fatherEmail', 'motherContact', 'fatherContact', 'motherProfile', 'fatherProfile', 'documents', 'motherTongue', 'language' ],
        { name, email, role, contact, address, gender, profile } = value,
        [ imageObject, setImageObject ] = useState( '' ),
        [ motherPic, setMotherPic ] = useState( null ),
        [ fatherPic, setFatherPic ] = useState( null ),
        [ documentObject, setDocumentObjects ] = useState( [] ),
        [ isSaveDisabled, setIsSaveDisabled ] = useState( true ),
        [ isSaveClicked, setIsSaveClicked ] = useState( false ),
        [ isMetaImageTriggered, setIsMetaImageTriggered ] = useState( false ),
        [ isProfileReplaced, setIsProfileReplaced ] = useState( false ),
        [ isMetaTriggered, setIsMetaTriggered ] = useState( false ),
        profileRef = useRef( 0 ),
        nameRef = useRef( 0 ),
        documentRef = useRef( 0 ),
        motherProfileRef = useRef( 0 ),
        fatherProfileRef = useRef( 0 ),
        [ userMeta, setUserMeta ] = useState({}),
        { dob, secondaryContact, motherName, fatherName, motherEmail, fatherEmail, motherContact, fatherContact, motherProfile, fatherProfile, documents, motherTongue = 'Nepali', language = 'Nepali' } = userMeta
        console.log( motherProfile, 'motherProfile' )
        console.log( fatherProfile, 'fatherProfile' )

    useEffect(() => {
        setValue({
            email: loggedInUser.email,
            name: loggedInUser.name,
            role: loggedInUser.role,
            contact: loggedInUser.contact,
            address: loggedInUser.address,
            gender: loggedInUser.gender,
            profile: loggedInUser.profile
        })
        ourFetch({
            api: '/user-usermata-join-via-id',
            callback: fetchCallback,
            setter: setUserMeta,
            body: JSON.stringify({ id: loggedInUser.id })
        })
    }, [ loggedInUser, isSaveClicked ])

    /* Handle Profile Picture Logic */
    const handleProfilePic = ( event ) => {
        let files = event.target.files,
            name = event.target.name

        if( files.length > 0 ) {
            if( meta.includes( name ) ) {
                setIsMetaTriggered( true )
                setUserMeta({
                    ...userMeta,
                    [ name ]: URL.createObjectURL( files[0] )
                })
                if( name === 'motherProfile' ) setMotherPic( files[0] )
                if( name === 'fatherProfile' ) setFatherPic( files[0] )
                if( name === 'documents' ) setDocumentObjects( files )
            } else {
                setValue({
                    ...value,
                    profile: URL.createObjectURL( files[0] )
                })
                setImageObject( files[0] )
            }
            setIsSaveDisabled( false )
            setIsProfileReplaced( true )
        }
    }

    /* Handle Change */
    const handleChange = ( event ) => {
        let name = event.target.name,
            val = event.target.value

        if( meta.includes( name ) ) {
            setIsMetaTriggered( true )
            if( [ 'motherProfile', 'fatherProfile', 'documents' ].includes( name ) ) setIsMetaImageTriggered( true )
            setUserMeta({
                ...userMeta,
                [ name ]: val
            })
        }
        setValue({
            ...value,
            [ name ]: val
        })
        setIsSaveDisabled( false )
    }

    /* Handle Save */
    const handleSave = ( event ) => {
        event.preventDefault()
        if( isProfileReplaced ) {
            const formData = new FormData();
            formData.append('image', imageObject); // 'image' should match your backend field name
            ourFetch({
                api: '/upload',
                callback: uploadCallback,
                headersMultipart: true,
                body: formData
            })
            if( isMetaTriggered ) {
                formData.append('fatherProfile', fatherPic);
                formData.append('motherProfile', motherPic);
                formData.append('documents', documentObject);
                ourFetch({
                    api: '/uploads',
                    callback: uploadsCallback,
                    headersMultipart: true,
                    body: formData
                })
            }
        } else {
            ourFetch({
                api: '/update-profile',
                body: JSON.stringify( value ),
                callback: saveCallback
            })
            if( isMetaTriggered ) {
                const formData = new FormData();
                formData.append('fatherProfile', fatherPic);
                formData.append('motherProfile', motherPic);
                formData.append('documents', documentObject);
                ourFetch({
                    api: '/uploads',
                    callback: uploadsCallback,
                    headersMultipart: true,
                    body: formData
                })
                ourFetch({
                    api: '/update-usermeta',
                    body: JSON.stringify( userMeta ),
                    callback: metaCallback
                })
            }
        }

    }

    /**
     * Meta callback
     */
    const metaCallback = ( data ) => {
        let { success, result } = data
        if( success ) {
            setIsSaveClicked( true )
            setIsSaveDisabled( true )
            setIsMetaTriggered( false )
        }
    }

    /**
     * Save callback
     */
    const saveCallback = ( data ) => {
        let { success } = data
        if( success ) {
            setIsSaveClicked( true )
            setIsSaveDisabled( true )
            setIsMetaTriggered( false )
        }
    }

    /**
     * Upload Callback
     */
    const uploadCallback = ( data ) => {
        let { success, imageUrl } = data,
            newImage = `http://localhost:3000${ imageUrl }`
        if( success ) {
            setIsSaveClicked( true )
            setIsProfileReplaced( false )
            setIsSaveDisabled( true )
            setIsMetaTriggered( false )
        }
        ourFetch({
            api: '/update-profile',
            body: JSON.stringify({ ...value, profile: newImage })
        })
        if( isMetaTriggered ) {
            ourFetch({
                api: '/update-usermeta',
                body: JSON.stringify( userMeta ),
                callback: metaCallback
            })
        }
    }

    /**
     * Uploads Callback
     */
    const uploadsCallback = ( data ) => {
        let { success, files } = data
        if( success ) {
            console.log( files )
        }
    }

    return <main className="cmg-main" id="cmg-main">
        <div className='profile-wrapper' id="profile-wrapper">
            <div className='profile-head'>
                <figure className='banner-holder'>
                    <img src={ galaxy } alt="Galaxy Image" className='galaxy-image' />
                    <figure className='thumb-wrapper'>
                        <img src={ profile } alt="User Profile" className='user-profile' onClick={() => profileRef.current.click()}/>
                    </figure>
                </figure>
                <div className='user-info'>
                    <h2 className='info name'>{ name }</h2>
                    <span className='info email'>{ email }</span>
                    <div className='user-meta'>
                        <span className='info role'>{ role?.slice( 0, 1 ).toUpperCase() + role?.slice( 1 ) }</span>
                        <input type="file" id="file-input" ref={ profileRef } onChange={ handleProfilePic } name="image" hidden/>
                    </div>
                </div>
            </div>
            <div className='profile-body'>
                <form className="cmg-form-wrapper no-center" id="profile-form" method="POST" encType="multipart/form-data" action="/upload">
                    <div className="form-flex">
                        <div className='form-field'>
                            <label className='first form-label'>{ 'Name: ' }</label>
                            <input className="second" name='name' type="text" value={ name } ref={ nameRef } onChange={ handleChange } />
                        </div>
                        <div className='form-field'>
                            <label className='form-label'>{ 'Email: ' }</label>
                            <input className="second" name='email' type="email" value={ email } onChange={ handleChange } />
                        </div>
                    </div>
                    <div className="form-flex">
                        <div className='form-field'>
                            <label className='form-label'>{ 'Contact: ' }</label>
                            <input className="second" name='contact' type="number" value={ contact } onChange={ handleChange } />
                        </div>
                        <div className='form-field'>
                            <label className='form-label'>{ 'Secondary Contact: ' }</label>
                            <input className="second" name='secondaryContact' type="number" max="10" value={ secondaryContact } onChange={ handleChange } />
                        </div>
                    </div>
                    <div className="form-flex">
                        <div className='form-field'>
                            <label className='form-label'>{ 'Address: ' }</label>
                            <input className="second" name='address' type="text" value={ address } onChange={ handleChange } />
                        </div>
                        <div className='form-field'>
                            <label className='form-label'>{ 'Date of Birth: ' }</label>
                            <input className="second" name='dob' type="date" value={ dob } onChange={ handleChange } />
                        </div>
                    </div>
                    <div className="form-flex">
                        <div className='form-field'>
                            <label className='form-label'>{ 'Mother Name: ' }</label>
                            <input className="second" name='motherName' type="text" value={ motherName } onChange={ handleChange } />
                        </div>
                        <div className='form-field'>
                            <label className='form-label'>{ 'Father Name: ' }</label>
                            <input className="second" name='fatherName' type="text" value={ fatherName } onChange={ handleChange } />
                        </div>
                    </div>
                    <div className="form-flex">
                        <div className='form-field'>
                            <label className='form-label'>{ 'Mother Email: ' }</label>
                            <input className="second" name='motherEmail' type="email" value={ motherEmail } onChange={ handleChange } />
                        </div>
                        <div className='form-field'>
                            <label className='form-label'>{ 'Father Email: ' }</label>
                            <input className="second" name='fatherEmail' type="email" value={ fatherEmail } onChange={ handleChange } />
                        </div>
                    </div>
                    <div className="form-flex">
                        <div className='form-field'>
                            <label className='form-label'>{ 'Mother Contact: ' }</label>
                            <input className="second" name='motherContact' type="number" max="10" value={ motherContact } onChange={ handleChange } />
                        </div>
                        <div className='form-field'>
                            <label className='form-label'>{ 'Father Contact: ' }</label>
                            <input className="second" name='fatherContact' type="number" max="10" value={ fatherContact } onChange={ handleChange } />
                        </div>
                    </div>
                    <div className="form-flex">
                        <div className='form-field'>
                            <label className='form-label'>{ 'Mother Profile: ' }</label>
                            <input className="second" name='motherProfile' type="file" ref={ motherProfileRef } onChange={ handleProfilePic } hidden />
                            { motherProfile === null ?
                                <div className="no-image" onClick={() => motherProfileRef.current.click()}></div> :
                                <figure className="image-fig" onClick={() => motherProfileRef.current.click()}>
                                    <img src={ motherProfile } alt="" />
                                </figure>
                            }
                        </div>
                        <div className='form-field'>
                            <label className='form-label'>{ 'Father Profile: ' }</label>
                            <input className="second" name='fatherProfile' type="file" ref={ fatherProfileRef } onChange={ handleProfilePic } hidden />
                            { fatherProfile === null ?
                                <div className="no-image" onClick={() => fatherProfileRef.current.click()}></div> :
                                <figure className="image-fig" onClick={() => fatherProfileRef.current.click()}>
                                    <img src={ fatherProfile } alt="" />
                                </figure>
                            }
                        </div>
                    </div>
                    <div className="form-flex">
                        <div className='form-field'>
                            <label className='form-label'>{ 'Mother Tongue: ' }</label>
                            <input className="second" name='motherTongue' type="text" value={ motherTongue } onChange={ handleChange } />
                        </div>
                        <div className='form-field'>
                            <label className='form-label'>{ 'Language: ' }</label>
                            <input className="second" name='language' type="text" value={ language } onChange={ handleChange } />
                        </div>
                    </div>
                    <div className='form-field form-radio'>
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
                    <div className='form-field'>
                        <label className='form-label'>{ 'Documents: ' }</label>
                        <input className="second" name='documents' type="file" value={ documents } ref={ documentRef } onChange={ handleChange } hidden />
                        <div className="no-image" onClick={() => documentRef.current.click()}></div>
                    </div>
                    <button className="save-change save" onClick={ handleSave } disabled={ isSaveDisabled }>
                        <FontAwesomeIcon icon={ isSaveClicked ? faCircleCheck : faFloppyDisk } />
                        { isSaveClicked ? 
                            <span className="label">Saved</span> :
                            <span className="label">Save</span>
                        }
                    </button>
                </form>
            </div>
        </div>
    </main>
}