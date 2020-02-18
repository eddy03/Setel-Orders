'use strict'

module.exports = (sequelize, DataTypes) => {
  const SCHEMA = {
    email: {
      type: DataTypes.STRING(255)
    },
    password: {
      type: DataTypes.STRING(1000)
    }
  }

  const OPTIONS = {
    tableName: 'accounts',
    underscored: true,
    constraints: false,
    paranoid: true
  }

  const accounts = sequelize.define('accounts', SCHEMA, OPTIONS)

  accounts.associate = models => {
    accounts.hasMany(models.orders, { as: 'Orders' })
  }

  return accounts
}
