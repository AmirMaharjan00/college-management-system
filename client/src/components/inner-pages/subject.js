import { useState, useEffect, useMemo, useRef, useContext } from 'react'
import { Breadcrumb } from "../components"
import { TodaysDate } from "../includes/components-hooks"
import { useLocation } from 'react-router'
import '../assets/scss/inner-pages.scss'
import { fetchCallback, ourFetch, getCurrentSelectValue } from "../functions"
import Select from 'react-select'
import { GLOBALCONTEXT } from '../../App'
const backUrl = 'http://localhost:5000'

/**
 * Inner Subject
 */
export const InnerSubject = () => {
    const location = useLocation(),
        { subjectId } = location.state

    return <main className="cmg-main subject-inner" id="cmg-main">
        <div className="content-wrapper">
            <div className='page-header'>
            
                <Breadcrumb
                    headLabel = 'Edit Subject'
                    currentPageLabel = 'Subject'
                    middleLabel = 'Subjects'
                    middleLink = '/dashboard/academic/subjects'
                />

                <TodaysDate />

            </div>

            <Content
                subjectId = { subjectId }
            />
        </div>
    </main>
}

const Content = ({ subjectId }) => {
    const [ details, setDetails ] = useState({
            name: '',
            course_id: '',
            semester: '',
            year: '',
            code: '',
            teacherId: '',
            notes: null,
            completion: 0
        }),
        [ courses, setCourses ] = useState([]),
        [ submitStatus, setSubmitStatus ] = useState( true ),
        [ submitLabel, setSubmitLabel ] = useState( 'Submit' ),
        { loggedInUser } = useContext( GLOBALCONTEXT ),
        { role } = loggedInUser,
        noteRef = useRef(),
        [ users, setUsers ] = useState([]),
        [ notesStatus, setNotesStatus ] = useState( false ),
        { name, semester, year, course_id, code, teacherId, notes, completion } = details,
        courseOptions = useMemo(() => {
            return courses.reduce(( val, _this ) => {
                let { id, name } = _this
                val = [ ...val, { label: `${ name } ( ${ id } )`, value: id } ]
                return val
            }, [])
        }, [ courses ]),
        userOptions = useMemo(() => {
            return users.reduce(( val, user ) => {
                let { id, name } = user
                val = [ ...val, { value: id, label: name }]
                return val
            }, [])
        }, [ users ])

    useEffect(() => {
        ourFetch({
            api: '/subject-via-id',
            callback: fetchCallback,
            setter: setDetails,
            body: JSON.stringify({ id: subjectId })
        })
        ourFetch({
            api: '/courses',
            callback: fetchCallback,
            setter: setCourses
        })
        ourFetch({
            api: '/users',
            callback: fetchCallback,
            setter: setUsers
        })
    }, [])

    /**
     * Handle Change
     */
    const handleChange = ( event ) => {
        let { name, value, files } = event.target
        if( name === 'notes' ) {
            setNotesStatus( true )
            setDetails({
                ...details,
                [ name ]: files[ 0 ]
            })
        } else {
            setDetails({
                ...details,
                [ name ]: value
            })
        }
        setSubmitStatus( false )
        setSubmitLabel( 'Submit' )
    }

    /**
     * React select change handle
     */
    const handleReactSelectChange = ( option ) => {
        let { label, value } = option

        setDetails({
            ...details,
            against: value
        })
    }

    /**
     * Get proper url
     */
    const getUrl = ( arg ) => {
        if( typeof arg === 'string' ) {
            return backUrl + arg
        } else {
            return URL.createObjectURL( arg )
        }
    }

    /**
     * Handle Submit
     */
    const handleSubmit = ( event ) => {
        event.preventDefault()
        if( notesStatus ) {
            const formData = new FormData()
            formData.append( 'image', notes )
            ourFetch({
                api: '/upload',
                callback: uploadCallback,
                headersMultipart: true,
                body: formData
            })
        } else {
            updateCallbackFunc( notes )
        }
    }

    /**
     * upload callback
     */
    const uploadCallback = ( data ) => {
        let { success, imageUrl } = data
        if( success ) updateCallbackFunc( imageUrl )
    }

    /**
     * Update callback function
     */
    const updateCallbackFunc = ( notesUrl ) => {
        ourFetch({
            api: '/update-subject',
            callback: updateCallback,
            body: JSON.stringify({ ...details, notes: notesUrl })
        })
    }

    /**
     * Update Callback
     */
    const updateCallback = ( data ) => {
        let { success, result } = data
        if( success ) {
            setSubmitStatus( true )
            setNotesStatus( false )
            setSubmitLabel( 'Submitted' )
        }
    }

    /**
     * Handle no image click
     */
    const handleNoImageClick = () => {
        if( role === 'teacher' ) {
            noteRef.current.click()
        } else {

        }
    }

    return <div className="cmg-form-wrapper no-center" id="cmg-form-wrapper">
        <form className="new-book-form" onSubmit={ handleSubmit }>
            <div className="form-flex">
                <div className="col">
                    <div className="form-field">
                        <label className="form-label">
                            Subject Title
                            <span className="form-error">*</span>
                        </label>
                        <input type="text" value={ name } name="name" placeholder="Economics" disabled={ role !== 'admin' } onChange={ handleChange } required />
                    </div>
                    <div className="form-field">
                        <label className="form-label">
                            Course
                            <span className="form-error">*</span>
                        </label>
                        <Select
                            options = { courseOptions }
                            className = 'react-select'
                            name = 'course_id'
                            value = { getCurrentSelectValue( courseOptions, course_id ) }
                            onChange = { handleReactSelectChange }
                            isDisabled={ role !== 'admin' }
                        />
                    </div>
                    <div className="form-field">
                        <label className="form-label">
                            Semester
                            <span className="form-error">*</span>
                        </label>
                        <input type="number" value={ semester } name="semester" disabled={ role !== 'admin' } placeholder='1' onChange={ handleChange } required />
                    </div>
                    <div className="form-field">
                        <label className="form-label">
                            Year
                            <span className="form-error">*</span>
                        </label>
                        <input type="number" value={ year } name="year" disabled={ role !== 'admin' } placeholder="1" onChange={ handleChange } required />
                    </div>
                    <div className="form-field">
                        <label className="form-label">
                            Code
                            <span className="form-error">*</span>
                        </label>
                        <input type="text" value={ code } name="code" disabled={ role !== 'admin' } placeholder="CACS101" onChange={ handleChange } required />
                    </div>
                    <div className="form-field">
                        <label className="form-label">
                            Assigned To
                            <span className="form-error">*</span>
                        </label>
                        <Select
                            options = { userOptions }
                            className = 'react-select'
                            name = 'teacherId'
                            value = { getCurrentSelectValue( userOptions, teacherId ) }
                            onChange = { handleReactSelectChange }
                            isDisabled={ role !== 'admin' }
                        />
                    </div>
                    <input type="submit" value={ submitLabel } disabled={ submitStatus } />
                </div>
                <div className="col">
                    <div className="form-field">
                        <label className="form-label">
                            Completion
                            <span className="form-error">*</span>
                        </label>
                        <div className="custom-range">
                            <input type="range" max="100" min="0" disabled={ role !== 'teacher' } value={ completion } name="completion" placeholder="0" onChange={ handleChange } required />
                            <input type="number" max="100" min="0" disabled={ role !== 'teacher' } value={ completion } name="completion" placeholder="0" onChange={ handleChange } required />
                        </div>
                    </div>
                    <div className="form-field">
                        <label className="form-label">
                            Note
                            <span className="form-error">*</span>
                        </label>
                        <input type="file" name="notes" ref={ noteRef } disabled={ role !== 'teacher' } onChange={ handleChange } hidden />
                        {
                            notes && notes !== 'null' ? 
                            <iframe src={ getUrl( notes ) } frameBorder="0" width="100%" height="100%"></iframe> :
                            <div className="no-image" onClick={ handleNoImageClick }>
                                <span className="notice">{ role !== 'teacher' ? 'You are not a teacher of this subject.' : '' }</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </form>
    </div>
}