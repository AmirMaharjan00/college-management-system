import { con } from './database.js'

/**
 * MARK: Username & password
 */
export const isValidUser = function ( userLogin ) {
    const { username, password } = userLogin
    const selectQuery = `SELECT * FROM users WHERE email='${username}' AND password='${password}'`
    return new Promise(( resolve, reject ) => {
        con.query( selectQuery, ( error, result ) => {
            if ( error ) {
                console.error("Error selecting data:", error);
                return reject({ success: false });
            }
            if ( result.length === 0 ) {
                return resolve({ success: false, message: 'User not found' });
            }
            resolve({
                success: true,
                name: result[0].name
            });
        });
    });
};