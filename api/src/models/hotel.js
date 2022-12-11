const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "hotel",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      stars: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      services: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      photos: {
        type: DataTypes.JSONB(DataTypes.STRING),
      },
      continent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
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
      status:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    { timestamps: false }
  );
};
