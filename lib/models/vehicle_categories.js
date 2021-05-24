module.exports = function(sequelize, DataTypes) {
    const vehicleCategories = sequelize.define(
        'vehicle_categories',
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
            tableName: 'vehicle_categories',
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
                }
            ]
        }
    );

    vehicleCategories.associate = function(models) {
        vehicleCategories.hasMany(models.vehicles, {
            as: 'vehicles',
            foreignKey: 'vehicle_category_id'
        });

        vehicleCategories.hasMany(models.vehicleSubCategories, {
            as: 'vehicle_sub_categories',
            foreignKey: 'vehicle_category_id'
        });
    };
    return vehicleCategories;
};
