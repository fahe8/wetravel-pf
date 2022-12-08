require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const user = require("./models/user");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/wetravel`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries);

const { Hotel, User, Reserves, Review, Order, Favorites, Image } = sequelize.models;

Hotel.belongsToMany(User, { through: "user-hotels" });
User.belongsToMany(Hotel, { through: "user-hotels" });

User.hasMany(Reserves);
Reserves.belongsTo(User);

Review.belongsTo(User);
User.hasMany(Review);

Review.belongsTo(Hotel);
Hotel.hasMany(Review);

Order.hasMany(Reserves);
User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Favorites);
Favorites.belongsTo(User);

User.hasMany(Image);
Image.belongsTo(User);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
