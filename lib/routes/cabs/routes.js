import { badData } from 'utils/responseInterceptors';
import {
    getNearestAvailableCabs,
    bookCabs,
    checkCabAvailability,
    getCabById
} from 'daos/cabs';
import Joi from '@hapi/joi';

module.exports = [
    {
        method: 'POST',
        path: '/nearest-cabs',
        options: {
            auth: false,
            description: 'Cabs api for customer!',
            notes: 'GET nearest cabs API',
            tags: ['api', 'cabs'],
            cors: true,
            validate: {
                payload: Joi.object({
                    lat: Joi.number().required(),
                    long: Joi.number().required()
                })
            }
        },
        handler: async (request, h) => {
            const { lat, long } = request.payload;

            const allNearestVehicles = await getNearestAvailableCabs({
                lat,
                long
            });

            console.log(`allNearestVehicles is`, allNearestVehicles[0]);

            return h.response({
                data: [...allNearestVehicles]
            });
        }
    },
    {
        method: 'POST',
        path: '/book-cab',
        options: {
            auth: false,
            description: 'Cabs api for customer!',
            notes: 'GET cabs API',
            tags: ['api', 'cabs'],
            cors: true,
            validate: {
                payload: Joi.object({
                    pickupLat: Joi.number().required(),
                    pickupLong: Joi.number().required(),
                    destinationLat: Joi.number().required(),
                    destinationLong: Joi.number().required(),
                    pickupAddress: Joi.string().required(),
                    destinationAddress: Joi.string().required(),
                    vehicleId: Joi.number().required()
                })
            }
        },
        handler: async (request, h) => {
            const {
                pickupLat,
                pickupLong,
                destinationLat,
                destinationLong,
                pickupAddress,
                destinationAddress,
                vehicleId
            } = request.payload;

            // Check the cab that is customer is requesting is available or not!
            const cabAvailable = await checkCabAvailability(vehicleId);

            if (!cabAvailable)
                throw badData(
                    `The requested cab is not available for booking!`
                );

            console.log(`after this`);
            // Do other stuff for booking once the cab is available
            // Get cab details
            const cabDetails = await getCabById(vehicleId);

            console.log(`cabDetails is `, cabDetails);

            // Do entry in the booking table for booking request!
            const response = await bookCabs({
                pickupLat,
                pickupLong,
                destinationLat,
                destinationLong,
                pickupAddress,
                destinationAddress,
                vehicleId,
                amount: cabDetails.amount, // Because it happens sometime that cab amount will
                // change in future so we could fetch the exact amount of booking time
                customerId: 51 // Todo to remove later and use user.id from the context! after auth middleware implementation
            });

            return h.response({
                bookingId: response.bookingData.id,
                booking: {
                    ...response.bookingData
                },
                message: `Your booking has been requested!,
                 Please wait util confirmation`
            });
        }
    }
];
