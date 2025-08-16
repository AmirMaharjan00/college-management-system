import { useState, useEffect, useContext, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { TodaysDate } from '../includes/components-hooks'
import { GLOBALCONTEXT } from '../../App'
import { toWords } from 'number-to-words';
import CryptoJS from 'crypto-js';
import { ourFetch, getCurrentSelectValue, fetchCallback } from '../functions'
import Select from 'react-select'

const SECRET_KEY = '8gBm/:&EnhH.1/q';

export const StudentFees = () => {
    const Global = useContext( GLOBALCONTEXT ),
        { setOverlay, showPayFeesForm, setShowPayFeesForm, setHeaderOverlay, } = Global;
		
    let test = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]

    /**
     * Handle pay fees button click
     */
    const handlePayFeesClick = () => {
        setShowPayFeesForm( ! showPayFeesForm )
        setOverlay( true )
        setHeaderOverlay( true )
    }

    return <main className="cmg-main" id="cmg-main">
        <div className='student-fees-wrapper' id="student-fees-wrapper">
            <div className='fees-head'>
                <TodaysDate />
                <button className='pay-fees' onClick={ handlePayFeesClick }>Pay Fees</button>
            </div>
            <div className="table-section">
				<table className='table-wrapper'>
					<thead>
						<tr>
							<th>Receipt No.</th>
							<th>Name</th>
							<th>Date</th>
							<th>Amount</th>
							<th>Issued By</th>
							<th>Download Receipt</th>
						</tr>
					</thead>
					<tbody>
						{
							test.map(( key ) => {
								return <tr key={ key }>
									<td>Receipt No.</td>
									<td>Name</td>
									<td>Date</td>
									<td>Amount</td>
									<td>Issued By</td>
									<td className='download-receipt'><FontAwesomeIcon icon={ faDownload } /></td>
								</tr>
							})
						}
					</tbody>
				</table>
			</div>
            <div className='fees-total-wrapper'>
                This is total
            </div>
            { showPayFeesForm && <PayFees /> }
        </div>
    </main>
}

/**
 * Pay Fees
 * 
 * @since 1.0.0
 */
export const PayFees = ( props ) => {
	const Global = useContext( GLOBALCONTEXT ),
		{ loggedInUser, feeDetails, setFeeDetails } = Global,
		{ includeSelect } = props,
		{ role, id: userID, name, courseId, semester: _thisSem } = loggedInUser,
		[ students, setStudents ] = useState([]),
		[ priceInWords, setPriceInWords ] = useState( '' ),
		studentOptions = useMemo(() => {
			return students.reduce(( val, student ) => {
				let { id, name } = student
				val = [ ...val, { label: `${ name } ( ${ id } )`, value: id } ]
				return val
			}, [])
		}, [ students ]),
		isAdmin = useMemo(() => {
			if( role === 'admin' ) return true
			return false
		}, [ role ]),
		{ userId, amount, message, type, purpose, paymentMethod } = feeDetails,
		[ formData, setFormData ] = useState({
			tax_amount: 0,
			total_amount: amount,
			transaction_uuid: Math.floor(100000 + Math.random() * 900000).toString(),
			product_code: "EPAYTEST",
			product_service_charge: 0,
			product_delivery_charge: 0,
			success_url: 'http://localhost:5000/digital-payment/success',
			failure_url: 'http://localhost:5000/digital-payment/failure',
			signed_field_names: 'total_amount,transaction_uuid,product_code'
		}),
		{ tax_amount, total_amount, transaction_uuid, product_code, product_service_charge, product_delivery_charge, success_url, failure_url, signed_field_names } = formData,
		SECRET_KEY = '8gBm/:&EnhH.1/q',
		signature = useMemo(() => {
			const stringToSign = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`,
				rawSignature = CryptoJS.HmacSHA256(stringToSign, SECRET_KEY );
			return CryptoJS.enc.Base64.stringify(rawSignature);
		}, [ amount, transaction_uuid ] )

	useEffect(() => {
		if( isAdmin ) {
			ourFetch({
				api: '/students-only',
				callback: fetchCallback,
				setter: setStudents
			})
		}
	}, [])

	useEffect(() => {
		setPriceInWords( toWords(amount || 0).toUpperCase() + ' ONLY' )
	}, [ amount ])

	const handleChange = ( e ) => {
		let name = e.target.name,
			value = e.target.value

		setFeeDetails({ 
			...feeDetails,
			[ name ]: value
		});
	};

	const handlePriceChange = (e) => {
		const amount = e.target.value;
		setFeeDetails((prev) => ({
			...prev,
			amount,
			priceInWords: toWords(amount || 0).toUpperCase() + ' ONLY'
		}));
	};

	const handleReactSelectChange = ( option ) => {
		setFeeDetails({
			...feeDetails,
			userId: option.value
		})
	}

	return (
		<div className='cmg-form-wrapper'>
			<form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
				<div className="form-head">
					<h2 className="form-title">College Fee Payment</h2>
					<span className="form-excerpt">Please fill in your fee details below.</span>
				</div>
				{ includeSelect && <div className="form-field">
					<label className="form-label" htmlFor="feeType">Name <span className="form-error">*</span></label>
					<Select
						options = { studentOptions }
						className = 'react-select'
						name = 'userId'
						value = { getCurrentSelectValue( studentOptions, userId ) }
						onChange = { handleReactSelectChange }
					/>
				</div> }

				<div className="form-field">
					<label className="form-label" htmlFor="amount">Price <span className="form-error">*</span></label>
					<input required type="number" id="amount" name="amount" min="0" value={ amount } onChange={handlePriceChange} />
				</div>
				<div className="form-field">
					<label className="form-label" htmlFor="priceInWords">Price in Words <span className="form-error">*</span></label>
					<input required type="text" id="priceInWords" name="priceInWords" value={ priceInWords } onChange={handleChange} readOnly />
				</div>

				<div className="form-field">
					<label className="form-label" htmlFor="message">Remarks (Optional)</label>
					<textarea id="message" name="message" value={ message } onChange={handleChange}></textarea>
				</div>

				<div className="form-field">
					<label className="form-label">Payment Method <span className="form-error">*</span></label>
					<select name='paymentMethod' id='paymentMethod' value={ paymentMethod } onChange={handleChange} required>
						<option value=''>Select</option>
						<option value='esewa'>eSewa</option>
						<option value='khalti'>Khalti</option>
						<option value='bank'>Bank Transfer</option>
					</select>
				</div>
				<input type="hidden" name="tax_amount" value={ tax_amount } required />
				<input type="hidden" name="total_amount" value={ total_amount } required />
				<input type="hidden" name="transaction_uuid" value={ transaction_uuid } required />
				<input type="hidden" name="product_code" value={ product_code } required />
				<input type="hidden" name="product_service_charge" value={ product_service_charge } required />
				<input type="hidden" name="product_delivery_charge" value={ product_delivery_charge } required />
				<input type="hidden" name="success_url" value={ success_url } required />
				<input type="hidden" name="failure_url" value={ failure_url } required />
				<input type="hidden" name="signed_field_names" value={ signed_field_names } required />
				<input type="hidden" name="signature" value={ signature } required />
				<input value="Pay Now" className="submit-button" type="submit"/>
			</form>
		</div>
	);
};