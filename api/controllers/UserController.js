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
    
      dashboard: function (req, res) {
        res.view();
      },
    
      logout: function (req, res){
        req.session.user = null;
        req.session.flash = 'You have logged out';
        res.redirect('user/login');
      },
    
      facebook: function (req, res, next) {
         passport.authenticate('facebook', { scope: ['email', 'user_about_me']},
            function (err, user) {
                req.logIn(user, function (err) {
                if(err) {
                    req.session.flash = 'There was an error';
                    res.redirect('user/login');
                } else {
                    req.session.user = user;
                    res.send(user);
                }
            });
        })(req, res, next);
      },
    
      callback: function (req, res, next) {
         passport.authenticate('facebook',
            function (req, res) {
               // res.send('Logged in');
            })(req, res, next);
      }
};

