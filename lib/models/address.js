module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'address',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            type: {
                type: DataTypes.ENUM('VEHICLE', 'DRIVER'),
                allowNull: false,
                defaultValue: 'DRIVER'
            },
            itemId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'item_id'
            },
            lat: {
                type: DataTypes.FLOAT(10, 7),
                allowNull: false
            },
            clong: {
                type: DataTypes.FLOAT(10, 7),
                allowNull: false
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
            tableName: 'address',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }]
                },
                {
                    name: 'type',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'type' }, { name: 'item_id' }]
                }
            ]
        }
    );
};
