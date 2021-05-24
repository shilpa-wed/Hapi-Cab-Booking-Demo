import get from 'lodash/get';
import {
    notFound,
    badImplementation,
    badData
} from 'utils/responseInterceptors';
import { server } from 'root/server.js';
import {
    createCustomer,
    createCustomerPassport,
    findAllCustomer,
    findOneByCriteria
} from 'daos/customerDao';
import { transformDbArrayResponseToRawResponse } from 'utils/transformerUtils';
import { generatePassword } from 'utils/bcrypt';
import { USER_TYPE } from 'utils/constants';
import Joi from '@hapi/joi';

module.exports = [
    {
        method: 'GET',
        path: '/{customerId}',
        options: {
            description: 'get one customer by ID',
            notes: 'GET customer API',
            tags: ['api', 'customers'],
            cors: true
        },
        handler: async request => {
            const customerId = request.params.customerId;
            return server.methods.findOneCustomer(customerId).then(user => {
                if (!user) {
                    return notFound(
                        `No customer was found for id ${customerId}`
                    );
                }
                return user;
            });
        }
    },
    {
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            const { page, limit } = request.query;
            return findAllCustomer(page, limit)
                .then(users => {
                    if (get(users.allUsers, 'length')) {
                        const totalCount = users.totalCount;
                        const allUsers = transformDbArrayResponseToRawResponse(
                            users.allUsers
                        ).map(user => user);

                        return h.response({
                            results: allUsers,
                            totalCount
                        });
                    }
                    return notFound('No users found');
                })
                .catch(error => badImplementation(error.message));
        },
        options: {
            description: 'get all customers',
            notes: 'GET customers API',
            tags: ['api', 'customers'],
            plugins: {
                pagination: {
                    enabled: true
                },
                query: {
                    pagination: true
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/register',
        options: {
            auth: false,
            description: 'Signup api for customer!',
            notes: 'GET customer API',
            tags: ['api', 'customers'],
            cors: true,
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    email: Joi.string().required(),
                    password: Joi.string().required(),
                    mobileNo: Joi.string().required()
                })
            }
        },
        handler: async (request, h) => {
            const {
                firstName,
                lastName,
                email,
                password,
                mobileNo,
                ...rest
            } = request.payload;

            // Check given email customer is exist or not!
            const existCustomer = await findOneByCriteria({
                mobileNo
            });
            if (existCustomer)
                throw badData(
                    `This ${mobileNo} is already registered, Please try with another mobile number!`
                );

            // Create bcrypt password
            const generatedPassword = await generatePassword(password);

            // Create customer entry to customer table!
            const customer = await createCustomer({
                firstName,
                lastName,
                email,
                mobileNo,
                ...rest
            });

            // Create password
            await createCustomerPassport({
                userType: USER_TYPE.CUSTOMER,
                providerType: 'LOCAL',
                password: generatedPassword,
                userId: customer.id
            });

            return h.response({
                userId: customer.id,
                message: `Your account is created. Please login to continue!`
            });
        }
    }
];
