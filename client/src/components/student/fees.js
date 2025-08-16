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
export const PayFees = () => {
	const Global = useContext( GLOBALCONTEXT ),
		{ loggedInUser } = Global,
		{ role, id: userID, name, courseId, semester: _thisSem } = loggedInUser,
		[ students, setStudents ] = useState([]),
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
		[formData, setFormData] = useState({
			studentName: isAdmin ? '' : name,
			studentId: isAdmin ? '' : userID,
			course: isAdmin ? '' : courseId,
			semester: isAdmin ? '' : _thisSem,
			feeType: '',
			paymentMethod: '',
			price: '',
			priceInWords: '',
			remarks: '',
			successUrl: 'https://developer.esewa.com.np/success',
			failureUrl: 'https://developer.esewa.com.np/failure',
		}),
		{ studentName, studentId, program, semester, feeType, paymentMethod, price, priceInWords, remarks, successUrl, failureUrl } = formData,
		transactionUuid = Math.floor(100000 + Math.random() * 900000).toString(),
		SECRET_KEY = '8gBm/:&EnhH.1/q',
		signature = useMemo(() => {
			const stringToSign = `total_amount=${price},transaction_uuid=${transactionUuid},product_code=EPAYTEST`,
				rawSignature = CryptoJS.HmacSHA256(stringToSign, SECRET_KEY );
			return CryptoJS.enc.Base64.stringify(rawSignature);
		}, [ price, transactionUuid ] )

	useEffect(() => {
		if( isAdmin ) {
			ourFetch({
				api: '/students-only',
				callback: fetchCallback,
				setter: setStudents
			})
		}
	}, [])

	const handleChange = ( e ) => {
		let name = e.target.name,
			value = e.target.value

		setFormData({ 
			...formData,
			[ name ]: value
		});
	};

	const handlePriceChange = (e) => {
		const price = e.target.value;
		setFormData((prev) => ({
			...prev,
			price,
			priceInWords: toWords(price || 0).toUpperCase() + ' ONLY'
		}));
	};

	const handleReactSelectChange = ( option ) => {
		setFormData({
			...formData,
			studentId: option.value
		})
	}

	return (
		<div className='cmg-form-wrapper'>
			<form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
				<div className="form-head">
					<h2 className="form-title">College Fee Payment</h2>
					<span className="form-excerpt">Please fill in your fee details below.</span>
				</div>
				{ isAdmin && <div className="form-field">
					<label className="form-label" htmlFor="feeType">Name <span className="form-error">*</span></label>
					<Select
						options = { studentOptions }
						className = 'react-select'
						name = 'studentId'
						value = { getCurrentSelectValue( studentOptions, studentId ) }
						onChange = { handleReactSelectChange }
					/>
				</div> }

				<div className="form-field">
					<label className="form-label" htmlFor="price">Price <span className="form-error">*</span></label>
					<input required type="number" id="price" name="price" min="0" value={ price } onChange={handlePriceChange} />
				</div>
				<div className="form-field">
					<label className="form-label" htmlFor="priceInWords">Price in Words <span className="form-error">*</span></label>
					<input required type="text" id="priceInWords" name="priceInWords" value={formData.priceInWords} onChange={handleChange} readOnly />
				</div>

				<div className="form-field">
					<label className="form-label" htmlFor="remarks">Remarks (Optional)</label>
					<textarea id="remarks" name="remarks" value={formData.remarks} onChange={handleChange}></textarea>
				</div>

				<div className="form-field">
					<label className="form-label">Payment Method <span className="form-error">*</span></label>
					<select name='paymentMethod' id='paymentMethod' value={formData.paymentMethod} onChange={handleChange} required>
						<option value=''>Select</option>
						<option value='esewa'>eSewa</option>
						<option value='khalti'>Khalti</option>
						<option value='bank'>Bank Transfer</option>
					</select>
				</div>
				<input type="hidden" name="amount" value={ '' } required />
				<input type="hidden" name="tax_amount" value="0" required />
				<input type="hidden" name="total_amount" value={''} required />
				<input type="hidden" name="transaction_uuid" value={''} required />
				<input type="hidden" name="product_code" value="EPAYTEST" required />
				<input type="hidden" name="product_service_charge" value="0" required />
				<input type="hidden" name="product_delivery_charge" value="0" required />
				<input type="hidden" name="success_url" value="https://developer.esewa.com.np/success" required />
				<input type="hidden" name="failure_url" value="https://developer.esewa.com.np/failure" required />
				<input type="hidden" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required />
				<input type="hidden" name="signature" value={ '' } required />
				<input value="Pay Now" className="submit-button" type="submit"/>
			</form>
		</div>
	);
};