module.exports = function(sequelize, DataTypes) {
    const customers = sequelize.define(
        'customers',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            firstName: {
                type: DataTypes.STRING(20),
                allowNull: false,
                field: 'first_name'
            },
            lastName: {
                type: DataTypes.STRING(20),
                allowNull: false,
                field: 'last_name'
            },
            mobileNo: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: 'mobile_no',
                field: 'mobile_no'
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            birthDate: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'birth_date'
            },
            address: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            city: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            state: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            country: {
                type: DataTypes.TEXT,
                allowNull: true
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
            tableName: 'customers',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }]
                },
                {
                    name: 'mobile_no',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'mobile_no' }]
                },
                {
                    name: 'email',
                    using: 'BTREE',
                    fields: [{ name: 'email' }]
                }
            ]
        }
    );

    customers.associate = function(models) {
        customers.hasMany(models.bookings, {
            as: 'bookings',
            foreignKey: 'customer_id'
        });
    };
    return customers;
};
