import { Breadcrumb, Pagination, ActionButton, ActionButtonDropdown } from "../components"
import { TodaysDate } from "../includes/components-hooks"
/**
 * Result
 */
export const Results = () => {
    return <main className="cmg-main" id="cmg-main">
        <div className='page-header'>
        
            <Breadcrumb
                headLabel = 'Results'
                currentPageLabel = 'Results'
                middle = { false }
            />

            <TodaysDate />

        </div>
        <h2>Coming Soon...</h2>
        <span>Be patient.</span>
    </main>
}