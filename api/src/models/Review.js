const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("review", {
    stars: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
