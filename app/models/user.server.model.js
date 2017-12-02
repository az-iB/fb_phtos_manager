var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    email: String,
    username: {
        type: String,
        trim: true,
        unique: true
    },
    password: String,
    provider: String,
    providerId: String,
    providerData: {}
});



mongoose.model('User', UserSchema);