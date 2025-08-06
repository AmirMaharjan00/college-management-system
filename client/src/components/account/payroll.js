import { useEffect, useContext, useState, useMemo } from "react"
import { Breadcrumb, ActionButton } from "../components"
import { RowAndSearch, Pagination } from '../library/books'
import { fetchCallback, ourFetch, getCurrentSelectValue } from "../functions"
import { useDate } from "../includes/hooks"
import Select from 'react-select'
import { GLOBALCONTEXT } from "../../App"
import { Link } from "react-router-dom"

/**
 * Payroll
 */
export const Payroll = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { formVisibility, formSuccess, setFormSuccess, setFormVisibility, setOverlay, setHeaderOverlay } = Global,
        [ payrolls, setPayrolls ] = useState([]),
        [ searched, setSearched ] = useState( '' ),
        [ rowsPerPage, setRowsPerPage ] = useState( 10 ),
        [ activePage, setActivePage ] = useState( 1 ),
        [ formMode, setFormMode ] = useState( 'new' ),
        [ year, setYear ] = useState( 0 ),
        [ month, setMonth ] = useState( 0 ),
        totalPages = new Array( Math.ceil( payrolls.length / rowsPerPage ) ).fill( 0 ),
        filteredPayrolls = useMemo(() => {
            if( searched === '' ) {
                return payrolls.slice( ( activePage - 1 ) * rowsPerPage, ( activePage * rowsPerPage ) );
            }
            let newList = payrolls.reduce(( val, account ) => {
                let { name } = account
                if( name.toLowerCase().includes( searched ) ) {
                    val = [ ...val, account ]
                }
                return val
            }, [])
            return newList.slice( 0, 10 );
        }, [ searched, payrolls, activePage, rowsPerPage, year, month ])
    
    useEffect(() => {
        ourFetch({
            api: '/all-payrolls',
            callback: fetchCallback,
            setter: setPayrolls
        })
        if( formSuccess ) {
            setFormSuccess( false )
            setFormVisibility( false )
            setOverlay( false )
            setHeaderOverlay( false )
        }
    }, [ formSuccess ])
    
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

    return <main className="cmg-main payroll" id="cmg-main">

        <div className='page-header'>
                
            <Breadcrumb 
                headLabel = 'Payroll'
                currentPageLabel = 'Payroll'
            />

            <ActionButton
                setFormMode = { setFormMode }
                label = "Payroll"
            />

        </div>

        <RowAndSearch 
            rowsPerPage = { rowsPerPage }
            setRowsPerPage = { setRowsPerPage }
            setSearched = { setSearched }
        >
            <select className="payroll-select year">
                <option>All</option>
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
            </select>
            <select className="payroll-select month">
                <option value="0">All</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">Octumber</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
        </RowAndSearch>

        <Table
            filteredPayrolls = { filteredPayrolls }
        />

        <Pagination
            books = { filteredPayrolls }
            totalPages = { totalPages }
            activePage = { activePage }
            setActivePage = { setActivePage }
            handlePagination = { handlePagination }
        />

        { formVisibility && <PayrollForm /> }

    </main>
}

/**
 * MARK: TABLE
 */
const Table = ( props ) => {
    const { convertedDate } = useDate(),
        { filteredPayrolls } = props

    return <table className='table-wrapper' id="cmg-table">
        <thead>
            <tr>
                <th>S.No</th>
                <th>Transaction Id</th>
                <th>Name ( Id )</th>
                <th>Amount</th>
                <th>Message</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {
                filteredPayrolls.length ? filteredPayrolls.map(( account, index ) => {
                    let count = index + 1,
                        { id, userId, name, amount, message, date, profile } = account

                    return <tr key={ index }>
                        <td>{ `${ count }.` }</td>
                        <td>{ id }</td>
                        <td>
                            <div className='profile'>
                                <figure>
                                    <img src={ profile } alt={ name }/>
                                </figure>
                                <span className='name'><Link to="/dashboard/user-details" state={{ user: userId }}>{ `${ name } ( ${ userId } )` }</Link></span>
                            </div>
                        </td>
                        <td>{ `Rs. ${ amount }` }</td>
                        <td>{ message }</td>
                        <td>{ convertedDate( date ) }</td>
                    </tr>
                }) : <tr className="no-records">
                    <td colspan="6">No records</td>
                </tr>
            }
        </tbody>
    </table>
}

/**
 * MARK: PAYROLL
 */
export const PayrollForm = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { setFormSuccess } = Global,
        [ employees, setEmployees ] = useState([]),
        employeesOptions = useMemo(() => {
            return employees.reduce(( val, employee ) => {
                let { id, name } = employee
                val = [ ...val, { label: `${ name } ( ${ id } )`, value: id } ]
                return val
            }, [])
        }, [ employees ]),
        [ formData, setFormData ] = useState({
            employeeId: '',
            salary: 0,
            message: ''
        }),
        { employeeId, salary, message } = formData

    useEffect(() => {
        ourFetch({
            api: '/teachers-and-staffs',
            callback: fetchCallback,
            setter: setEmployees
        })
    }, [])

    /**
     * React select change handle
     */
    const handleReactSelectChange = ( option ) => {
        let { label, value } = option,
            slicedLabel = label.match(/^(.+?)\s*\(\s*(\d+)\s*\)$/),
            name = slicedLabel[ 1 ];

        setFormData({
            ...formData,
            employeeId: value,
            message: `Salary paid to ${ name }`
        })
    }

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
     * Handle Submit
     */
    const handleOnSubmit = ( event ) => {
        event.preventDefault()
        ourFetch({
            api: '/add-payroll',
            callback: formSubmitCallback,
            body: JSON.stringify({
                userId: employeeId,
                message,
                amount: salary
            })
        })
    }

    /**
     * Form Submit callback
     */
    const formSubmitCallback = ( data ) => {
        let { success } = data
        if( success ) setFormSuccess( true )
    }

    return <div className="cmg-form-wrapper">
        <form onSubmit={ handleOnSubmit }>
            <div className="form-head">
                <h2 className="form-title">Payroll</h2>
                <h2 className="form-excerpt">Please fill in the details below.</h2>
            </div>

            <div className="form-field">
                <label className="form-label">
                    Name
                    <span className="form-error">*</span>
                </label>
                <Select
                    options = { employeesOptions }
                    className = 'react-select'
                    name = 'bookId'
                    value = { getCurrentSelectValue( employeesOptions, employeeId ) }
                    onChange = { handleReactSelectChange }
                />
            </div>

            <div className="form-field">
                <label className="form-label">
                    Salary
                    <span className="form-error">*</span>
                </label>
                <input type="number" name="salary" value={ salary } onChange={ handleChange } required />
            </div>

            <input type="submit" value="Pay"/>
        </form>
    </div>
}