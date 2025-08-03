import { useContext } from "react"
import { Link } from "react-router-dom"
import { GLOBALCONTEXT } from "../../App"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

/**
 * MARK: BREADCRUMB
 */
export const Breadcrumb = ( props ) => {
    const { headLabel = 'Account', currentPageLabel = 'All Books' } = props
    return <div className="breadcrumb-wrapper">
        <h2 className="title">{ headLabel }</h2>
        <ul className="cmg-breadcrumb" id="cmg-breadcrumb">
            <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
            <li className="breadcrumb-item"><Link to="/dashboard/account">Account</Link></li>
            <li className="breadcrumb-item">{ currentPageLabel }</li>
        </ul>
    </div>
}

/**
 * MARK: ACTION BUTTONS
 */
export const ActionButton = ( props ) => {
    const Global = useContext( GLOBALCONTEXT ),
        { formVisibility, setFormVisibility, setOverlay, setHeaderOverlay } = Global,
        { setFormMode, label = 'New Book', extendFunction } = props

    /**
     * Handle add new book
     */
    const handleClick = () => {
        setFormVisibility( ! formVisibility )
        setOverlay( true )
        setHeaderOverlay( true )
        setFormMode( 'new' )
        if( extendFunction ) extendFunction()
    }

    return <button className='action-btn add' onClick={ handleClick }>
        <FontAwesomeIcon icon={ faCirclePlus }/>
        <span className='label'>{ label }</span>
    </button>
}