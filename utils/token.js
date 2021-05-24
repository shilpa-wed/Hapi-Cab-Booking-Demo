'use strict';

import { USER_TYPE } from './constants';

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

export const createToken = user => {
    let scopes;
    // Check if the user object passed in
    // has admin set to true, and if so, set
    // scopes to admin
    if (user.admin) {
        scopes = 'admin';
    }

    // Sign the JWT
    return jwt.sign(
        {
            id: user.id,
            userId: user.id,
            email: user.email,
            userType: user.type ? user.type : USER_TYPE.CUSTOMER,
            scope: scopes
        },
        secret,
        {
            algorithm: 'HS256',
            expiresIn: 3600000 || '1h'
        }
    );
};
