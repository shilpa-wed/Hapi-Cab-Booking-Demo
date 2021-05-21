module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'drivers',
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
                allowNull: false
            },
            city: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            state: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            country: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            drivingLicenseNumber: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'driving_license_number'
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 1
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
            tableName: 'drivers',
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
};
