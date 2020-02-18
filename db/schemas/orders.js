'use strict'

module.exports = (sequelize, DataTypes) => {
  const SCHEMA = {
    uuid: {
      type: DataTypes.STRING(255)
    },
    description: {
      type: DataTypes.STRING(1000)
    }
  }

  const OPTIONS = {
    tableName: 'orders',
    underscored: true,
    constraints: false,
    paranoid: true
  }

  const refUserRoles = sequelize.define('orders', SCHEMA, OPTIONS)

  refUserRoles.associate = models => {
    refUserRoles.belongsTo(models.accounts, { as: 'User' })
  }

  return refUserRoles
}
