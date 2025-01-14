const { Model, DataTypes, Sequelize } = require('sequelize')
const CreatedAtAttribute = require('./shared-attributes/created-at.attribute')
const ModelNames = require('../constants/model-names.js')
const TableNames = require('../constants/table-names.js')
const RelationNames = require('../constants/relation-names.js')

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
  recoveryToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: CreatedAtAttribute,
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}

class User extends Model {
  static tableName = TableNames.User
  static modelName = ModelNames.User
  static customerRelation = RelationNames.User.customer

  static associate(models) {
    this.hasOne(models[ModelNames.Customer], {
      as: this.customerRelation,
      foreignKey: 'userId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: this.tableName,
      modelName: this.modelName,
      timestamps: false
    }
  }
}

module.exports = {
  UserSchema,
  User
}
