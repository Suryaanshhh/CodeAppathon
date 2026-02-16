const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { 
    type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'), 
    defaultValue: 'Pending' 
  },
  priority: { 
    type: DataTypes.ENUM('Low', 'Medium', 'High'), 
    defaultValue: 'Medium' 
  },
  deadline: { type: DataTypes.DATE },
  assignedTo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' }
  },
  assignedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' }
  }
});

module.exports = Task;