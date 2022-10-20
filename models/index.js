const User = require('./user');
const Record = require('./record');
const Budget = require('./budget');
const Category = require('./category');

User.hasMany(Category, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
});
Category.belongsTo(User, {
    onDelete: 'CASCADE',
});
// User one to many relationship to Post
User.hasMany(Record, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
});

// Record one to one relationship with User
Record.belongsTo(User, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
});

// Category one to many relationship to record
User.hasMany, (Budget, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
});

Budget.belongsTo(User, {
    onDelete: 'CASCADE',
    foreign_key: 'user_id'
});


module.exports = { User, Record, Budget };