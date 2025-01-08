const { DataTypes, Model } = require('sequelize')
const CreatedAtAttribute = require('../shared-attributes/created-at.attribute')
const TableNames = require('../../constants/table-names')
const ModelNames = require('../../constants/model-names')

const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TableNames.Order,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TableNames.Product,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: CreatedAtAttribute
}

class OrderProduct extends Model {
  static tableName = TableNames.OrderProduct
  static modelName = ModelNames.OrderProduct

  static associate(models) {
    // this.belongsTo(models.Order, {
    //   foreignKey: 'orderId'
    // })
    // this.belongsTo(models.Product, {
    //   foreignKey: 'productId'
    // })
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

module.exports = { OrderProduct, OrderProductSchema }
