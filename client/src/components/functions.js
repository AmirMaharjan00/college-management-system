/**
 * MARK: FETCH
 */
export const ourFetch = async ( info ) => {
    let { api, body, callback = false, headersMultipart = false } = info
    let url = 'http://localhost:5000' + api
    let fetchObject = {
        method: "POST",
        credentials: 'include'
    }
    if( body ) fetchObject = { ...fetchObject, body }
    if( ! headersMultipart ) fetchObject = {    // don't set headers if multipart
        ...fetchObject,
        headers: {
            "Content-Type": "application/json"
        }
    }
    /* Fetch API */
    try {
        const response = await fetch( url, fetchObject )
        if( ! response.ok ) {
            throw new Error( 'Failed to fetch data => functions.js' )
        }
        const result = await response.json()
        if( callback ) callback( result )
    } catch( error ) {
        if( callback ) callback( error )
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

/**
 * MARK: Subscript or Superscript
 * 
 */
export const getScript = ( number ) => {
    switch( number ) {
        case 1 : 
            return `${ number }st`
        break;
        case 2 : 
            return `${ number }nd`
        break;
        case 3 : 
            return `${ number }rd`
        break;
        default:
            return `${ number }th`
    }
}


/**
 * Adjust date
 */
export const adjustDate = ( date ) => {
    if( ! date ) return ''
    let newDate = new Date( date )
    return newDate.toISOString().split('T')[0];
}