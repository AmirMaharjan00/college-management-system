import { useState, useContext, useEffect } from "react";
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
import { ourFetch, fetchCallback } from "../functions";

/**
 * Account
 */
export const Account = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { formVisibility } = Global,
        [ buttonIdentifier, setButtonIdentifier ] = useState( null ),
        [ formMode, setFormMode ] = useState( 'new' )

    let highlightsArray = {
        student: {
            label: 'Total Expenses',
            image: student,
            count: 0
        },
        teacher: {
            label: 'Total Income',
            image: teacher,
            count: 0
        },
        staff: {
            label: 'Pending Fees',
            image: staff,
            count: 0
        },
        course: {
            label: 'Pending Payroll',
            image: course,
            count: 0
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

        <div className="charts-wrapper">
            <LineChart 
                label = { 'Expenses (Rs.)' }
                title = { 'Expenses of 2025' }
            />
            <LineChart 
                label = { 'Incomes (Rs.)' }
                title = { 'Incomes of 2025' }
            />
            <DoughnutChart 
                label = { 'Fees (Rs.)' }
                title = { 'Paid Fees 2025' }
            />
        </div>

        <div className="preview-wrap">
            <ExpensePreview />
            <IncomePreview />
        </div>

        { formVisibility && ( buttonIdentifier === 'pay-fees' ) && <PayFees includeUser = { true }/> }
        { formVisibility && ( buttonIdentifier === 'payroll' ) && <Payroll /> }
    </main>
}

/**
 * MARK: EXPENSE PREVIEW
 */
const ExpensePreview = () => {
    return <div className="expense-preview-wrapper preview card">
        <div className="head">
            <h2 className="title">Expenses</h2>
        </div>
        <div className="body">
            <div className="item">
                <span className="count">1.</span>
                <div className="info">
                    <h2 className="title">Paying for books.</h2>
                    <span className="date">Paid on: 2025 - 06 - 11</span>
                </div>
                <span className="price">Rs. 1000</span>
            </div>
            <div className="item">
                <span className="count">1.</span>
                <div className="info">
                    <h2 className="title">Paying for books.</h2>
                    <span className="date">Paid on: 2025 - 06 - 11</span>
                </div>
                <span className="price">Rs. 1000</span>
            </div>
            <div className="item">
                <span className="count">1.</span>
                <div className="info">
                    <h2 className="title">Paying for books.</h2>
                    <span className="date">Paid on: 2025 - 06 - 11</span>
                </div>
                <span className="price">Rs. 1000</span>
            </div>
            <div className="item">
                <span className="count">1.</span>
                <div className="info">
                    <h2 className="title">Paying for books.</h2>
                    <span className="date">Paid on: 2025 - 06 - 11</span>
                </div>
                <span className="price">Rs. 1000</span>
            </div>
        </div>
        <div className="foot">
            <span className="label">Today's total expenses: </span>
            <span className="count">Rs. 10000</span>
        </div>
    </div>
}

/**
 * MARK: INCOME PREVIEW
 */
const IncomePreview = () => {
    return <div className="income-preview-wrapper preview card">
        <div className="head">
            <h2 className="title">Income</h2>
        </div>
        <div className="body">

        </div>
        <div className="foot">
            <span className="label">Today's total income: </span>
            <span className="count">Rs. 10000</span>
        </div>
    </div>
}

/**
 * MARK: PAYROLL
 */
const Payroll = () => {
    const [ employees, setEmployees ] = useState([])

    useEffect(() => {
        ourFetch({
            api: '/',
            callback: fetchCallback
        })
    }, [])

    /**
     * Handle Submit
     */
    const handleOnSubmit = ( event ) => {
        event.preventDefault()
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

            </div>
        </form>
    </div>
}