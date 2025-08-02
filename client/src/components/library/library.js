import { useState, useEffect, useContext, createContext } from 'react'
import './library.scss'
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
        { formVisibility, currentBookId, setCurrentBookId, setFormVisibility, setDeleteBookVisibility, setOverlay, setHeaderOverlay } = globalObject,
        [ books, setBooks ] = useState([]),
        [ booksIssued, setBooksIssued ] = useState([]),
        [ booksReturned, setBooksReturned ] = useState([]),
        [ submitSuccess, setSubmitSuccess ] = useState( false ),
        [ fines, setFines ] = useState([]),
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
                    <button className="button-action add-student" onClick={ handleNewBook }>
                        <FontAwesomeIcon icon={ faCirclePlus } className='icon' />
                        <span>Add New Book</span>
                    </button>
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
            <div className='chart-preview-wrapper'>
                <LineChart />
                <LibrayPreview />
            </div>
            <QuickLinks />
            <NewBookForm
                formMode = 'new'
                setSubmitSuccess = { setSubmitSuccess }
            />
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
                    return <div className="list">
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