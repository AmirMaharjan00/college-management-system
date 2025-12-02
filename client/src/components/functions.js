/**
 * MARK: FETCH
 */
export const ourFetch = async ( info ) => {
    let { api, body, callback = false, headersMultipart = false, setter } = info
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
        if( callback ) {
            if( setter ) {
                callback( result, setter )
            } else {
                callback( result)
            }
        }
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
    let sanitizedNumber = parseInt( number )
    switch( sanitizedNumber ) {
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
    if( /^\d{4}-\d{2}-\d{2}$/.test( date ) ) return date
    let newDate = new Date( date )
    return newDate.toISOString().split('T')[0];
}

/**
 * Get current select value
 */
export const getCurrentSelectValue = ( arr, val ) => {
    if( typeof val === 'object' ) return val
    return arr.reduce(( _thisValue, item ) => {
        let { value } = item
        if( value === val ) _thisValue = item
        return _thisValue
    }, {})
}

/**
 * MARK: FETCH CALLBACK
 */
export const fetchCallback = ( data, setter ) => {
    let { result, success } = data
    if( success ) setter( result )
}

/**
 * MAKR: Remove Ordinals
 */
export const removeOrdinals = ( ordinal ) => {
    if( Number.isInteger( ordinal ) ) return ordinal
    return parseInt( ordinal.replace( /(st|nd|rd|th)$/i, "" ), 10 );
}