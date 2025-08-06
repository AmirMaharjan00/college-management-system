import { useEffect, useState, useMemo, useContext } from "react"
import { Breadcrumb, Pagination, RowAndSearch, ActionButton } from "../components"
import { fetchCallback, ourFetch, getScript } from "../functions"
import { useDate } from "../includes/hooks"
import '../assets/scss/table.scss'
import '../assets/scss/academic.scss'
import { AddNewCourseSubject } from '../forms/add-new-cs'
import { GLOBALCONTEXT } from "../../App"
import { TodaysDate } from "../includes/components-hooks"


/**
 * Examinations
 */
export const Examinations = () => {
    return <main className="cmg-main" id="cmg-main">
        
        <div className='page-header'>

            <Breadcrumb
                headLabel = 'Examination'
                currentPageLabel = 'Examination'
                middle = { false }
            />

            <TodaysDate />

        </div>

    </main>
}