import { customers, passport } from 'models';
import { USER_TYPE } from 'utils/constants';

const attributes = ['id', 'first_name', 'last_name', 'email', 'mobile_no'];
const passportAttributes = ['id', 'user_type', 'provider_type', 'password'];

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
    passport.findOne({
        attributes: passportAttributes,
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

export const createCustomer = async data =>
    customers.create(data).then(d => d.toJSON());

export const createCustomerPassport = async data =>
    passport.create(data).then(d => d.toJSON());
