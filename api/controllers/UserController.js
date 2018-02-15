/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

module.exports = {
	login: function (req, res) {
        res.ok();
      },
    profile: function (req,res) {
        if(!req.user){
            res.redirect('/');
        }
        else{
        sails.log(req.user.username);
        res.send('You have logged in, This is your profile  ' + req.user.username);
        }
    },
    logout: function (req, res){
        req.logout();
        req.session.user = null;
       // req.session.flash = 'You have logged out';
        res.redirect('user/login');
    }, 
    
      
    // Facebook Authentication
    facebook: function (req, res, next) {
         passport.authenticate('facebook', { scope: ['email', 'user_about_me']},
            function (err, user) {
                req.logIn(user, function (err) {
                    if(err) {
                    //    req.session.flash = 'There was an error';
                        res.redirect('user/login');
                    } else {
                    req.session.user = user;
                    
                    res.redirect('user/profile');
                }
            });
        })(req, res, next);
      },
      callback: function (req, res, next) {
        passport.authenticate('facebook',
           function (req, res) {
              // res.send('Logged in');
           })(req, res, next);
     },

    
    // Google Authentication
    authenticate: function (req, res, next) {
        passport.authenticate('google', {scope:['https://www.googleapis.com/auth/userinfo.profile']},
           function (err, user) {
            sails.log('reached back to user/authenticate');
               //req.logIn(user, function (err) {
                if(err) {
                  //  req.session.flash = 'There was an error';
                    res.redirect('user/login');
                }
                else {
                   req.session.user = user;
                   return res.redirect('user/profile');
               }
        //   });
       })(req, res, next);
     },
   
     authcallback: function (req, res, next) {
        passport.authenticate('google'
       //  function (req,res) {
          //  sails.log('reached google callback');
        //       //return res.send(req.user);//res.send('Google Login Successful ' + req.user.username);
        //    }
        )(req, res, next);
     },

};

