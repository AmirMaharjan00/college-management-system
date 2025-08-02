import { Link } from "react-router-dom"

/**
 * MARK: BREADCRUMB
 */
export const Breadcrumb = ( props ) => {
    const { headLabel = 'Account', currentPageLabel = 'All Books' } = props
    return <div className="breadcrumb-wrapper">
        <h2 className="title">{ headLabel }</h2>
        <ul className="cmg-breadcrumb" id="cmg-breadcrumb">
            <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
            <li className="breadcrumb-item"><Link to="/dashboard/account">Account</Link></li>
            <li className="breadcrumb-item">{ currentPageLabel }</li>
        </ul>
    </div>
}