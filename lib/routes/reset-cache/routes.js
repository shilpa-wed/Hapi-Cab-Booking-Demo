import { server } from 'root/server.js';
import { badRequest } from '@hapi/boom';

module.exports = [
    {
        method: 'DELETE',
        path: '/customers/{customerId}',
        handler: request => {
            const customerId = request.params.customerId;
            return server.methods.findOneCustomer.cache
                .drop(customerId)
                .then(() => 'Cache Dropped Successfully')
                .catch(error => {
                    request.log('error', error);
                    return badRequest(error.message);
                });
        },
        options: {
            description: 'resetting cache for customers',
            notes: 'DELETE customer cache API',
            tags: ['api', 'reset-cache']
        }
    }
];
