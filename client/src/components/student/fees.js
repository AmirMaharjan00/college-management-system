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
    return <div className='pay-fees-wrapper'>
        <form id="student-pay-fees">
            <div class="form-head">
                <h2 class="form-title">Receipt</h2>
                <span class="form-excerpt">Please pay your fees from here.</span>
            </div>
            <div class="form-field">
                <div class="form-field-label-wrapper">
                    <label class="form-label" for="price">Price</label>
                    <span class="form-error">*</span>
                </div>
                <input required="" type="number" value="" id="price" name="price" />
            </div>
            <div class="form-field">
                <div class="form-field-label-wrapper">
                    <label class="form-label" for="priceInWords">Price in Words</label>
                    <span class="form-error">*</span>
                </div>
                <input required="" type="text" value="" id="priceInWords" name="priceInWords" />
                <h2>test</h2>
            </div>
        </form>
    </div>
}