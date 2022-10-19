const User = require('./user');
const Record = require('./record');
const Budget = require('./budget');

// User one to many relationship to Post
User.hasMany(Record, {
    foreignKey: 'user_id'
});

// Record one to one relationship with User
Record.belongsTo(User, {
    foreignKey: 'user_id'
});

// Category one to many relationship to record
User.hasMany, (Budget, {
    foreignKey: 'user_id'
});

Budget.belongsTo(User, {
    foreign_key: 'user_id'
});

module.exports = { User, Record, Budget };