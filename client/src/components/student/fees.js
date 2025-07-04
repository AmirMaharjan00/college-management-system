import { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { TodaysDate } from '../includes/components-hooks'
import { GLOBALCONTEXT } from '../../App'

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
                        test.map(() => {
                            return <tr>
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
const PayFees = () => {
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
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Submitting Fee Form:', formData);
		// Call API or display confirmation
	};

	return (
		<div className='pay-fees-wrapper'>
			<form id="student-pay-fees" onSubmit={handleSubmit}>
				<div className="form-head">
					<h2 className="form-title">College Fee Payment</h2>
					<span className="form-excerpt">Please fill in your fee details below.</span>
				</div>

				{/* Program */}
				<div className="form-field">
					<label className="form-label" htmlFor="program">Program / Course <span className="form-error">*</span></label>
					<input required type="text" id="program" name="program" value={formData.program} onChange={handleChange} />
				</div>

				{/* Semester */}
				<div className="form-field">
					<label className="form-label" htmlFor="semester">Semester / Year <span className="form-error">*</span></label>
					<input required type="text" id="semester" name="semester" value={formData.semester} onChange={handleChange} />
				</div>

				{/* Fee Type */}
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

				{/* Amount */}
				<div className="form-field">
					<label className="form-label" htmlFor="price">Price <span className="form-error">*</span></label>
					<input required type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
				</div>

				{/* Price in Words */}
				<div className="form-field">
					<label className="form-label" htmlFor="priceInWords">Price in Words <span className="form-error">*</span></label>
					<input required type="text" id="priceInWords" name="priceInWords" value={formData.priceInWords} onChange={handleChange} />
				</div>

				{/* Remarks */}
				<div className="form-field">
					<label className="form-label" htmlFor="remarks">Remarks (Optional)</label>
					<textarea id="remarks" name="remarks" value={formData.remarks} onChange={handleChange}></textarea>
				</div>

				{/* Payment Method */}
				<div className="form-field">
					<label className="form-label">Payment Method <span className="form-error">*</span></label>
					<select name='paymentMethod' id='paymentMethod' value={formData.paymentMethod} onChange={handleChange} required>
						<option value=''>Select</option>
						<option value='esewa'>eSewa</option>
						<option value='khalti'>Khalti</option>
						<option value='bank'>Bank Transfer</option>
					</select>
				</div>

				{/* Submit Button */}
				<div className="form-field">
					<button type="submit" className="submit-button">Pay Now</button>
				</div>
			</form>
		</div>
	);
};