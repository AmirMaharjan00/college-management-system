import { useState, useEffect, useContext, createContext, useCallback, useMemo } from 'react'
import './library.scss'
import '../assets/scss/table.scss'
import { Link } from 'react-router-dom'
import student from '../assets/images/student.png'
import teacher from '../assets/images/teacher.png'
import course from '../assets/images/course.png'
import staff from '../assets/images/staff.png'
import { ourFetch, fetchCallback } from '../functions'
import { Line } from 'react-chartjs-2';
import { useDate } from '../includes/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faChevronRight, faBookOpen, faBook, faRotateLeft, faSackDollar, } from '@fortawesome/free-solid-svg-icons';
import { GLOBALCONTEXT } from '../../App'
import { NewBookForm } from './books'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ActionButton } from '../components'

// Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LibraryContext = createContext();

/**
 * Library
 */
export const Library = () => {
    const globalObject = useContext( GLOBALCONTEXT ),
        { loggedInUser, setFormVisibility, setOverlay, setHeaderOverlay } = globalObject,
        { role } = loggedInUser,
        [ books, setBooks ] = useState([]),
        [ booksIssued, setBooksIssued ] = useState([]),
        [ booksReturned, setBooksReturned ] = useState([]),
        [ submitSuccess, setSubmitSuccess ] = useState( false ),
        [ fines, setFines ] = useState([]),
        [ formMode, setFormMode ] = useState([]),
        libraryObject = {
            books,
            booksIssued,
            booksReturned,
            fines
        }

    useEffect(() => {
        ourFetch({
            api: '/all-books',
            callback: fetchCallback,
            setter: setBooks
        })
        ourFetch({
            api: '/all-books-issued',
            callback: fetchCallback,
            setter: setBooksIssued
        })
        ourFetch({
            api: '/books-returned',
            callback: fetchCallback,
            setter: setBooksReturned
        })
        ourFetch({
            api: '/books-fined',
            callback: fetchCallback,
            setter: setFines
        })
    }, [])

    let highlightsArray = {
        student: {
            label: 'Total Books',
            image: student,
            count: books.length
        },
        teacher: {
            label: 'Total Issues',
            image: teacher,
            count: booksIssued.length
        },
        staff: {
            label: 'Total Returned',
            image: staff,
            count: booksReturned.length
        },
        course: {
            label: 'Total Fines',
            image: course,
            count: fines.length
        }
    }

    /**
     * Handle New Book click
     */
    const handleNewBook = () => {
        setFormVisibility( true )
        setOverlay( true )
        setHeaderOverlay( true )
    }

    return <main className="cmg-main cmg-library" id="cmg-main">
        <LibraryContext.Provider value={ libraryObject }>
            <div className="dashboard-head">
                <div className="dashboard-intro">
                    <h2 className="user-name">Manage Library</h2>
                    <ul className="cmg-breadcrumb" id="cmg-breadcrumb">
                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                        <li className="breadcrumb-item">Library</li>
                    </ul>
                </div>
                <div className="dashboard-actions">
                    <ActionButton
                        setFormMode = { setFormMode }
                        label = { ( role === 'admin' ) ? "Add New Book" : "Check Book Availability" }
                    />
                </div>
            </div>{/* .dashboard-head */}
            <div className="dashboard-highlights">
                {
                    Object.entries( highlightsArray ).map(([ id, values ]) => {
                        let { label, image, count } = values
                        return <div className={ `highlight ${id}` } key={ id }>
                            <div className="highlight-head">
                                <figure className="highlight-thumb"><img src={ image } alt={ id } /></figure>
                                <div className="highlight-info">
                                    <span className="count total-count">{ count }</span>
                                    <span className="label highlight-label">{ label }</span>
                                </div>
                            </div>
                            <div className="highlight-foot">
                                <div className="old-wrapper">
                                    <span className="old-label">{ 'Old: ' }</span>
                                    <span className="old-count">{ count }</span>
                                </div>
                                <div className="new-wrapper">
                                    <span className="new-label">{ 'New: ' }</span>
                                    <span className="new-count">{ 0 }</span>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
           { ( role === 'admin' ) && <>
                <div className='chart-preview-wrapper'>
                    <LineChart />
                    <LibrayPreview />
                </div>
                <QuickLinks />
                <NewBookForm
                    formMode = 'new'
                    setSubmitSuccess = { setSubmitSuccess }
                />
           </> }
           {
                ( role === 'student' ) && <>
                    <Student />
                </>
           }
        </LibraryContext.Provider>
    </main>
}

/**
 * MARK: Line Chart
 */
const LineChart = () => {
    const [ monthlyFines, setMonthlyFines ] = useState([]),
        months = monthlyFines.reduce(( value, fine ) => {
            let { month, total } = fine
            value = { ...value, [ month ]: total }
            return value;
        }, {}),
        labels = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

    useEffect(() => {
        ourFetch({
            api: '/library-fines-monthwise',
            callback: fetchCallback,
            setter: setMonthlyFines
        })
    }, [])

    const data = {
        labels,
        datasets: [{
            label: 'Fines Collected (Rs)',
            data: labels.map(( month ) => {
                if( month in months ) {
                    return months[ month ]
                } else {
                    return 0
                }
            }),
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
            tension: 0.3,
        }],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: 'Monthly Fines Collected in 2025',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month',
                },
            },
        },
    };

    return <div className="library-line-chart card">
        <Line data={data} options={options} />
    </div>
};

/**
 * MARK: LIBRARY PREVIEW
 */
const LibrayPreview = () => {
    const libraryObject = useContext( LibraryContext ),
        { books, booksIssued, booksReturned } = libraryObject,
        [ currentTab, setCurrentTab ] = useState( 'books' ),
        [ currentList, setCurrentList ] = useState( books ),
        [ prefix, setPrefix ] = useState( 'published by' ),
        [ datePrefix, setDatePrefix ] = useState( 'Published on' ),
        { convertedDate } = useDate()

    useEffect(() => {
        let listArray = [],
            newPrefix = '',
            newDatePrefix = '';
        switch( currentTab ) {
            case 'books':
                listArray = books.reduce(( value, book ) => {
                    let { name, publication, publishedYear } = book
                    value = [ ...value, {
                        name,
                        detail: publication,
                        date: publishedYear
                    }]
                    return value
                }, [])
                newPrefix = 'published by'
                newDatePrefix = 'Published on'
                break;
            case 'issues':
                listArray = booksIssued.reduce(( value, book ) => {
                    let { bookId, issuedDate, name } = book
                    value = [ ...value, {
                        name: getBookName( bookId ),
                        detail: name,
                        date: issuedDate
                    }]
                    return value
                }, [])
                newPrefix = 'issued by'
                newDatePrefix = 'Issued on'
                break;
            case 'returns':
                listArray = booksReturned.reduce(( value, book ) => {
                    let { bookId, returnDate, name } = book
                    value = [ ...value, {
                        name: getBookName( bookId ),
                        detail: name,
                        date: returnDate
                    }]
                    return value
                }, [])
                newPrefix = 'returned by'
                newDatePrefix = 'Returned on'
                break;
        }
        setPrefix( newPrefix )
        setDatePrefix( newDatePrefix )
        setCurrentList( listArray )
    }, [ currentTab, books, booksIssued, booksReturned ])

    /**
     * Get book name
     */
    const getBookName = ( bookId ) => {
        return books.reduce(( value, book ) => {
            let { id, name } = book
            if( bookId === id ) value = name
            return value
        }, '')
    }
    
    /**
     * Handle Tab click
     */
    const handleTabClick = ( tab ) => {
        setCurrentTab( tab )
    }

    return <div className='library-preview card' id="library-preview">
        <ul className='head'>
            <li className={ `head-item${( currentTab === 'books' ? ' active': '')}` } onClick={() => handleTabClick( 'books' ) }>Books</li>
            <li className={ `head-item${( currentTab === 'issues' ? ' active': '')}` } onClick={() => handleTabClick( 'issues' ) }>Issues</li>
            <li className={ `head-item${( currentTab === 'returns' ? ' active': '')}` } onClick={() => handleTabClick( 'returns' ) }>Returns</li>
        </ul>
        <div className='body'>
            {
                currentList.map(( item, index ) => {
                    if( index > 3 ) return
                    let count = index + 1,
                        { name, detail, date } = item
                    return <div className="list" key={ index }>
                        <span className='count'>{ `${ count }.` }</span>
                        <div className="name-wrapper">
                            <span className="name">{ name }</span>
                            <span className="detail">{ `${ prefix } ${ detail }` }</span>
                        </div>
                        <div className="date-wrapper">{ date ? <><span className='prefix'>{ datePrefix }</span><span className='date'>{ convertedDate( date ) }</span></> : '' }</div>
                    </div>
                })
            }
        </div>
    </div>
}

/**
 * MARK: Quick Links
 */
const QuickLinks = () => {
    return <div className='quick-links'>
        <Link to="/dashboard/library/books" className='link card'>
            <span className='link-icon'><FontAwesomeIcon icon={ faBook } /></span>
            <span className="link-label">Books</span>
            <span className="link-view-more"><FontAwesomeIcon icon={ faChevronRight } /></span>
        </Link>
        <Link to="/dashboard/library/issued" className='link card'>
            <span className='link-icon'><FontAwesomeIcon icon={ faBookOpen } /></span>
            <span className="link-label">Issued Books</span>
            <span className="link-view-more"><FontAwesomeIcon icon={ faChevronRight } /></span>
        </Link>
        <Link to="/dashboard/library/returned" className='link card'>
            <span className='link-icon'><FontAwesomeIcon icon={ faRotateLeft } /></span>
            <span className="link-label">Returned Books</span>
            <span className="link-view-more"><FontAwesomeIcon icon={ faChevronRight } /></span>
        </Link>
        <Link to="/dashboard/library/fines" className='link card'>
            <span className='link-icon'><FontAwesomeIcon icon={ faSackDollar } /></span>
            <span className="link-label">Fines</span>
            <span className="link-view-more"><FontAwesomeIcon icon={ faChevronRight } /></span>
        </Link>
    </div>
}

/**
 * MARK: Student Library
 */
const Student = () => {
    const [ books, setBooks ] = useState([]),
        [ tab, setTab ] = useState( 'current-issued' ),
        [ searched, setSearched ] = useState( '' ),
        tabClasses = useCallback(( _thisTab ) => {
            return `tab${( _thisTab === tab ) ? ' active': '' }`
        }, [ tab ]),
        filteredBooks = useMemo(() => {
            let newStatus = '',
                newList = []

            switch( tab ) {
                case 'all-issued' :
                    newStatus = 'all'
                    break;
                case 'current-issued' :
                    newStatus = 'issued'
                    break;
                case 'returned' :
                    newStatus = 'returned'
                    break;
                case 'fines' :
                    newStatus = 'overdue'
                    break;
            }
            if( newStatus === 'all' ) {
                newList = books
            } else {
                newList = books.reduce(( val, book ) => {
                    let { status } = book
                    if( status === newStatus ) val = [ ...val, book ] 
                    return val
                }, [])
            }
            return newList.reduce(( val, book ) => {
                let { name } = book
                if( name.includes( searched ) ) val = [ ...val, book ]
                return val
            }, [])
        }, [ tab, searched, books ])

    useEffect(() => {
        ourFetch({
            api: '/my-books',
            callback: fetchCallback,
            setter: setBooks
        })
    }, [])

    return <div className='student-library-wrapper'>
        
            <div className="head">
                <ul className="tabs">
                    <li className={ tabClasses( 'all-issued' ) } onClick={() => setTab( 'all-issued' )}>All Issued</li>
                    <li className={ tabClasses( 'current-issued' ) } onClick={() => setTab( 'current-issued' )}>Current Issued</li>
                    <li className={ tabClasses( 'returned' ) } onClick={() => setTab( 'returned' )}>Returned</li>
                    <li className={ tabClasses( 'fines' ) } onClick={() => setTab( 'fines' )}>Fines</li>
                </ul>

                <input type="search" className="head-search" placeholder="Search..." value={ searched } onChange={( event ) => setSearched( event.target.value )}/>

                {/* { ( role === 'admin' ) && <ActionButton
                    setFormMode = { setFormMode }
                    label = "New Exam"
                    extendFunction = {() => setFormType( 'form' )}
                /> } */}

            </div>

            <Table
                items = { filteredBooks }
                // setFormMode = { setFormMode }
                // currentDropdownId = { currentDropdownId }
                // setCurrentDropdownId = { setCurrentDropdownId }
                // setFormType = { setFormType }
            />

    </div>
}

/**
 * MARK: TABLE
 */
const Table = ( props ) => {
    const { items } = props,
        { convertedDate } = useDate()

    return <div className='student-table-wrapper'>
        <table className='table-wrapper' id='cmg-table'>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Book Name</th>
                    <th>Issued By</th>
                    <th>Issued Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.length ? items.map(( item, index ) => {
                        let count = index + 1,
                            { id, name, issuedBy, issuedDate, issuer, profile } = item
                        return <tr>
                            <td>{ `${ count }.` }</td>
                            <td>{ `${ name } ( ${ id } )` }</td>
                            <td>
                                <div className='profile'>
                                    <figure>
                                        <img src={ profile } alt={ issuer }/>
                                    </figure>
                                    <span className='name'><Link to="/dashboard/user-details" state={{ user: issuedBy }}>{ `${ issuer } ( ${ issuedBy } )` }</Link></span>
                                </div>
                            </td>
                            <td>{ convertedDate( issuedDate ) }</td>
                        </tr>
                    }) : <tr className="no-records">
                        <td colSpan="4">No records</td>
                    </tr>
                }
            </tbody>
        </table>
    </div>
}