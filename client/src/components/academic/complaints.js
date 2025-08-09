import { useEffect, useState, useMemo, useContext } from "react"
import { Breadcrumb, Pagination, RowAndSearch } from "../components"
import { fetchCallback, ourFetch } from "../functions"
import { TodaysDate } from "../includes/components-hooks"
import { useDate } from "../includes/hooks"
import '../assets/scss/table.scss'
import '../assets/scss/academic.scss'
import { GLOBALCONTEXT } from "../../App"
import { Link } from "react-router-dom"
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

/**
 * Complaints
 */
export const Complaints = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { formVisibility } = Global,
        [ complaints, setComplaints ] = useState([]),
        [ searched, setSearched ] = useState( '' ),
        [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ activePage, setActivePage ] = useState( 1 ),
        [ formMode, setFormMode ] = useState( 'new' ),
        [ activeComplaint, setActiveComplaint ] = useState({}),
        totalPages = new Array( Math.ceil( complaints.length / rowsPerPage ) ).fill( 0 ),
        filteredComplaints = useMemo(() => {
            if( searched === '' ) return complaints.slice( ( activePage - 1 ) * rowsPerPage, ( activePage * rowsPerPage ) );
            let newList = complaints.reduce(( val, item ) => {
                let { subject, complaintAgainst, complaintBy } = item
                if( subject.toLowerCase().includes( searched ) || complaintAgainst.toLowerCase().includes( searched ) || complaintBy.toLowerCase().includes( searched ) ) {
                    val = [ ...val, item ]
                }
                return val
            }, [])
            return newList.slice( 0, 10 );
        }, [ searched, complaints, activePage, rowsPerPage ])
    
    useEffect(() => {
        ourFetch({
            api: '/all-complaints',
            callback: fetchCallback,
            setter: setComplaints
        })
    }, [])

    /**
     * Handle next & previous
     */
    const handlePagination = ( type ) => {
        if( type === 'next' ) {
            if( activePage >= totalPages.length ) return
            setActivePage( activePage + 1 )
        } else {
            if( activePage <= 1 ) return
            setActivePage( activePage - 1 )
        }
    }
    
    return <main className="cmg-main complaints" id="cmg-main">
        <div className='page-header'>

            <Breadcrumb
                headLabel = 'Complaints'
                currentPageLabel = 'Complaints'
                middle = { false }
            />

            <TodaysDate />

        </div>

        <RowAndSearch 
            rowsPerPage = { rowsPerPage }
            setRowsPerPage = { setRowsPerPage }
            setSearched = { setSearched }
        />

        <Table
            items = { filteredComplaints }
            setActiveComplaint = { setActiveComplaint }
        />

        <Pagination
            books = { filteredComplaints }
            totalPages = { totalPages }
            activePage = { activePage }
            setActivePage = { setActivePage }
            handlePagination = { handlePagination }
        />

        { formVisibility && Object.keys( activeComplaint ).length && <Popup
            complaint = { activeComplaint }
        /> }
    </main>
}

/**
 * MARK: TABLE
 */
const Table = ( props ) => {
    const Global = useContext( GLOBALCONTEXT ),
        { setOverlay, setHeaderOverlay, setFormVisibility } = Global,
        { convertedDate } = useDate(),
        { items, setActiveComplaint } = props

    /**
     * Handle View Click
     */
    const handleViewClick = ( item ) => {
        setActiveComplaint( item )
        setFormVisibility( true )
        setOverlay( true )
        setHeaderOverlay( true )
    }

    return <table className='table-wrapper' id="cmg-table">
        <thead>
            <tr>
                <th>S.No</th>
                <th>ID</th>
                <th>By</th>
                <th>Against</th>
                <th>Subject</th>
                <th>Registered Date</th>
                <th>Status</th>
                <th>View</th>
            </tr>
        </thead>
        <tbody>
            {
                items.length ? items.map(( item, index ) => {
                    let count = index + 1,
                        { id, complaintBy, by, profileBy,complaintAgainst, against, profileAgainst, date, subject, status } = item

                    return <tr key={ index }>
                        <td>{ `${ count }.` }</td>
                        <td>{ id }</td>
                        <td>
                            <div className='profile'>
                                <figure>
                                    <img src={ profileBy } alt={ complaintBy }/>
                                </figure>
                                <span className='name'><Link to="/dashboard/user-details" state={{ user: by }}>{ `${ complaintBy } ( ${ by } )` }</Link></span>
                            </div>
                        </td>
                        <td>
                            <div className='profile-two'>
                                <figure>
                                    <img src={ profileAgainst } alt={ complaintAgainst }/>
                                </figure>
                                <span className='name'><Link to="/dashboard/user-details" state={{ user: against }}>{ `${ complaintAgainst } ( ${ against } )` }</Link></span>
                            </div>
                        </td>
                        <td>{ subject }</td>
                        <td>{ convertedDate( date ) }</td>
                        <td>
                            <span className={ `status ${ status }` }>{ status.slice( 0, 1 ).toUpperCase() + status.slice( 1 ) }</span>
                        </td>
                        <td>
                            <button onClick={() => handleViewClick( item )}>View</button>
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
 * MARK: POPUP
 */
const Popup = ( props ) => {
    const { complaint } = props,
        { id, subject, message, file } = complaint,
        files = useMemo(() => {
            return file.split(",").map(item => item.trim());
        }, [ file ]),
        [ open, setOpen ] = useState( false )

    return <div className="full-complaint">
        <div className="head">
            <span className="id">
                <span>Complaint ID: </span>
                <span className="suffix">{ id }</span>
            </span>
            <span className="subject">{ subject }</span>
        </div>
        <div className="body">
            <p className="message">{ message }</p>
            { files.length && <ul className="files">
                {
                    files.map(( file, index ) => {
                        console.log( file )
                        return <li className="file" key={ index } onClick={() => setOpen( true )}>
                            <figure className="thumb-fig">
                                <img className="thumb" src={ file } alt="Image not found." />
                            </figure>
                            <div className="overlay">
                                <span>View</span>
                            </div>
                        </li>
                    })
                }
            </ul> }
            <Lightbox
                open = { open }
                close = {() => setOpen( false )}
                slides = { files.map(( file ) => {
                    return { src: file } 
                }) }
            />
        </div>
    </div>
}