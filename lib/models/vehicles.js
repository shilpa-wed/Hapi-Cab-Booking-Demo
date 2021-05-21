module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'vehicles',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            vehicleNumber: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: 'vehicle_number',
                field: 'vehicle_number'
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
            vehicleSubCategoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'vehicle_sub_categories',
                    key: 'id'
                },
                field: 'vehicle_sub_category_id'
            },
            ownerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'owner_id'
            },
            amount: {
                type: DataTypes.FLOAT(10, 4),
                allowNull: false
            },
            modelNo: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'model_no'
            },
            brandName: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'brand_name'
            },
            manufacturingYear: {
                type: DataTypes.STRING(4),
                allowNull: false,
                field: 'manufacturing_year'
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
            tableName: 'vehicles',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }]
                },
                {
                    name: 'vehicle_number',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'vehicle_number' }]
                },
                {
                    name: 'vehicle_category_id',
                    using: 'BTREE',
                    fields: [{ name: 'vehicle_category_id' }]
                },
                {
                    name: 'vehicle_sub_category_id',
                    using: 'BTREE',
                    fields: [{ name: 'vehicle_sub_category_id' }]
                }
            ]
        }
    );
};
