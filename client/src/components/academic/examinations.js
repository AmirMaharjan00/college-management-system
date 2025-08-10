import { useEffect, useState, useMemo, useContext, useCallback, useRef } from "react"
import { Breadcrumb, Pagination, ActionButton, ActionButtonDropdown } from "../components"
import { fetchCallback, ourFetch, getScript, adjustDate } from "../functions"
import { useDate } from "../includes/hooks"
import '../assets/scss/table.scss'
import '../assets/scss/form.scss'
import '../assets/scss/academic.scss'
import { GLOBALCONTEXT } from "../../App"
import { TodaysDate } from "../includes/components-hooks"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { CSS } from '@dnd-kit/utilities';
import {
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
 } from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';

/**
 * Examinations
 */
export const Examinations = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { formSuccess, setOverlay, setHeaderOverlay, setFormSuccess, setFormVisibility, formVisibility } = Global,
        [ searched, setSearch ] = useState( '' ),
        [ exams, setExams ] = useState([]),
        [ formMode, setFormMode ] = useState( 'new' ),
        [ formType, setFormType ] = useState( 'routine' ),
        [ tab, setTab ] = useState( 'all' ),
        tabClasses = useCallback(( _thisTab ) => {
            return `tab${( _thisTab === tab ) ? ' active': '' }`
        }, [ tab ]),
        filteredExams = useMemo(() => {
            let newList = []
            if( tab === 'all' ) {
                newList = exams
            } else {
                newList = exams.reduce(( val, exam ) => {
                    let { type } = exam
                    if( type === tab ) val = [ ...val, exam ]
                    return val
                }, [])
            }
            return newList.reduce(( val, exam ) => {
                let { title } = exam
                if( title.toLowerCase().includes( searched.toLowerCase() ) ) val = [ ...val, exam ]
                return val
            }, [])
        }, [ searched, tab, exams ]),
        actionButton = useRef(),
        [ currentDropdownId, setCurrentDropdownId ] = useState( null ),
        [ currentFormValues, setCurrentFormValues ] = useState({})

    useEffect(() => {
        ourFetch({
            api: '/all-exams',
            callback: fetchCallback,
            setter: setExams
        })
        if( formSuccess ) {
            setOverlay( false )
            setHeaderOverlay( false )
            setFormSuccess( false )
            setFormVisibility( false )
        }
    }, [ formSuccess ])

    useEffect(() => {
        if( ! formVisibility ) {
            setCurrentDropdownId( null )
        }
    }, [ formVisibility ])

    useEffect(() => {
        if( currentDropdownId ) {
            let _this = exams.reduce(( val, exam ) => {
                let { id, courseId, data } = exam
                if( currentDropdownId === id ) val = { ...exam, course: courseId, data: JSON.parse( data ) }
                return val
            }, {})
            setCurrentFormValues( _this )
        }
    }, [ currentDropdownId, formType ])

    return <main className="cmg-main examinations" id="cmg-main">
        
        <div className='page-header'>

            <Breadcrumb
                headLabel = 'Examination'
                currentPageLabel = 'Examination'
                middle = { false }
            />

            <TodaysDate />

        </div>

        <div className="page-body">

            <div className="head">
                <ul className="tabs">
                    <li className={ tabClasses( 'all' ) } onClick={() => setTab( 'all' )}>All</li>
                    <li className={ tabClasses( 'first' ) } onClick={() => setTab( 'first' )}>First Term</li>
                    <li className={ tabClasses( 'second' ) } onClick={() => setTab( 'second' )}>Second Term</li>
                    <li className={ tabClasses( 'third' ) } onClick={() => setTab( 'third' )}>Third Term</li>
                    <li className={ tabClasses( 'pre-board' ) } onClick={() => setTab( 'pre-board' )}>Pre-Board</li>
                    <li className={ tabClasses( 'practical' ) } onClick={() => setTab( 'practical' )}>Practicals</li>
                </ul>

                <input type="search" className="head-search" placeholder="Search..." value={ searched } onChange={( event ) => setSearch( event.target.value )}/>

                <ActionButton
                    setFormMode = { setFormMode }
                    label = "New Exam"
                    extendFunction = {() => setFormType( 'form' )}
                />
            </div>

            <Table
                items = { filteredExams }
                setFormMode = { setFormMode }
                currentDropdownId = { currentDropdownId }
                setCurrentDropdownId = { setCurrentDropdownId }
                setFormType = { setFormType }
            />

            { currentDropdownId && ( formType === 'form' ) && <Form
                currentFormValues = { currentFormValues }
            /> }

            { currentDropdownId && ( formType === 'routine' ) && <Routine 
                currentFormValues = { currentFormValues }
            /> }
        </div>

    </main>
}

/**
 * MARK: Table 
 */
const Table = ( props ) => {
    const Global = useContext( GLOBALCONTEXT ),
        { formVisibility, setOverlay, setHeaderOverlay, setFormVisibility } = Global,
        { convertedDate } = useDate(),
        { items, setFormMode, currentDropdownId } = props

    /**
     * Handle Dropdown
     */
    const handleDropdown = ( id ) => {
        props.setCurrentDropdownId( currentDropdownId === id ? null : id )
        props.setFormType( 'form' )
    }

    /**
     * Handle Title click
     */
    const handleTitleClick = ( id ) => {
        props.setCurrentDropdownId( currentDropdownId === id ? null : id )
        setOverlay( true )
        setHeaderOverlay( true )
        setFormVisibility( true )
        props.setFormType( 'routine' )
    }

    return <table className='table-wrapper' id="cmg-table">
        <thead>
            <tr>
                <th>S.No</th>
                <th>ID</th>
                <th>Title</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Course</th>
                <th>Semester</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                items.length ? items.map(( item, index ) => {
                    let count = index + 1,
                        { id, title, data, start, end, courseId, semester, notice, abbreviation } = item

                    return <tr key={ index }>
                        <td>{ `${ count }.` }</td>
                        <td>{ id }</td>
                        <td>
                            <span className="title" onClick={() => handleTitleClick( id )}>{ title }</span>
                        </td>
                        <td>{ convertedDate( start ) }</td>
                        <td>{ convertedDate( end ) }</td>
                        <td>{ `${ abbreviation } ( ${ courseId } )` }</td>
                        <td>{ getScript( semester ) }</td>
                        <td className='action-buttons'>
                            <div className={ `more-button-wrapper` }>
                                <button className='more-button' onClick={() => handleDropdown( id )}><FontAwesomeIcon icon={ faEllipsisVertical }/></button>
                                { currentDropdownId === id && ! formVisibility && <ActionButtonDropdown setFormMode = { setFormMode } /> }
                            </div>
                        </td>
                    </tr>
                }) : <tr className="no-records">
                    <td colSpan="7">No records</td>
                </tr>
            }
        </tbody>
    </table>
}

/**
 * MARK: FORM
 */
const Form = ( props ) => {
    const Global = useContext( GLOBALCONTEXT ),
        { formVisibility, setFormSuccess } = Global,
        { currentFormValues } = props,
        [ courses, setCourses ] = useState([]),
        [ subjects, setSubjects ] = useState([]),
        [ dragActive, setDragActive ] = useState( null ),
        [ formData, setFormData ] = useState({
            title: '',
            start: '',
            end: '',
            course: 1,
            semester: 1,
            notice: '',
            type: 'first',
            data: []
        }),
        { title, course, semester, notice, type, data } = formData,
        semesters = useMemo(() => {
            let total = courses.reduce(( val, _thisCourse ) => {
                let { id, semester } = _thisCourse
                val = { ...val, [ id ]: semester }
                return val
            }, {})
            let _this = total[ course ]
            return new Array( _this ).fill( 0 )
        }, [ courses, course ]),
        sensors = useSensors(
            useSensor( PointerSensor ),
            useSensor( KeyboardSensor, {
                coordinateGetter: sortableKeyboardCoordinates,
            })
        );

    useEffect(() => {
        if( Object.keys( currentFormValues ).length ) setFormData( currentFormValues )
    }, [ currentFormValues ])

    useEffect(() => {
        ourFetch({
            api: '/courses',
            callback: fetchCallback,
            setter: setCourses
        })
        ourFetch({
            api: '/subjects',
            callback: fetchCallback,
            setter: setSubjects
        })
    }, [])

    useEffect(() => {
        let newList = subjects.reduce(( val, subject ) => {
            let { semester: _thisSemester, course_id: _thisCourse } = subject
            if( ( _thisSemester == semester ) && ( _thisCourse == course ) ) val = [ ...val, subject ]
            return val
        }, [])
        setFormData({
            ...formData,
            data: newList.reduce(( val, subject, index ) => {
                let { name, code } = subject
                val = [ ...val, { date: data[ index ]?.date, subject: name, code } ]
                return val
            }, [])
        })
    }, [ subjects, semester, course ])

    /**
     * Handle Change
     */
    const handleChange = ( event ) => {
        let name = event.target.name,
            value = event.target.value

        setFormData({
            ...formData,
            [ name ]: value
        })
    }

    /**
     * Handle Form Submit
     */
    const handleSubmit = ( event ) => {
        event.preventDefault()
        let newFormData = {
            ...formData,
            start: data[ 0 ].date,
            end: data[( data.length - 1 )].date,
        }
        setFormData( newFormData )

        ourFetch({
            api: '/add-exams',
            callback: formSubmitCallback,
            body: JSON.stringify( newFormData )
        })
    }

    /**
     * Form Submit Callback
     */
    const formSubmitCallback = ( data ) => {
        let { result, success } = data
        if( success ) setFormSuccess( true )
    }

    /**
     * Handle Drag End
     */
    const handleDragEnd = ( event ) => {
        const { active, over } = event;
    
        if ( active.id !== over.id ) {
            setFormData({
                ...formData,
                data: arrayMove( data, active.id, over.id )
            });
        }
    }

    /**
     * Handle Routine Date Change
     */
    const handleRoutineDate = ( event, index ) => {
        let test = {
            ...formData,
            data: [
                ...formData.data.slice( 0, index ),
                { ...formData.data[ index ], date: event.target.value },
                ...formData.data.slice( index + 1 )
            ]
        }
        setFormData( test )
    }

    return formVisibility && <div className="cmg-form-wrapper">
        <form onSubmit={ handleSubmit }>
            <div className="form-head">
                <h2 className="form-title">Create New Exam Routine</h2>
                <p className="form-exceprt">Please fill the details below.</p>
            </div>
            <div className="form-field">
                <label className="form-label">
                    Title
                    <span className="form-error">*</span>
                </label>
                <input type="text" name="title" value={ title } onChange={ handleChange } required placeholder="Pre Board Examinations" />
            </div>
            <div className="form-field">
                <label className="form-label">
                    Exam Type
                    <span className="form-error">*</span>
                </label>
                <select name="type" value={ type } onChange={ handleChange }>
                    <option value="first">First Term</option>
                    <option value="second">Second Term</option>
                    <option value="third">Third Term</option>
                    <option value="pre-board">Pre Board</option>
                    <option value="practical">Practical</option>
                </select>
            </div>
            <div className="form-flex">
                <div className="form-field">
                    <label className="form-label">
                        Course
                        <span className="form-error">*</span>
                    </label>
                    <select name="course" value={ course } onChange={ handleChange }>
                        {
                            courses?.map(( course, index ) => {
                                let { name, abbreviation, id } = course
                                return <option value={ id } key={ index }>{ `${ name } ( ${ abbreviation } )` }</option>
                            })
                        }
                    </select>
                </div>
                { ( semesters.length > 1 ) && <div className="form-field">
                    <label className="form-label">
                        Semester
                        <span className="form-error">*</span>
                    </label>
                    <select name="semester" value={ semester } onChange={ handleChange }>
                        {
                            semesters?.map(( item, index ) => {
                                let count = index + 1
                                return <option value={ count } key={ index }>{ `${ getScript( count ) } semester` }</option>
                            })
                        }
                    </select>
                </div> }
            </div>

            <div className="form-field">
                <label className="form-label">
                    Routine
                    <span className="form-error">*</span>
                </label>
                <div className="form-sortable">
                    <DndContext
                        sensors = { sensors }
                        collisionDetection = { closestCenter }
                        onDragEnd = { handleDragEnd }
                        onDragStart = {({ active }) => setDragActive( active )}
                    >
                        <SortableContext 
                            items = { data }
                            strategy = { verticalListSortingStrategy }
                        >
                            {
                                data?.map(( item, index ) => {
                                    return <SortableItem
                                        key = { index }
                                        item = { item }
                                        id = { index }
                                        handleRoutineDate = { handleRoutineDate }
                                    />
                                })
                            }
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
            <div className="form-field">
                <label className="form-label">
                    Notice
                </label>
                <textarea name="notice" value={ notice } onChange={ handleChange } ></textarea>
            </div>

            <input type="submit" value="Create Routine" />
        </form>
    </div>
}

/**
 * MARK: SORTABLE ITEM
 */
export const SortableItem = ( props ) =>  {
    const { item, id } = props,
    { subject, date } = item,
    { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString( transform ),
        transition,
        opacity: isDragging ? 0.4 : undefined
    };
    
    return <div className="sortable" ref={ setNodeRef } style={ style } { ...attributes } { ...listeners }>
        <span className="name">{ subject }</span>
        <input type="date" value={ adjustDate( date ) } onChange={( event ) => props.handleRoutineDate( event, id ) } required />
        <span className="icon"><FontAwesomeIcon icon={ faGripVertical }/></span>
    </div>
}

/**
 * MARK: ROUTINE
 */
export const Routine = ( props ) => {
    const Global = useContext( GLOBALCONTEXT ),
        { formVisibility } = Global,
        { currentFormValues } = props,
        { title = '', notice = '', data = [] } = currentFormValues

    return <div className="routine-wrapper">
        <div className="routine-head">
            <figure className="logo">
                <img src="/images/tu-logo.png"/>
            </figure>
            <div className="head-info">
                <h2 className="info university">Tribhuwan University</h2>
                <h2 className="info department">Faculty of Humanities and Social Sciences</h2>
                <h2 className="info office">Office of the Dean</h2>
                <h3 className="info address">Kirtipur, Kathmandu</h3>
            </div>
        </div>
        <div className="routine-body">
            <div className="subject">{ title }</div>
            <div className="notice">{ notice }</div>
            <div className="routine">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(( item, index ) => {
                                let { date, subject, code = '' } = item
                                return <tr key={ index }>
                                    <td>{ date }</td>
                                    <td>{ `${ code }: ${ subject }` }</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                
            </div>
        </div>
        <div className="routine-foot">
            <span className="address">कीर्तिपुर, काठमाडौ, नेपाल । टेलिफोनः (९७७-१) ४-३३०३५८, ४-३३३९८०, ४-३३५१०४, ५-९०२३६८, ५-३१४६७९</span>
            <span className="emails">E-mail support@tufohss edu.np, tufohss ma@gmail.com, tubca2017@gmail.com, Website: www.tufohss.edu.np</span>
        </div>
    </div>
}