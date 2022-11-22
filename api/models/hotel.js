const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("hotel", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.NUMBER,
    },

    services: {
      type: DataTypes.STRING,
    },

    photos: {
      public_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

    stars: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    continent: {
      type: DataTypes.STRING,
    },

    location: {
      type: DataTypes.STRING,
    },

    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        isInt: true,
        min: 1,
        max: 5,
      },
    },

    comnents: {
      type: DataTypes.STRING,
    },

    room: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
