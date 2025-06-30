/**
 * MARK: FETCH
 */
export const ourFetch = async ( info ) => {
    let { api, body, callback, headersMultipart = false } = info
    let url = 'http://localhost:5000' + api
    let fetchObject = {
        method: "POST",
        headers: {
            "Content-Type": ( headersMultipart ? 'multipart/form-data' : "application/json" ),
        },
        credentials: 'include'
    }
    if( body ) fetchObject = { ...fetchObject, body }
    console.log( fetchObject )
    /* Fetch API */
    try {
        const response = await fetch( url, fetchObject )
        if( ! response.ok ) {
            throw new Error( 'Failed to fetch data => functions.js' )
        }
        const result = await response.json()
        callback( result )
    } catch( error ) {
        callback( error )
    }
}

/**
 * MARK: GET IMAGE
 */
export const getImage = ( image ) => {
    return './assets/images/' + image
}

export const getOrdinals = ( number ) => {
    if( ! number ) return
    switch( number ) {
        case 1: 
            return `${ number }st`
        case 2: 
            return `${ number }nd`
        case 3: 
            return `${ number }rd`
        default: 
            return `${ number }th`
    }
}

/**
 * MARK: CAPITALIZE FIRST LETTER
 */
export const firstLetterCapitalize = ( text ) => {
    return text.slice( 0, 1 ).toUpperCase() + text.slice( 1 )
}

/**
 * MARK: FORMAT DATE
 * 
 */
export const formatDate = ( date ) => {
    let dateInstance = new Date( date ),
        day = dateInstance.getDate(),
        month = dateInstance.toLocaleString( 'en-GB', { month: 'short' } )
    
    return `${ day } ${ month }`
}