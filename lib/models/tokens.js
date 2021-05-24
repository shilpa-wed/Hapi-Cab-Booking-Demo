module.exports = function(sequelize, DataTypes) {
    const tokens = sequelize.define(
        'tokens',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            type: {
                type: DataTypes.ENUM('CUSTOMER', 'DRIVER'),
                allowNull: false,
                defaultValue: 'CUSTOMER'
            },
            token: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            tokenExpiry: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'token_expiry'
            },
            loginTime: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'login_time'
            },
            logoutTime: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'logout_time'
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
            tableName: 'tokens',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }]
                },
                {
                    name: 'token',
                    using: 'BTREE',
                    fields: [{ name: 'token', length: 100 }]
                }
            ]
        }
    );

    tokens.associate = function(models) {};
    return tokens;
};
