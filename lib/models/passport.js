module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'passport',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            userType: {
                type: DataTypes.ENUM('CUSTOMER', 'DRIVER'),
                allowNull: false,
                defaultValue: 'CUSTOMER',
                field: 'user_type'
            },
            providerType: {
                type: DataTypes.ENUM('GOOGLE', 'GITHUB', 'LOCAL'),
                allowNull: false,
                defaultValue: 'GOOGLE',
                field: 'provider_type'
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            serviceProviderId: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'service_provider_id'
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'user_id'
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
            tableName: 'passport',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }]
                },
                {
                    name: 'user_type',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'user_type' },
                        { name: 'user_id' },
                        { name: 'provider_type' }
                    ]
                }
            ]
        }
    );
};
