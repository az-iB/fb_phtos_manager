var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Photos = new Schema({
        name: { type: String, default: 'empty name...' }
      , created_time: { type: String, default: 'empty date' }
      , id: {type: String, default: ''}
      , albumId: {type: String, default: ''}
      , url: {type: String, default: ''}
});

var Albums = new Schema({
        name: { type: String, default: 'empty name...' }
      , created_time: { type: String, default: 'empty date' }
      , cover_photo : {}
      , id: {type: String, default: ''}
});

var UserSchema = new Schema({
    name: String,
    email: String,
    username: {
        type: String,
        trim: true,
        unique: true
    },
    password: String,
    avatar: String,
    hasAccess: {
        type: Boolean,
        default: false
    },
    provider: String,
    providerId: String,
    providerData: {},
    albums:[Albums],
    photos: [Photos],
    synced:{
        type: Boolean,
        default: false
    }
});

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne(
        {username: possibleUsername},
        function(err, user) {
            if (!err) {
                if (!user) {
                    callback(possibleUsername);
                }
                else {
                    return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
                }
            }
            else {
                callback(null);
            }
        }
    );
};

mongoose.model('User', UserSchema);