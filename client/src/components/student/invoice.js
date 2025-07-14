import logo from '../assets/images/sscollege-logo.png';

export const Invoice = () => {
    return <div className="invoice-section">
        <div className="invoice-wrapepr">
            <div className="invoice-sidebar">
                <h2 className="invoice-title">Receipt</h2>
            </div>
            <div className="invoice-main-wrap">
                <div className="invoice-heading">
                    <div className="invoice-logo-title-wrap">
                        <div className="logo">
                            <img className="college-logo" src={logo} alt="logo" />
                        </div>
                        <div className="invoice-college-info">
                            <h2>Shahid Smarak College</h2>
                            <p>Kirtipur-10, Nayabazar, Tel.:4330279, 4333937</p>
                            <p>Email: sscollege.kirtipur@gmail.com</p>
                            <p>Website: sscollegekirtipur.edu.np</p>
                        </div>
                    </div>
                    <div className="invoice-info">
                        <p className="receipt-no">Receipt No.:</p>
                        <p className="manual-bill-no">Manual Bill No.:</p>
                        <p className="date">Date:</p>
                        <p className="student-code">Student Code:</p>
                    </div>
                </div>
                <div className="invoice-std-info">
                    <div className="std-info-wrap">
                        <p clssName="info-label">Student's Name:</p>
                        <p className="info-label">Guradian:</p>
                        <p className="info-label">Class:</p>
                        <p className="info-label">Section:</p>
                        <p className="info-label">ID No.:</p>
                        <p className="info-label">Cash/Bank:</p>
                    </div>
                    <table className="payment-table">
                        <thead className="payment-table-header">
                            <tr className="payment-table-row">
                                <th className="payment-table-cell">Pre-Balance</th>
                                <th className="payment-table-cell">Amount Paid</th>
                                <th className="payment-table-cell">Balance Due</th>
                            </tr>
                        </thead>
                        <tr className="payment-table-row">
                            <td className="payment-table-cell">243500</td>
                            <td className="payment-table-cell">3000</td>
                            <td className="payment-table-cell">240500</td>
                        </tr>
                    </table>
                    <p className="amount-in-words">In Words:</p>
                    <p className="paid-upto">Paid Upto:</p>
                    <p className="payment-narration">Narration:</p>
                    <p className="signature-label">Accountant</p>
                </div>
            </div>
        </div>
    </div>
}