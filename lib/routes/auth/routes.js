import { findPassportDetail, findOneByCriteria } from 'daos/customerDao';
import { comparePassword } from 'utils/bcrypt';
import { createToken } from 'utils/token';
import { USER_TYPE } from 'utils/constants';
import { badData } from 'utils/responseInterceptors';
import { insertToken } from 'daos/tokenDao';
import moment from 'moment';
import Joi from '@hapi/joi';
import { emailSchemaReq } from 'utils/validationUtils';

module.exports = [
    {
        method: 'GET',
        path: '/me',
        options: {
            auth: 'jwt',
            description: 'get logged-in user detail!',
            notes: 'GET logged-in user data API',
            tags: ['api', 'auth'],
            cors: true
        },
        handler: async (request, h) =>
            h.response({
                user: request.user,
                scope: request.payload.scope
            })
    },
    {
        method: 'POST',
        path: '/login',
        options: {
            auth: false,
            description: 'Login api for customer using email, password!',
            notes: 'GET customer API',
            tags: ['api', 'auth'],
            cors: true,
            validate: {
                payload: Joi.object({
                    email: emailSchemaReq,
                    password: Joi.string().required()
                })
            }
        },
        handler: async (request, h) => {
            const { email, password } = request.payload;

            // Check given email customer is exist or not!
            const existCustomer = await findOneByCriteria({
                email: email.toLowerCase()
            });
            if (!existCustomer)
                throw badData(`This ${email} account does not exist!`);

            // If customer is present check the password is matching or not!
            const passportData = await findPassportDetail(existCustomer.id);
            if (!passportData)
                throw badData(`This ${email} account provider not exist!`);

            // Compare the password
            const matchPassword = await comparePassword(
                password,
                passportData.password
            );
            if (!matchPassword) throw badData(`Password Mismatch!`);

            // Create JWT token for the user that going to be loggin
            const token = await createToken(existCustomer);

            // Insert token record to the database!
            await insertToken({
                type: USER_TYPE.CUSTOMER,
                token,
                loginTime: moment(),
                userId: existCustomer.id,
                tokenExpiry: moment().add(3600, 'seconds')
            });

            // Insert record to tokens table for created jwt token!
            return h.response({ token, userId: existCustomer.id });
        }
    }
];
