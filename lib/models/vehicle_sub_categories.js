module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'vehicle_sub_categories',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: 'name'
            },
            vehicleCategoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'vehicle_categories',
                    key: 'id'
                },
                field: 'vehicle_category_id'
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
            tableName: 'vehicle_sub_categories',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }]
                },
                {
                    name: 'name',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'name' }]
                },
                {
                    name: 'vehicle_category_id',
                    using: 'BTREE',
                    fields: [{ name: 'vehicle_category_id' }]
                }
            ]
        }
    );
};
