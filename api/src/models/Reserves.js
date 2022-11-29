const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("reserves", {
    nameHotel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameRoom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    check_in: {
      type: DataTypes.DATE
    },
    check_out: {
      type: DataTypes.DATE
    },
    userReserve:{
      type: DataTypes.STRING,
      allowNull:false
    }
  }, { timestamps: false });
};
