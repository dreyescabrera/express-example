const { Model, DataTypes } = require('sequelize')
const CreatedAtAttribute = require('./shared-attributes/created-at.attribute')
const TableNames = require('../constants/table-names')
const ModelNames = require('../constants/model-names')
const RelationNames = require('../constants/relation-names')

/** @type {import('sequelize').ModelAttributes} */
const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: CreatedAtAttribute,
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: TableNames.Category,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Product extends Model {
  static tableName = TableNames.Product
  static modelName = ModelNames.Product
  static categoryRelation = RelationNames.Product.category

  static associate(models) {
    this.belongsTo(models[ModelNames.Category], {
      as: this.categoryRelation
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

module.exports = { Product, ProductSchema }
