const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const Donor = sequelize.define('Donor', {
  fullName: { type: DataTypes.STRING, allowNull: false },
  bloodGroup: { type: DataTypes.STRING(5), allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, unique: true, allowNull: false },
  lastDonationDate: { type: DataTypes.DATEONLY },
  isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true },
  status: { type: DataTypes.ENUM('Active', 'Inactive'), defaultValue: 'Active' } // [cite: 36]
});

module.exports = Donor;