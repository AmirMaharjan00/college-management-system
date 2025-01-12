/**
 * MARK: FETCH
 */
export const ourFetch = ( info ) => {
    let { api, body, callback } = info
    let url = 'http://localhost:5000' + api
    let fetchObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include'
    }
    if( body ) fetchObject = { ...fetchObject, body }
    /* Fetch API */
    fetch( url, fetchObject )
    .then(( result ) => result.json())
    .then(( data ) => {
        callback( data )
    })
}

/**
 * MARK: GET IMAGE
 */
export const getImage = ( image ) => {
    return './assets/images/' + image
}