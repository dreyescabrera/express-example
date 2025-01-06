const { Model, DataTypes } = require('sequelize')
const TableNames = require('../constants/table-names')
const ModelNames = require('../constants/model-names')
const RelationNames = require('../constants/relation-names')
const CreatedAtAttribute = require('./shared-attributes/created-at.attribute')

/** @type {import('sequelize').ModelAttributes} */
const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: CreatedAtAttribute
}

class Category extends Model {
  static tableName = TableNames.Category
  static modelName = ModelNames.Category
  static productRelation = RelationNames.Category.product

  static associate(models) {
    this.hasMany(models[ModelNames.Product], {
      as: this.productRelation,
      foreignKey: 'categoryId'
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

module.exports = { Category, CategorySchema }
