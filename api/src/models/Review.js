const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("review", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    stars: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    nameUser: {
      type: DataTypes.STRING,
    },
    nameHotel: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false
  });
};
