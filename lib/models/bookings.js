module.exports = function(sequelize, DataTypes) {
    const bookings = sequelize.define(
        'bookings',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            bookingType: {
                type: DataTypes.ENUM('DAILY_RIDE', 'OUTSTATION', 'RENTAL'),
                allowNull: false,
                defaultValue: 'DAILY_RIDE',
                field: 'booking_type'
            },
            sourceAddress: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'source_address'
            },
            destinationAddress: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'destination_address'
            },
            pickupAddress: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'pickup_address'
            },
            pickupLat: {
                type: DataTypes.FLOAT(10, 7),
                allowNull: false,
                field: 'pickup_lat'
            },
            pickupLong: {
                type: DataTypes.FLOAT(10, 7),
                allowNull: false,
                field: 'pickup_long'
            },
            destinationLat: {
                type: DataTypes.FLOAT(10, 7),
                allowNull: false,
                field: 'destination_lat'
            },
            destinationLong: {
                type: DataTypes.FLOAT(10, 7),
                allowNull: false,
                field: 'destination_long'
            },
            status: {
                type: DataTypes.ENUM(
                    'REQUESTED',
                    'CAB_ASSIGNED',
                    'CONFIRMED',
                    'NOT_AVAILABLE'
                ),
                allowNull: false,
                defaultValue: 'REQUESTED'
            },
            customerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'customers',
                    key: 'id'
                },
                field: 'customer_id'
            },
            driverId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'drivers',
                    key: 'id'
                },
                field: 'driver_id'
            },
            confirmedBy: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'admin',
                    key: 'id'
                },
                field: 'confirmed_by'
            },
            vehicleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'vehicles',
                    key: 'id'
                },
                field: 'vehicle_id'
            },
            amount: {
                type: DataTypes.FLOAT(10, 7),
                allowNull: false
            },
            startTime: {
                type: DataTypes.TIME,
                allowNull: true,
                field: 'start_time'
            },
            endTime: {
                type: DataTypes.TIME,
                allowNull: true,
                field: 'end_time'
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
                field: 'created_at'
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'updated_at'
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'deleted_at'
            }
        },
        {
            sequelize,
            tableName: 'bookings',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }]
                },
                {
                    name: 'confirmed_by',
                    using: 'BTREE',
                    fields: [{ name: 'confirmed_by' }]
                },
                {
                    name: 'vehicle_id',
                    using: 'BTREE',
                    fields: [{ name: 'vehicle_id' }]
                },
                {
                    name: 'driver_id',
                    using: 'BTREE',
                    fields: [{ name: 'driver_id' }]
                },
                {
                    name: 'customer_id',
                    using: 'BTREE',
                    fields: [{ name: 'customer_id' }]
                }
            ]
        }
    );

    bookings.associate = function(models) {
        bookings.belongsTo(models.admin, {
            as: 'confirmed_by_admin',
            foreignKey: 'confirmed_by'
        });
        bookings.hasMany(models.payments, {
            as: 'payments',
            foreignKey: 'booking_id'
        });

        bookings.belongsTo(models.vehicles, {
            as: 'vehicle',
            foreignKey: 'vehicle_id'
        });
        bookings.belongsTo(models.drivers, {
            as: 'driver',
            foreignKey: 'driver_id'
        });
        bookings.belongsTo(models.customers, {
            as: 'customer',
            foreignKey: 'customer_id'
        });
    };
    return bookings;
};
