import {
    convertDbResponseToRawResponse,
    mapKeysToCamelCase
} from 'utils/transformerUtils';
import { TABLES } from 'utils/constants';
import {
    bookings,
    vehicles,
    vehicleCategories,
    vehicleSubCategories
} from 'models';
import { Op } from 'sequelize';
import moment from 'moment';

// Check the requested cab is available to book or not!
export const checkCabAvailability = async cabId => {
    // Check already reserved this requested cab
    const cabReserved = await bookings.findOne({
        attributes: ['vehicleId', 'id', 'amount'],
        where: {
            status: 'CAB_ASSIGNED',
            vehicleId: cabId,
            endTime: null,
            createdAt: {
                [Op.gt]: moment(
                    moment().set({
                        hour: 0,
                        minute: 0,
                        second: 0,
                        millisecond: 0
                    })
                ),
                [Op.lt]: moment()
            }
        },
        raw: true
    });

    console.log(`cabReserved is here`, cabReserved);

    return !cabReserved;
};

export const getNearestAvailableCabs = async ({ lat, long }) => {
    const { QueryTypes } = vehicles.sequelize;

    // Check already reserved cabs
    const bookedCabs = await bookings.findAll({
        attributes: ['vehicleId', 'id'],
        where: {
            status: 'CAB_ASSIGNED',
            endTime: null,
            createdAt: {
                [Op.gt]: moment(
                    moment().set({
                        hour: 0,
                        minute: 0,
                        second: 0,
                        millisecond: 0
                    })
                ),
                [Op.lt]: moment()
            }
        }
    });
    const bookedCabIds = bookedCabs.map(cb => cb.vehicleId);

    // Todo to change here second point
    const distanceQuery = `
               (    Select st_distance_sphere(
                    POINT(${lat}, ${long}), 
                    POINT(${lat}, ${long}))/1000   
                 )       as distance_diff
            `;

    const notInQuery = bookedCabIds.length
        ? `AND  (vh.id not in ('${bookedCabIds.join(',')}'))`
        : '';
    const sqlQuery = `
        with distanceDiff as (
            select vh.*,
                   vc.name as category,
                   vs.name as sub_category,
                   ${distanceQuery}
            from ${TABLES.address} addr
                     inner join ${TABLES.vehicles} vh on vh.id = addr.item_id
                     inner join ${
                         TABLES.vehicleCategories
                     } vc on vc.id = vh.vehicle_category_id
                     inner join ${
                         TABLES.vehicleSubCategories
                     } vs on vs.id = vh.vehicle_sub_category_id
            where addr.type = 'VEHICLE' AND vh.active=1
            ${notInQuery}  
            order by distance_diff ASC
            limit 20
            )
        select *
        from distanceDiff;
    `;

    return mapKeysToCamelCase(
        await vehicles.sequelize.query(sqlQuery, { type: QueryTypes.SELECT })
    );
};

// Return cab detail by their id
export const getCabById = async cabId => {
    try {
        const vehicleData = await vehicles.findOne({
            where: {
                id: cabId
            },
            include: [
                {
                    model: vehicleCategories,
                    attributes: ['name'],
                    as: 'vehicle_category'
                },
                {
                    model: vehicleSubCategories,
                    attributes: ['name'],
                    as: 'vehicle_sub_category'
                }
            ]
        });
        console.log(`vehicleData is `, vehicleData);

        return convertDbResponseToRawResponse(vehicleData);
    } catch (e) {
        return Promise.reject(e);
    }
};

export const bookCabs = async ({ cabId, ...rest }) => {
    const response = {};
    try {
        response.bookingData = await bookings
            .create(rest)
            .then(d => d.toJSON());

        return Promise.resolve(response);
    } catch (e) {
        return Promise.reject(e);
    }
};
