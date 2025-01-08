const { Model, DataTypes } = require('sequelize')
const CreatedAtAttribute = require('./shared-attributes/created-at.attribute')
const ModelNames = require('../constants/model-names.js')
const TableNames = require('../constants/table-names.js')
const RelationNames = require('../constants/relation-names.js')

/** @type {import('sequelize').ModelAttributes} */
const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: TableNames.Customer,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      return this[Order.productRelation].reduce(
        (acc, item) => acc + item.price * item.OrderProduct.amount,
        0
      )
    }
  },
  createdAt: CreatedAtAttribute
}

class Order extends Model {
  static tableName = TableNames.Order
  static modelName = ModelNames.Order
  static customerRelation = RelationNames.Order.customer
  static productRelation = RelationNames.Order.product

  static associate(models) {
    this.belongsTo(models[ModelNames.Customer], {
      as: this.customerRelation
    })

    this.belongsToMany(models[ModelNames.Product], {
      as: this.productRelation,
      through: models[ModelNames.OrderProduct],
      foreignKey: 'orderId',
      otherKey: 'productId'
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
  OrderSchema,
  Order
}
