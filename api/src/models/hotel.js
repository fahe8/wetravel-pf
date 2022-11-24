const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("hotel", {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
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
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false
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
      type: DataTypes.STRING,
    },
    comments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    room: {
      type: DataTypes.JSONB,
    },
  }, {timestamps: false});
}
