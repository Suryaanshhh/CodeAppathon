const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const VolunteerProfile = sequelize.define('VolunteerProfile', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: { model: 'Users', key: 'id' }
  },
  skills: { 
    type: DataTypes.TEXT, 
    allowNull: true 
  },
  onboardingDate: { 
    type: DataTypes.DATEONLY, 
    defaultValue: DataTypes.NOW 
  },
  totalDonationCampsAttended: { 
    type: DataTypes.INTEGER, 
    defaultValue: 0 
  },
  availabilityStatus: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: true 
  },
  bio: { 
    type: DataTypes.TEXT 
  }
});

module.exports = VolunteerProfile;