import { useState } from 'react'
import { Breadcrumb, ActionButtons, RowAndSearch } from "./books"
/**
 * MARK: Library Fines
 */
export const LibraryFines = () => {
    const [ formMode, setFormMode ] = useState( 'new' ),
        [ searched, setSearched ] = useState( '' ),
        [ rowsPerPage, setRowsPerPage ] = useState( 10 )

    return <main className="cmg-main cmg-library" id="cmg-main">
        <div className='page-header'>
            <Breadcrumb
                headLabel = 'Fines'
                currentPageLabel = 'All Fines'
            />
            <ActionButtons 
                setFormMode = { setFormMode }
                label = { 'Pay Fine' }
            />
        </div>
        <RowAndSearch 
            rowsPerPage = { rowsPerPage }
            setRowsPerPage = { setRowsPerPage }
            setSearched = { setSearched }
        />
    </main>
}