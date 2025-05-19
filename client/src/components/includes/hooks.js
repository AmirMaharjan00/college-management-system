import { useState, useEffect } from 'react'

/**
 * MARK: Get Full date
 */
export const useDate = () => {
    const [ seconds, setSeconds ] = useState( '' )
    let dateInstance = new Date(),
        day = String( dateInstance.getDate() ).padStart( 2, '0' ),
        month = String( dateInstance.getMonth() + 1 ).padStart( 2, '0' ), // Months are zero-based
        year = dateInstance.getFullYear(),
        hours = String( dateInstance.getHours() ).padStart( 2, '0' ),
        minutes = String( dateInstance.getMinutes() ).padStart( 2, '0' );
    
    useEffect(() => {
        setTimeout(() => {
            setSeconds( String( dateInstance.getSeconds() ).padStart( 2, '0' ) )
        }, 1000)
    })

    const getDate = () => {
        return `${ day }/${ month }/${ year }`
    }

    const getTime = () => {
        return `${ hours }: ${ minutes }: ${ seconds }`
    }

    return {
        getDate,
        getTime
    }
}