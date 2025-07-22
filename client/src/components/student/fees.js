import { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { TodaysDate } from '../includes/components-hooks'
import { GLOBALCONTEXT } from '../../App'
import { toWords } from 'number-to-words';
import CryptoJS from 'crypto-js';
import { ourFetch } from '../functions'

const SECRET_KEY = 'college-management-system-secret-key'

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
	const [formData, setFormData] = useState({
		studentName: '',
		studentId: '',
		program: '',
		semester: '',
		feeType: '',
		paymentMethod: '',
		price: '',
		priceInWords: '',
		remarks: '',
		successUrl: 'https://developer.esewa.com.np/success',
		failureUrl: 'https://developer.esewa.com.np/failure',
		signature: ''
	}),
	{ studentName, studentId, program, semester, feeType, paymentMethod, price, priceInWords, remarks, successUrl, failureUrl, signature } = formData

	function generateRandomString() {
		const strings = "jdkfjakfjdkjj34kj23i42i4u23i4u23i423u4i";
		let code = "";
		let length = 25;
		for (let i = 0; i < length; i++) {
			code += strings[Math.floor(Math.random() * strings.length)];
		}
		return code;
	}

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		let bodyParams = {}
		if( paymentMethod === 'esewa' ) {
			let transactionUUid = generateRandomString(),
				signaturePayload = `total_amount=110,transaction_uuid=${ transactionUUid },product_code=EPAYTEST`,
				rawSignature = CryptoJS.HmacSHA256( signaturePayload, SECRET_KEY ),
				signature = CryptoJS.enc.Base64.stringify( rawSignature );
	
			bodyParams = {
				amount: "100",
				failure_url: "https://developer.esewa.com.np/failure",
				product_delivery_charge: "0",
				product_service_charge: "0",
				product_code: "EPAYTEST",
				signature,
				signed_field_names: "total_amount,transaction_uuid,product_code",
				success_url: "https://developer.esewa.com.np/success",
				tax_amount: "10",
				total_amount: "110",
				transaction_uuid: "241028"
			}
		} else {
			bodyParams = {
				"return_url": "http://example.com/",
				"website_url": "https://example.com/",
				"amount": "1000",
				"purchase_order_id": "Order01",
				"purchase_order_name": "test",
				"customer_info": {
					"name": "Ram Bahadur",
					"email": "test@khalti.com",
					"phone": "9800000001"
				}
			}
		}
		ourFetch({
			api: '/payment-gateway',
			callback: testCallback,
			body: JSON.stringify( bodyParams )
		})
	};

	const testCallback = ( data ) => {
		console.log( data )
	}

	const handlePriceChange = (e) => {
		const price = e.target.value;
		setFormData((prev) => ({
			...prev,
			price,
			priceInWords: toWords(price || 0).toUpperCase() + ' ONLY'
		}));
	};

	return (
		<div className='pay-fees-wrapper'>
			<form id="student-pay-fees" onSubmit={ handleSubmit }>
				<div className="form-head">
					<h2 className="form-title">College Fee Payment</h2>
					<span className="form-excerpt">Please fill in your fee details below.</span>
				</div>

				<div className="form-field">
					<label className="form-label" htmlFor="feeType">Fee Type <span className="form-error">*</span></label>
					<select required id="feeType" name="feeType" value={formData.feeType} onChange={handleChange}>
						<option value="">Select Type</option>
						<option value="tuition">Tuition</option>
						<option value="hostel">Hostel</option>
						<option value="library">Library</option>
						<option value="exam">Exam</option>
					</select>
				</div>

				<div className="form-field">
					<label className="form-label" htmlFor="price">Price <span className="form-error">*</span></label>
					<input required type="number" id="price" name="price" min="0" value={formData.price} onChange={handlePriceChange} />
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

				<div className="form-field">
					<input value="Pay Now" className="submit-button" type="submit"/>
				</div>
			</form>
		</div>
	);
};