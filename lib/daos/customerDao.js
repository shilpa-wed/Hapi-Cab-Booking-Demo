import { customers } from 'models';
import { USER_TYPE } from 'utils/constants';

const attributes = ['id', 'first_name', 'last_name', 'email', 'mobile_no'];

export const findOneCustomer = async userId =>
    customers.findOne({
        attributes,
        where: {
            id: userId
        },
        underscoredAll: false
    });

export const findOneByCriteria = async criteria =>
    customers.findOne({
        attributes,
        where: criteria,
        underscoredAll: false
    });

export const findPassportDetail = async customerId =>
    customers.findOne({
        attributes,
        where: {
            userId: customerId,
            userType: USER_TYPE.CUSTOMER,
            providerType: 'LOCAL'
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
