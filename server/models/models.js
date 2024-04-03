const sequelize = require('./DB.js')  // база данных
const { DataTypes } = require('sequelize') // для использование типов полей
// Модели бд без ключей и т.д.
const User = sequelize.define('user', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, },
  password: { type: DataTypes.STRING },
  firstname: { type: DataTypes.STRING },
},
  {
    timestamps: false,
  })

const Role = sequelize.define('role', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, },
}
  ,
  {
    timestamps: false,
  })

const Profile = sequelize.define('profile', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  avatar: { type: DataTypes.STRING },
},
  {
    timestamps: false,
  })

const File = sequelize.define('file', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, },
  type: { type: DataTypes.STRING, },
  path: { type: DataTypes.STRING(1000) },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  size: { type: DataTypes.DOUBLE },
  parentID: { type: DataTypes.INTEGER }, // для того чтобы можно было сделать вложенность
},
  {
    timestamps: false,
  })

const Storage = sequelize.define('storage', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  occupied: { type: DataTypes.DECIMAL(20), defaultValue: 0 },
  status: { type: DataTypes.BOOLEAN, defaultValue: true },
  datePay: { type: DataTypes.DATEONLY },
},
  {
    timestamps: false,
  })

const Tariff = sequelize.define('tariff', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  placeCount: { type: DataTypes.INTEGER, unique: true },
  price: { type: DataTypes.DOUBLE },
  name: { type: DataTypes.STRING, unique: true },
  countTask: { type: DataTypes.INTEGER, unique: true }
},
  {
    timestamps: false,
  })
const List = sequelize.define('list', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  occupied: { type: DataTypes.INTEGER, defaultValue: 0 },

},
  {
    timestamps: false,
  })

const Task = sequelize.define('task', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  text: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  status: { type: DataTypes.BOOLEAN, defaultValue: true }
},
  {
    timestamps: false,
  })

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

Storage.hasOne(List)
List.belongsTo(Storage)

List.hasMany(Task)
Task.belongsTo(List)

module.exports = {
  User,
  Role,
  Profile,
  Storage,
  File,
  Tariff,
  Task,
  List
}

