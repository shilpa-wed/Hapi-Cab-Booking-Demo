module.exports = function(sequelize, DataTypes) {
    const cabStations = sequelize.define(
        'cab_stations',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            lat: {
                type: DataTypes.FLOAT(10, 7),
                allowNull: false
            },
            clong: {
                type: DataTypes.FLOAT(10, 7),
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
            address: {
                type: DataTypes.TEXT,
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
            tableName: 'cab_stations',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }]
                }
            ]
        }
    );

    cabStations.associate = function(models) {
        cabStations.hasMany(models.admin, {
            as: 'admins',
            foreignKey: 'cab_station_id'
        });
    };
    return cabStations;
};
