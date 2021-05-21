module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'admin',
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
            cabStationId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'cab_stations',
                    key: 'id'
                },
                field: 'cab_station_id'
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
            tableName: 'admin',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }]
                },
                {
                    name: 'cab_station_id',
                    using: 'BTREE',
                    fields: [{ name: 'cab_station_id' }]
                }
            ]
        }
    );
};
