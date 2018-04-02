
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NotEmptyString={type: String, minLength:1};
var UserSchema = new Schema({
    name: String,
    username: { type: String, required: true, index: { unique: true }},

    password: {type: String, required: true, select: false, stringTransform: function(string) {
    if(!passwordHash.isHashed(string)) {

        string = passwordHash.generate(string);
    }
    return string;}

}});

module.exports = mongoose.model('User', UserSchema);