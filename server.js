const crypto = require("crypto");

var rp = require('request-promise');
var express = require('express'),
    app = express(),

    mongoose = require('mongoose'),

    Movie = require('./moviemodule'),
    users=require('./usermodule');
require('./userct.js');
Review=require('./review.js');
var Schema=mongoose.Schema;
var ObjectId=mongoose.Types.ObjectId;
var ids=new ObjectId("5aa9ddea061905551c1e3223");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admintest:admintest@ds163418.mlab.com:63418/webdb');
var http = require('http');
var cors = require('cors');
var bodyParser = require('body-parser');
var passport = require('passport');
require('dotenv').config();
var authJwtController = require('./auth_jwt');

var jwt = require('jsonwebtoken');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
var rou=require('./userou.js');
rou(app);
var router = express.Router();
var movie=mongoose.model('Movie'),
    Review=mongoose.model('Review');
var con=require('./moviect.js');

router.route('/movie/:id')
    .get(authJwtController.isAuthenticated,function(req,res){
        con.read_a_task(req,res);
    });
router.route('/movielist')
    .get(authJwtController.isAuthenticated,function (req, res) {
        con.list_all_tasks(req,res);

    });
router.route('/:md/movie?:reviews')
    .get(authJwtController.isAuthenticated,function(req,res){
         var ids=new ObjectId(req.params.md);
            Movie.aggregate([
                {
                    $match: {_id:ids}
                },

                {
                    $lookup: {
                        from: "reviews",
                        localField: "_id",
                        foreignField: "MovieId",
                        as: "reviews"
                    }
                }
                ], function (err, comments) {
                if (err)

                    res.send(err);
                res.json(comments);
            });  });

router.route('/movies?:reviews')
    .get(authJwtController.isAuthenticated,function(req,res){
    if(req.query.reviews ='true')
    Movie.aggregate([
        {
            $sort:{ avgRating: -1}
        },
                {
                    $lookup: {
                        from: "reviews",
                        localField: "_id",
                        foreignField: "MovieId",
                        as: "reviews"
                    }
                }
                ], function (err, comments) {
                if (err)

                    res.send(err);
                res.json(comments);
            }); 

    });
router.route('/newreviews')
    .post(authJwtController.isAuthenticated,function(req,res){
        //res.json('dasdasd');
        var new_task =new Review();
        new_task.RVName=process.env.USERNAME;
        new_task.MovieId = req.body.MovieId;
        new_task.Quote=req.body.Quote;
        new_task.Rating=req.body.Rating;
        new_task.save(function(err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });
    });
router.route('/movies')
    .post(authJwtController.isAuthenticated,function (req, res) {
        con.create_a_task(req,res);

    });
router.route('/movies/:Title')
    .get(authJwtController.isAuthenticated,function (req, res) {
        con.read_a_task(req,res);

    });
router.route('/movies/:title')
    .put(authJwtController.isAuthenticated,function (req, res) {
        con.update_a_task(req,res);

    });
router.route('/movies/:title')
    .delete(authJwtController.isAuthenticated,function (req, res) {
        con.delete_a_task(req,res);

    });
const GA_TRACKING_ID = process.env.GA_KEY;

function trackDimension(category, action, label, value, dimension, metric) {

    var options = { method: 'GET',
        url: 'https://www.google-analytics.com/collect',
        qs:
            {   // API Version.
                v: '1',
                // Tracking ID / Property ID.
                tid: GA_TRACKING_ID,
                // Random Client Identifier. Ideally, this should be a UUID that
                // is associated with particular user, device, or browser instance.
                cid: crypto.randomBytes(16).toString("hex"),
                // Event hit type.
                t: 'event',
                // Event category.
                ec: category,
                // Event action.
                ea: action,
                // Event label.
                el: label,
                // Event value.
                ev: value,
                // Custom Dimension
                cd1: dimension,
                // Custom Metric
                cm1: metric
            },
        headers:
            {  'Cache-Control': 'no-cache' } };

    return rp(options);
}


router.route('/test')
    .get(function (req,res) {

        // Event value must be numeric.
        trackDimension('Feedback', 'Rating', 'Feedback for Movie', '3', 'Guardian\'s of the Galaxy', '1')
            .then(function (response) {
                console.log(response.body);
                res.status(200).send('Event tracked.').end();
            })
    });


app.use('/', router);


app.listen(process.env.PORT || 4000);

console.log('todo list RESTful API server started on: ' +'4000' );

