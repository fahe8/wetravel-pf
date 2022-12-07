const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('image', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        nameUser: {
          type: DataTypes.STRING,
          // allowNull: false,
        }
    }, {
      timestamps: false
    } 
  );
}