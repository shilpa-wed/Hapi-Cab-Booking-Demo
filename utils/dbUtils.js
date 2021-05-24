import { Op } from 'sequelize';
import deepMapKeys from 'deep-map-keys';

export const updateUsingId = async (model, args) => {
    let affectedRows;
    try {
        [affectedRows] = await model.update(args, {
            where: {
                id: args.id,
                deletedAt: null
            }
        });
    } catch (e) {
        console.log(`e update error`, e.message);
        throw new Error(`Failed to update ${model.name}`);
    }
    if (!affectedRows) {
        throw new Error('Data not found');
    }
    return model.findOne({ where: { id: args.id } });
};

export const upsertUsingCriteria = async (model, args, criteria) => {
    let affectedRows;
    try {
        [affectedRows] = await model.update(args, {
            where: {
                ...criteria,
                deletedAt: null
            }
        });
    } catch (e) {
        throw new Error(`Failed to update ${model.name}`);
    }
    if (!affectedRows) {
        // create a new record
        await model.create({ ...args }).then(d => d.toJSON());
    }
    return model.findOne({ where: criteria });
};

export const findOneById = async (model, id) => {
    try {
        const data = await model.findOne({ where: { id }, raw: true });
        return data;
    } catch (e) {
        throw new Error(e.message);
    }
};

export const findOneByCriteria = async (model, args) => {
    try {
        const data = await model.findOne({ where: { ...args }, raw: true });
        return data;
    } catch (e) {
        throw new Error(e.message);
    }
};

export const insertRecord = async (model, args, returning = true) => {
    try {
        const data = await model.create({ ...args }).then(d => d.toJSON());
        return data;
    } catch (e) {
        throw new Error(e.message);
    }
};

export const sequelizedWhere = (currentWhere = {}, where = {}) => {
    where = deepMapKeys(where, k => {
        if (Op[k]) {
            return Op[k];
        }
        return k;
    });
    return { ...currentWhere, ...where };
};

// This will return the difference in miles!
export const distanceDiff = (lat1, lon1, lat2, lon2) => {
    const x = 69.1 * (lat2 - lat1);
    const y = 69.1 * (lon2 - lon1) * Math.cos(lat1 / 57.3);

    const km = Math.sqrt(x * x + y * y) * 1.60934;
    return Math.round(km);
};
