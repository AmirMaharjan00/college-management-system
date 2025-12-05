import { useState, useEffect } from 'react'
import { getScript } from '../functions'

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
    }, [])

    const getDate = () => {
        return `${ day }/${ month }/${ year } ${ getDay( dateInstance.getDay() ) }`
    }

    const getTime = () => {
        return `${ hours }: ${ minutes }: ${ seconds }`
    }

    const getDay = ( dayIndex ) => {
        switch( dayIndex ) {
            case 0 :
                return 'Sunday'
                break;
            case 1 :
                return 'Monday'
                break;
            case 2 :
                return 'Tuesday'
                break;
            case 3 :
                return 'Wednesday'
                break;
            case 4 :
                return 'Thursday'
                break;
            case 5 :
                return 'Friday'
                break;
            case 6 :
                return 'Saturday'
                break;
        }
    }

    /**
     * Convert into date from given timestamp
     */
    const convertedDate = ( timestamp ) => {
        let newDate = new Date( timestamp ),
            day = String( newDate.getDate() ).padStart( 2, '0' ),
            month = new Intl.DateTimeFormat('en', { month: 'long' }).format(newDate);
            year = newDate.getFullYear();
        return `${ year } ${ month } ${ getScript( day ) }`
    }

    return {
        getDate,
        getTime,
        convertedDate
    }
}