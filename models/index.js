const User = require('./user');
const Record = require('./record');
const Category = require('./category');

// User one to many relationship to Post
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// User one to many relationship to Comment
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// Post one to one relationship with User
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// Post one to many relationship with Comment
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// Comment one to one relationship with User
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// Comment one to one relationship with Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});


module.export = { User };