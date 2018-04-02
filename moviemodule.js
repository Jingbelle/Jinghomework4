'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NotEmptyString={type:String, minLength:1};
var Notnumber={type: Number, max:2018};

var Actorschema=new Schema({
    ActorName:NotEmptyString,
    CharacterName:NotEmptyString
});
//var Actortype={type: Actorschema};
var moviesSchema=new Schema({
    Title: NotEmptyString,
    Yearreleased: Notnumber,
    Genre: {
        type: String, enum: ['Action', 'Adventure','Comedy','Drama','Fantasy',
            'Horror','Mystery','Thriller','Western','Biography']},
    Actors:[Actorschema]

});

module.exports = mongoose.model('Movie', moviesSchema);