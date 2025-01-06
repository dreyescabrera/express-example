const { DataTypes, Sequelize } = require('sequelize')

/** @type {import('sequelize').ModelAttributeColumnOptions} */
const CreatedAtAttribute = {
  allowNull: false,
  type: DataTypes.DATE,
  field: 'created_at',
  defaultValue: Sequelize.fn('NOW')
}

module.exports = CreatedAtAttribute
