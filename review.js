var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var NotEmptyString={type:String, minLength:1};

var Numberr={type: Number, max:5,min:1};

var ReviewSchema=new Schema({
    Title:NotEmptyString,
    RVName: String,
    Quote:NotEmptyString,
    Rating: Numberr

});
var Review=mongoose.model('Review', ReviewSchema);
module.exports = Review;