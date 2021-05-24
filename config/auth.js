export default {
    key: process.env.JWT_SECRET,
    verifyOptions: { algorithms: ['HS256'] },
    validate: (request, decodedToken, callback) => {
        console.log(`decodedToken is `, decodedToken);
        /* let error;
        let  credentials = accounts[decodedToken.accountId] || {};

        if (!credentials) {
            return callback(error, false, credentials);
        }

        return callback(error, true, credentials) */
    }
};
