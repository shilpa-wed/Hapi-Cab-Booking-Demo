import get from 'lodash/get';
import { notFound, badImplementation } from 'utils/responseInterceptors';

import { findAllDriver, findOneDriver } from 'daos/driverDao';
import { transformDbArrayResponseToRawResponse } from 'utils/transformerUtils';

module.exports = [
    {
        method: 'GET',
        path: '/{driverId}',
        options: {
            description: 'get one driver detail by ID',
            notes: 'GET driver API',
            tags: ['api', 'drivers'],
            cors: true
        },
        handler: async request => {
            const driverId = request.params.driverId;
            return await findOneDriver(driverId).then(driver => {
                if (!driver) {
                    return notFound(`No driver was found for id ${driverId}`);
                }
                return driver;
            });
        }
    },
    {
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            const { page, limit } = request.query;
            return findAllDriver(page, limit)
                .then(users => {
                    if (get(users.allDrivers, 'length')) {
                        const totalCount = users.totalCount;
                        const allDrivers = transformDbArrayResponseToRawResponse(
                            users.allDrivers
                        ).map(user => user);

                        return h.response({
                            results: allDrivers,
                            totalCount
                        });
                    }
                    return notFound('No users found');
                })
                .catch(error => badImplementation(error.message));
        },
        options: {
            description: 'get all drivers',
            notes: 'GET drivers API',
            tags: ['api', 'drivers'],
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
