const sequelize = require('./DB.js'); // база данных
const { DataTypes } = require('sequelize');// для использование типов полей

// Модели бд без ключей и т.д.
const User = sequelize.define('user', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, },
  password: { type: DataTypes.STRING },
  firstname: { type: DataTypes.STRING },

},
  {
    timestamps: false,
  });

const Role = sequelize.define('role', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, },
}
  ,
  {
    timestamps: false,
  });

const Profile = sequelize.define('profile', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  avatar: { type: DataTypes.STRING },
  birthdate: { type: DataTypes.STRING },
},
  {
    timestamps: false,
  });

const File = sequelize.define('file', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, },
  type: { type: DataTypes.STRING, },
  path: { type: DataTypes.STRING, unique: true },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  size: { type: DataTypes.BIGINT },
  parentID: { type: DataTypes.INTEGER }, // для того чтобы можно было сделать своего рода вложенность
  access_link: { type: DataTypes.STRING, },
},
  {
    timestamps: false,
  });

const Storage = sequelize.define('storage', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  occupied: { type: DataTypes.INTEGER },
  status: { type: DataTypes.BOOLEAN },
  datePay: { type: DataTypes.DATE },
},
  {
    timestamps: false,
  });

const Tariff = sequelize.define('tariff', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  placeCount: { type: DataTypes.INTEGER, unique: true },
  price: { type: DataTypes.DOUBLE },
  name: { type: DataTypes.STRING, unique: true }
},
  {
    timestamps: false,
  });

// для файлов связь
File.belongsTo(File, { foreignKey: 'parentID', as: 'parent', onDelete: 'CASCADE' });
File.hasMany(File, { foreignKey: 'parentID', as: 'children', onDelete: 'CASCADE' });

//Создание связей между моделями
Profile.hasOne(User)
User.belongsTo(Profile)

Role.hasMany(User)
User.belongsTo(Role)

Storage.hasOne(User)
User.belongsTo(Storage)

Storage.hasMany(File)
File.belongsTo(Storage)

Tariff.hasMany(Storage)
Storage.belongsTo(Tariff)

module.exports = {
  User,
  Role,
  Profile,
  Storage,
  File,
  Tariff
}

