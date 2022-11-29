const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false
    },
    email_verified:{
      type: DataTypes.BOOLEAN,
    },
    status: DataTypes.ENUM("host","admin","anfitrion"),
    allowNull: false

  }, {
    timestamps: false,
  });
};
