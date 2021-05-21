import { findOneCustomer } from 'daos/customerDao';
import { redisCacheType } from 'utils/cacheConstants';

export const cachedUser = async server => {
    await server.method('findOneCustomer', findOneCustomer, {
        generateKey: id => `${id}`,
        cache: redisCacheType
    });
};
