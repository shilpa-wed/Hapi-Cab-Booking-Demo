import { camelCase, isArray, isObject, snakeCase } from 'lodash';
import mapKeysDeep from 'map-keys-deep';
import { isDate } from 'moment';

/* export const convertDbResponseToRawResponse = dbResponse =>
    dbResponse.get({
        plain: true,
        raw: true
    }); */

export const convertDbResponseToRawResponse = dbResponse => {
    if (dbResponse) {
        return removeDBReferenceKeyFromResponse(
            dbResponse.get({
                plain: true,
                raw: true
            })
        );
    }
    return null;
};

export const removeDBReferenceKeyFromResponse = dbResponse => {
    let convertedObject = {};
    for (const [key, value] of Object.entries(dbResponse)) {
        if (typeof value === 'object' && isObject(value) && !isDate(value)) {
            convertedObject = Object.assign(
                {},
                convertedObject,
                removeDBReferenceKeyFromResponse(value)
            );
        } else {
            const allKeys = key.split('.');
            convertedObject[allKeys[allKeys.length - 1]] = value;
        }
    }
    return convertedObject;
};

export const mapKeysToCamelCase = arr =>
    arr.map(resource =>
        mapKeysDeep(removeDBReferenceKeyFromResponse(resource), keys =>
            camelCase(keys)
        )
    );

// This will return the difference in miles!
export const distanceDiff = (lat1, lon1, lat2, lon2) => {
    const x = 69.1 * (lat2 - lat1);
    const y = 69.1 * (lon2 - lon1) * Math.cos(lat1 / 57.3);

    const km = Math.sqrt(x * x + y * y) * 1.60934;
    return Math.round(km);
};

/**
 * A funtion that takes an sequelize database array response and converts
 * each object in a raw object & the keys to be snake_case
 * @param {Object} arr
 */
export const transformDbArrayResponseToRawResponse = arr => {
    if (!isArray(arr)) {
        throw new Error('The required type should be an object(array)');
    } else {
        return arr.map(resource =>
            mapKeysDeep(convertDbResponseToRawResponse(resource), keys =>
                snakeCase(keys)
            )
        );
    }
};
