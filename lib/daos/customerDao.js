import { customers } from 'models';

const attributes = ['id', 'first_name', 'last_name', 'email', 'mobile_no'];

export const findOneCustomer = async userId =>
    customers.findOne({
        attributes,
        where: {
            id: userId
        },
        underscoredAll: false
    });

export const findAllCustomer = async (page, limit) => {
    const where = {};
    const totalCount = await customers.count({ where });
    const allUsers = await customers.findAll({
        attributes,
        where,
        offset: (page - 1) * limit,
        limit
    });
    return { allUsers, totalCount };
};
