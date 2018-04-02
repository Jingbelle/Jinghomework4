module.exports=function(app) {
    var sectodo = require('./userct');
   app.route('/signup')
       .post(sectodo.newuser);
   app.route('/signin')
       .post(sectodo.login);

}