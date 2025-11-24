import { Breadcrumb, Pagination, ActionButton, ActionButtonDropdown } from "../components"
import { TodaysDate } from "../includes/components-hooks"
/**
 * Home Work
 */
export const HomeWork = () => {
    return <main className="cmg-main" id="cmg-main">
        <div className='page-header'>
        
            <Breadcrumb
                headLabel = 'Homework'
                currentPageLabel = 'Homework'
                middle = { false }
            />

            <TodaysDate />

        </div>
        <h2>Coming Soon.</h2>
    </main>
}