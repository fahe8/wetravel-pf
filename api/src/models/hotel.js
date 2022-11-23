const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("hotel", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
    room_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    room_properties: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    room_size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    room_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    room_photos: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {timestamps: false});
}
