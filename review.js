var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var NotEmptyString={type:String, minLength:1};
var ObjectId = Schema.ObjectId;


var ReviewSchema=new Schema({
    MovieId:ObjectId,
    RVName: String,
    Quote:NotEmptyString,
    Rating: Number


});
var Review=mongoose.model('Review', ReviewSchema);
module.exports = Review;