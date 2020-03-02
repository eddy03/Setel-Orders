'use strict'

module.exports = (sequelize, DataTypes) => {
  const SCHEMA = {
    description: {
      type: DataTypes.STRING(1000)
    },
    paymentId: {
      type: DataTypes.INTEGER()
    },
    status: {
      type: DataTypes.ENUM('success', 'failed', 'canceled')
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
    refUserRoles.belongsTo(models.accounts, { as: 'Account' })
  }

  return refUserRoles
}
