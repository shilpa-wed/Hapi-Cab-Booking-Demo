import { findPassportDetail, findOneByCriteria } from 'daos/customerDao';
import { comparePassword } from 'utils/bcrypt';
import { USER_TYPE } from 'utils/constants';
import jwt from 'jsonwebtoken';

module.exports = [
    {
        method: 'POST',
        path: '/login',
        options: {
            description: 'get one customer by ID',
            notes: 'GET customer API',
            tags: ['api', 'customers'],
            cors: true
        },
        handler: async (request, h) => {
            const { email, password } = request.payload;

            // Check given email customer is exist or not!
            const existCustomer = await findOneByCriteria({
                email: email.toLowerCase()
            });
            if (!existCustomer)
                throw new Error(`This ${email} account does not exist!`);

            // If customer is present check the password is matching or not!
            const passportData = await findPassportDetail(existCustomer.id);
            if (!passportData)
                throw new Error(`This ${email} account provider not exist!`);

            // Compare the password
            const matchPassword = await comparePassword(
                password,
                passportData.password
            );
            if (!matchPassword) throw new Error(`Password Mismatch!`);

            // Create JWT token for the user that going to be loggin
            const token = await jwt.sign(
                {
                    userId: existCustomer.id,
                    email: existCustomer.email,
                    userType: USER_TYPE.CUSTOMER
                },
                process.env.JWT_SECRET,
                { expiresIn: 3600000 }
            );

            // Todo pending
            // Insert record to tokens table for created jwt token!
            return h.response({ token, userId: existCustomer.id });
        }
    }
];
