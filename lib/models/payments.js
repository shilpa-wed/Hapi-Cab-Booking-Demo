module.exports = function(sequelize, DataTypes) {
    const payments = sequelize.define(
        'payments',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            bookingId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'bookings',
                    key: 'id'
                },
                field: 'booking_id'
            },
            paymentMode: {
                type: DataTypes.ENUM('CASH', 'CREDIT_CARD', 'DEBIT_CARD'),
                allowNull: false,
                defaultValue: 'CASH',
                field: 'payment_mode'
            },
            paymentMeta: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'payment_meta'
            },
            payableAmount: {
                type: DataTypes.FLOAT(10, 7),
                allowNull: false,
                field: 'payable_amount'
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
            tableName: 'payments',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }]
                },
                {
                    name: 'booking_id',
                    using: 'BTREE',
                    fields: [{ name: 'booking_id' }]
                }
            ]
        }
    );

    payments.associate = function(models) {
        payments.belongsTo(models.bookings, {
            as: 'booking',
            foreignKey: 'booking_id'
        });
    };
    return payments;
};
