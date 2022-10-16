const User = require('./user');
const Record = require('./record');
const Category = require('./category');

// User one to many relationship to Post
User.hasMany(Record, {
    foreignKey: 'user_id'
});

// Record one to one relationship with User
Record.belongsTo(User, {
    foreignKey: 'user_id'
});

// Category one to many relationship to record
Category.hasMany(Record, {
    foreignKey: 'category_id'
});


// Record one to one relationship with Catogory
Record.belongsTo(Category, {
    foreignKey: 'category_id'
});

module.exports = { User };