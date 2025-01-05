const { Model, DataTypes, Sequelize } = require('sequelize')
const { User } = require('./user.model')

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
    references: {
      model: User.tableName,
      key: 'id'
    },
    field: 'user_id',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
    defaultValue: Sequelize.fn('NOW')
  }
}

class Customer extends Model {
  static tableName = 'customers'
  static modelName = 'Customer'

  static associate(models) {
    this.belongsTo(models[User.modelName], {
      as: 'user'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: Customer.tableName,
      modelName: Customer.modelName,
      timestamps: false
    }
  }
}

module.exports = {
  CustomerSchema,
  Customer
}
