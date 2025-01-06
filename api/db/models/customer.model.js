const { Model, DataTypes } = require('sequelize')
const { User } = require('./user.model')
const CreatedAtAttribute = require('./shared-attributes/created-at.attribute')
const ModelNames = require('../constants/model-names.js')
const TableNames = require('../constants/table-names.js')
const RelationNames = require('../constants/relation-names.js')

/** @type {import('sequelize').ModelAttributes} */
const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'first_name'
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name'
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: User.tableName,
      key: 'id'
    },
    field: 'user_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: CreatedAtAttribute
}

class Customer extends Model {
  static tableName = TableNames.Customer
  static modelName = ModelNames.Customer
  static userRelation = RelationNames.Customer.user

  static associate(models) {
    this.belongsTo(models[ModelNames.User], {
      as: this.userRelation
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
  CustomerSchema,
  Customer
}
