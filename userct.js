
var mongoose=require('mongoose'),
    user=mongoose.model('User');

var jwt=require('jsonwebtoken');


exports.newuser=function(req,res){
    var newuser=new user();
    newuser.username=req.body.username;
    newuser.password=req.body.password;
    newuser.name=req.body.name;
    newuser.save(function(err,saved){
        if(err)
            res.send(err);
        else return res.json({message: 'nn create successfully'});
    });
};


exports.login=function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    user.findOne({username:username, password: password}, function(err,user){
        if(err)
            res.send(err);
        else {
          // res.json(user);
            var userToken={name:user.name,username:user.username};
           var token=jwt.sign(userToken,process.env.MYKEY);

           return res.json({success: true, token: 'JWT '+token});

        }
    });
};





