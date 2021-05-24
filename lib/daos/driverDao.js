import { drivers, passport } from 'models';
import { USER_TYPE } from 'utils/constants';

const attributes = ['id', 'first_name', 'last_name', 'email', 'mobile_no'];
const passportAttributes = ['id', 'user_type', 'provider_type', 'password'];

export const findOneDriver = async userId =>
    drivers.findOne({
        attributes,
        where: {
            id: userId
        },
        underscoredAll: false
    });

export const findOneDriverByCriteria = async criteria =>
    drivers.findOne({
        attributes,
        where: criteria,
        underscoredAll: false
    });

export const findDriverPassportDetail = async userId =>
    passport.findOne({
        attributes: passportAttributes,
        where: {
            userId: userId,
            userType: USER_TYPE.DRIVER,
            providerType: 'LOCAL'
        },
        underscoredAll: false
    });

export const findAllDriver = async (page, limit) => {
    const where = {};
    const totalCount = await drivers.count({ where });
    const allDrivers = await drivers.findAll({
        attributes,
        where,
        offset: (page - 1) * limit,
        limit
    });
    return { allDrivers, totalCount };
};

export const createDriver = async data =>
    drivers.create(data).then(d => d.toJSON());

export const createDriverPassport = async data =>
    passport.create(data).then(d => d.toJSON());
