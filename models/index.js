const User = require('./user');
const VolunteerProfile = require('./VolunteerProfile');
const Task = require('./Task');

User.hasOne(VolunteerProfile, { foreignKey: 'userId', onDelete: 'CASCADE' });
VolunteerProfile.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Task, { foreignKey: 'assignedTo', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'assignedTo', as: 'volunteer' });
Task.belongsTo(User, { foreignKey: 'assignedBy', as: 'manager' });

module.exports = { User, VolunteerProfile };