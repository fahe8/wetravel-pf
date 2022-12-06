const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('favorites', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        }, 
        stars: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        },
        services: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        photos: {
            type: DataTypes.JSONB(DataTypes.STRING)
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        review: {
            type: DataTypes.STRING
        },
        comments: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        room: {
            type: DataTypes.JSONB
        },
        userFavorite: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { timestamps: false} 
    );
}