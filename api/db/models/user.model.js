const { Model, DataTypes, Sequelize } = require('sequelize')

/** @type {import('sequelize').ModelAttributes} */
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'customer'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}

class User extends Model {
  static tableName = 'users'
  static modelName = 'User'

  static associate(models) {
    User.belongsToMany(models.Product, {
      as: 'products',
      through: 'user_products',
      foreignKey: 'userId',
      otherKey: 'productId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: User.tableName,
      modelName: User.modelName,
      timestamps: false
    }
  }
}

module.exports = {
  UserSchema,
  User
}
