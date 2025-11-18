import { useState, useEffect, useMemo } from 'react'
import { Breadcrumb } from "../components"
import { TodaysDate } from "../includes/components-hooks"
import { useLocation } from 'react-router'
import '../assets/scss/inner-pages.scss'
import { fetchCallback, ourFetch, getCurrentSelectValue } from "../functions"
import Select from 'react-select'

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
            teacherId: ''
        }),
        [ courses, setCourses ] = useState([]),
        [ users, setUsers ] = useState([]),
        { name, semester, year, course_id, code, teacherId } = details,
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
        let { name, value } = event.target
        setDetails({
            ...details,
            [ name ]: value
        })
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

    return <div className="cmg-form-wrapper no-center" id="cmg-form-wrapper">
        <form className="new-book-form">
            <div className="form-field">
                <label className="form-label">
                    Subject Title
                    <span className="form-error">*</span>
                </label>
                <input type="text" value={ name } name="name" placeholder="Economics" onChange={ handleChange } required />
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
                />
            </div>
            <div className="form-field">
                <label className="form-label">
                    Semester
                    <span className="form-error">*</span>
                </label>
                <input type="number" value={ semester } name="semester" placeholder='1' onChange={ handleChange } required />
            </div>
            <div className="form-field">
                <label className="form-label">
                    Year
                    <span className="form-error">*</span>
                </label>
                <input type="number" value={ year } name="year" placeholder="1" onChange={ handleChange } required />
            </div>
            <div className="form-field">
                <label className="form-label">
                    Code
                    <span className="form-error">*</span>
                </label>
                <input type="text" value={ code } name="code" placeholder="CACS101" onChange={ handleChange } required />
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
                />
            </div>
            <input type="submit" value="Submit" />
        </form>
    </div>
}