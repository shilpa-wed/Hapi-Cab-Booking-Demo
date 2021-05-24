import { getPastBookingDetailsOfCustomer, getBookingById } from 'daos/bookings';
import { ADDRESS_TYPE, BOOKING_STATUS } from 'utils/constants';
import { badImplementation } from 'utils/responseInterceptors';
import db from 'models';
import moment from 'moment';

import {
    distanceDiff,
    updateUsingId,
    upsertUsingCriteria,
    insertRecord
} from 'utils/dbUtils';

module.exports = [
    {
        method: 'POST',
        path: '/past-bookings',
        options: {
            auth: false,
            description: 'Bookings api for customer!',
            notes: 'GET Bookings of customer API',
            tags: ['api', 'bookings'],
            cors: true
        },
        handler: async (request, h) => {
            const user = { userId: 1 }; // Todo to load it from auth middleware!
            const rest = request.payload;
            const allBookings = await getPastBookingDetailsOfCustomer({
                customerId: user.userId, // Todo to remove later static customer-id!
                ...rest
            });

            return h.response({
                data: allBookings
            });
        }
    },
    {
        method: 'POST',
        path: '/confirm-request',
        options: {
            auth: false,
            description: 'Confirm request raised by the customer',
            notes: 'Co request confirm by driver!',
            tags: ['api', 'bookings'],
            cors: true
        },
        handler: async (request, h) => {
            const user = { userId: 1 }; // Todo to load it from auth middleware!
            const { bookingId, lat, long, startTime } = request.payload;

            // console.log(`user id`, user);

            // Check the cab that is customer is requesting is available or not!
            const bookingAvailable = await getBookingById(bookingId);
            if (!bookingAvailable)
                throw badImplementation(`The booking is not available!`);

            if (bookingAvailable.status === BOOKING_STATUS.CAB_ASSIGNED)
                throw badImplementation(
                    `This booking request is already confirmed!`
                );

            // Do entry in the booking table for booking request!
            const updatedBooking = await updateUsingId(db.bookings, {
                id: bookingId,
                status: BOOKING_STATUS.CAB_ASSIGNED,
                startTime: startTime
                    ? moment(startTime).format('HH:mm:ss')
                    : moment().format('HH:mm:ss'),
                driverId: user.userId || 1 // Todo to remove later and use user.id from the context! after auth middleware implementation
            }).then(data => data.toJSON());

            // Todo set driver address and cab address lat/long to its related table!
            await Promise.all([
                new Promise((resolve, reject) => {
                    upsertUsingCriteria(
                        db.address,
                        {
                            lat,
                            clong: long,
                            itemId: bookingAvailable.driverId,
                            type: ADDRESS_TYPE.DRIVER
                        },
                        {
                            itemId: bookingAvailable.driverId,
                            type: ADDRESS_TYPE.DRIVER
                        }
                    );
                    resolve();
                }),
                new Promise((resolve, reject) => {
                    upsertUsingCriteria(
                        db.address,
                        {
                            lat,
                            clong: long,
                            itemId: bookingAvailable.vehicleId,
                            type: ADDRESS_TYPE.VEHICLE
                        },
                        {
                            itemId: bookingAvailable.vehicleId,
                            type: ADDRESS_TYPE.VEHICLE
                        }
                    );
                    resolve();
                })
            ]);

            const km = distanceDiff(
                bookingAvailable.pickupLat,
                bookingAvailable.pickupLong,
                bookingAvailable.destinationLat,
                bookingAvailable.destinationLat
            );
            console.log(`km are`, km);
            const amount = km * bookingAvailable.amount;

            return h.response({
                ...updatedBooking,
                amount
            });
        }
    },
    {
        method: 'POST',
        path: '/complete-booking',
        options: {
            auth: false,
            description:
                'complete booking request at the end of the transaction!',
            notes: 'Complete Bookings of customer API',
            tags: ['api', 'bookings'],
            cors: true
        },
        handler: async (request, h) => {
            // const user = { userId: 1 }; // Todo to load it from auth middleware!
            const { bookingId, endTime, lat, long } = request.payload;

            // Check the cab that is customer is requesting is available or not!
            const bookingAvailable = await getBookingById(bookingId);
            if (!bookingAvailable)
                throw badImplementation(`The booking is not available!`);

            if (bookingAvailable.status === BOOKING_STATUS.CONFIRMED)
                throw new Error(`This booking is already completed!`);

            // Do entry in the booking table for booking request!
            const updatedBooking = await updateUsingId(db.bookings, {
                id: bookingId,
                endTime: endTime
                    ? moment(endTime).format('HH:mm:ss')
                    : moment().format('HH:mm:ss'),
                status: BOOKING_STATUS.CONFIRMED
            }).then(data => data.toJSON());

            // In background update the vehicle/driver lat/long
            await Promise.all([
                new Promise((resolve, reject) => {
                    upsertUsingCriteria(
                        db.address,
                        {
                            lat,
                            clong: long
                        },
                        {
                            itemId: bookingAvailable.driverId,
                            type: ADDRESS_TYPE.DRIVER
                        }
                    );
                    resolve();
                }),
                new Promise((resolve, reject) => {
                    upsertUsingCriteria(
                        db.address,
                        {
                            lat,
                            clong: long
                        },
                        {
                            itemId: bookingAvailable.vehicleId,
                            type: ADDRESS_TYPE.VEHICLE
                        }
                    );
                    resolve();
                })
            ]);

            // Calculate distance in km to calculate the price below!
            const km = distanceDiff(
                bookingAvailable.pickupLat,
                bookingAvailable.pickupLong,
                bookingAvailable.destinationLat,
                bookingAvailable.destinationLat
            );
            console.log(`km are`, km);
            const amount = km * bookingAvailable.amount;

            await insertRecord(db.payments, {
                bookingId: bookingAvailable.id,
                payableAmount: amount
            });

            updatedBooking.amount = amount;
            return h.response(updatedBooking);
        }
    }
];