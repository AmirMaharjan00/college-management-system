import { useState, useContext, useEffect, useMemo } from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faChevronRight, faBookOpen, faBook, faRotateLeft, faSackDollar, } from '@fortawesome/free-solid-svg-icons';
import { ActionButton } from "../library/books"
import student from '../assets/images/student.png'
import teacher from '../assets/images/teacher.png'
import course from '../assets/images/course.png'
import staff from '../assets/images/staff.png'
import '../assets/scss/account.scss'
import '../assets/scss/form.scss'
import '../assets/scss/charts.scss'
import { LineChart, DoughnutChart } from '../charts'
import { PayFees } from '../student/fees'
import { GLOBALCONTEXT } from "../../App";
import { ourFetch, fetchCallback, getCurrentSelectValue } from "../functions";
import Select from 'react-select'
import { useDate } from "../includes/hooks";

/**
 * Account
 */
export const Account = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { formVisibility, formSuccess, setFormSuccess, setFormVisibility, setOverlay, setHeaderOverlay } = Global,
        [ buttonIdentifier, setButtonIdentifier ] = useState( null ),
        [ formMode, setFormMode ] = useState( 'new' ),
        [ allExpenses, setAllExpenses ] = useState([]),
        [ allIncomes, setAllIncomes ] = useState([]),
        [ highlights, setHighlights ] = useState({
            expenses: 0,
            income: 0,
            fees: 0,
            payroll: 0
        }),
        { expenses, income, fees, payroll } = highlights

    useEffect(() => {
        ourFetch({
            api: '/expenses',
            callback: fetchCallback,
            setter: setAllExpenses
        })
        ourFetch({
            api: '/income',
            callback: fetchCallback,
            setter: setAllIncomes
        })
        ourFetch({
            api: '/expenses-income',
            callback: highlightCallback
        })
        ourFetch({
            api: '/paid-fees',
            callback: paidFeesCallback
        })
        ourFetch({
            api: '/monthly-payroll',
            callback: monthlyPayrollCallback
        })
        if( formSuccess ) {
            setFormSuccess( false )
            setButtonIdentifier( null )
            setFormVisibility( false )
            setOverlay( false )
            setHeaderOverlay( false )
        }
    }, [ formSuccess ])

    /**
     * Highlight callback
     */
    const highlightCallback = ( data ) => {
        let { result, success } = data
        if( success ) {
            let newValue = result.reduce(( val, item ) => {
                let { type, total } = item
                val = { ...val, [ type ]: total }
                return val
            }, {})
            setHighlights(( prev ) => {
                return {
                    ...prev,
                    ...newValue
                }
            })
        }
    }

    /**
     * Paid Fees callback
     */
    const paidFeesCallback = ( data ) => {
        let { result, success } = data
        if( success ) {
            setHighlights(( prev ) => {
                return {
                    ...prev,
                    fees: result.unpaid
                }
            })
        }
    }

    /**
     * Monthly payroll callback
     */
    const monthlyPayrollCallback = ( data ) => {
        let { result, success } = data
        if( success ) {
            setHighlights(( prev ) => {
                return {
                    ...prev,
                    payroll: result.total
                }
            })
        }
    }

    let highlightsArray = {
        expenses: {
            label: 'Total Expenses (Yearly)',
            image: student,
            count: expenses
        },
        income: {
            label: 'Total Income (Yearly)',
            image: teacher,
            count: income
        },
        fees: {
            label: 'have not paid fees',
            image: staff,
            count: `${ fees } Students`
        },
        payroll: {
            label: 'have not received payroll this month',
            image: course,
            count: `${ payroll } Employees`
        }
    }

    return <main className="cmg-main cmg-account" id="cmg-main">
        <div className="dashboard-head">
            <div className="dashboard-intro">
                <h2 className="user-name">Manage Acounts</h2>
                <ul className="cmg-breadcrumb" id="cmg-breadcrumb">
                    <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item">Account</li>
                </ul>
            </div>
            <div className="action-buttons">

                <ActionButton
                    setFormMode = { setFormMode }
                    label = "Pay Fees"
                    extendFunction = {() => setButtonIdentifier( 'pay-fees' )}
                />

                <ActionButton
                    setFormMode = { setFormMode }
                    label = "Payroll"
                    extendFunction = {() => setButtonIdentifier( 'payroll' )}
                />

            </div>
        </div>{/* .dashboard-head */}
        <div className="dashboard-highlights">
            {
                Object.entries( highlightsArray ).map(([ id, values ]) => {
                    let { label, image, count } = values,
                        prefix = ( [ 'fees', 'payroll' ].includes( id ) ) ? '' : 'Rs. '

                    return <div className={ `highlight ${id}` } key={ id }>
                        <div className="highlight-head">
                            <figure className="highlight-thumb"><img src={ image } alt={ id } /></figure>
                            <div className="highlight-info">
                                <span className="count total-count">{ `${ prefix }${ count }` }</span>
                                <span className="label highlight-label">{ label }</span>
                            </div>
                        </div>
                        <div className="highlight-foot">
                            <div className="old-wrapper">
                                <span className="old-label">{ 'Old: ' }</span>
                                <span className="old-count">{ 0 }</span>
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

        <div className="charts-wrapper">
            <LineChart
                api = '/year-expenses'
                label = { 'Expenses (Rs.)' }
                title = { 'Expenses of 2025' }
            />
            <LineChart
                api = '/year-income'
                label = { 'Incomes (Rs.)' }
                title = { 'Incomes of 2025' }
            />
            <DoughnutChart 
                api = '/paid-fees'
                label = { 'Fees (Rs.)' }
                title = { 'Paid Fees 2025' }
            />
        </div>

        <div className="preview-wrap">
            <ExpensePreview 
                array = { allExpenses }
            />
            <IncomePreview 
                array = { allIncomes }
            />
        </div>

        { formVisibility && ( buttonIdentifier === 'pay-fees' ) && <PayFees includeUser = { true }/> }
        { formVisibility && ( buttonIdentifier === 'payroll' ) && <Payroll /> }
    </main>
}

/**
 * MARK: EXPENSE PREVIEW
 */
const ExpensePreview = ( props ) => {
    const { convertedDate } = useDate(),
        { array } = props,
        [ todayExpense, setTodayExpense ] = useState({
            total: 0
        })

    useEffect(() => {
        ourFetch({
            api: '/today-expense',
            callback: fetchCallback,
            setter: setTodayExpense
        })
    }, [])

    return <div className="expense-preview-wrapper preview card">
        <div className="head">
            <h2 className="title">Expenses</h2>
        </div>
        <div className="body">
            {
                array.map(( expense, index ) => {
                    let { amount, date, message } = expense,
                        count = index + 1
                    return <div className="item" key={ index }>
                        <span className="count">{ `${ count }.` }</span>
                        <div className="info">
                            <span className="title">{ message }</span>
                            <span className="date">{ ` on ${ convertedDate( date ) }` }</span>
                        </div>
                        <span className="price">{ `Rs. ${ amount }` }</span>
                    </div>
                })
            }
        </div>
        <div className="foot">
            <span className="label">Today's total expenses: </span>
            <span className="count">{ `Rs. ${ todayExpense.total }` }</span>
        </div>
    </div>
}

/**
 * MARK: INCOME PREVIEW
 */
const IncomePreview = ( props ) => {
    const { convertedDate } = useDate(),
        { array } = props,
        [ todayIncome, setTodayIncome ] = useState({
            total: 0
        })

    useEffect(() => {
        ourFetch({
            api: '/today-income',
            callback: fetchCallback,
            setter: setTodayIncome
        })
    }, [])

    return <div className="income-preview-wrapper preview card">
        <div className="head">
            <h2 className="title">Income</h2>
        </div>
        <div className="body">
            {
                array.map(( income, index ) => {
                    let { amount, date, message } = income,
                        count = index + 1
                    return <div className="item" key={ index }>
                        <span className="count">{ `${ count }.` }</span>
                        <div className="info">
                            <span className="title">{ message }</span>
                            <span className="date">{ ` on ${ convertedDate( date ) }` }</span>
                        </div>
                        <span className="price">{ `Rs. ${ amount }` }</span>
                    </div>
                })
            }
        </div>
        <div className="foot">
            <span className="label">Today's total income: </span>
            <span className="count">{ `Rs. ${ todayIncome.total }` }</span>
        </div>
    </div>
}

/**
 * MARK: PAYROLL
 */
const Payroll = () => {
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
            api: '/payroll',
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