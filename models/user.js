const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const User = sequelize.define('User', {
  name: { 
    type: DataTypes.STRING, 
    allowNull: true
  },
  email: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false, 
    validate: { isEmail: true } 
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull:true 
  },
  role: { 
    // Defined roles: Admin, City Manager, HR Manager, Helpline Team, Volunteer
    type: DataTypes.ENUM('Admin', 'City Manager', 'HR Manager', 'Helpline Team', 'Volunteer'), 
    allowNull: true
  },
  city: { 
    type: DataTypes.STRING, 
    allowNull:true
  },
  status: { 
    type: DataTypes.ENUM('Active', 'Inactive'), 
    defaultValue: 'Active' 
  },
  otp: { type: DataTypes.STRING, allowNull: true }, // For OTP login
  otpExpiry: { type: DataTypes.DATE, allowNull: true }
});

module.exports = User;