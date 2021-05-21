import get from 'lodash/get';
import { notFound, badImplementation } from 'utils/responseInterceptors';
import { server } from 'root/server.js';
import { findAllCustomer } from 'daos/customerDao';
import { transformDbArrayResponseToRawResponse } from 'utils/transformerUtils';

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
    }
];
