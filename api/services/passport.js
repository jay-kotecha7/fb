var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
function findById(id, fn) {
  User.findOne(id).done(function (err, user) {
    if (err) {
      return fn(null, null);
    } else {
      return fn(null, user);
    }
  });
}

// function findByFacebookId(id, fn) {
//   User.findOne({
//     facebookid: id
//   }).done(function (err, user) {
//     if (err) {
//       return fn(null, null);
//     } else {
//       return fn(null, user);
//     }
//   });
// }

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function (id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

var verifyHandler=function (accessToken, refreshToken, profile, done) {
  sails.log(profile);
//  findByFacebookId(profile.id, function (err, user) {
    var id = profile.id;
    // Create a new User if it doesn't exist yet
   //if (!user) {
    sails.log(typeof profile.id);
    User.findOne({userId:profile.id}).exec(function(err,user){
        if(err){
          return done(null,err);
        }
        else{
          if(!user){
            User.create({userId:profile.id, username:profile.displayName, provider:profile.provider}).exec(function(err,user){
              if(err){
                return done(null,err);
              }
              else{
    
                return done(null,user);
              
              }
            });
          }
          else{
      
            return done(null,user);
    
          }
        }
    });
  }
    // sails.log(typeof User.attributes.facebookid)
                          // User.create(
                          //   {facebookid: id})
                            
                          //   // You can also add any other data you are getting back from Facebook here 
                          //   // as long as it is in your model

                          // .exec(function (err, user) {
                          //   if (user) {
                          //     return done(null, user, {
                          //       message: 'Logged In Successfully'
                          //     });
                          //   } else {
                          //     return done(err, null, {
                          //       message: 'There was an error logging you in with Facebook'
                          //     });
                          //   }
                          // });

    //If there is already a user, return it
  //  } 
  //  else {
  //    return done(null, user, {
  //      message: 'Logged In Successfully'
  //    });
  //   }
// });




passport.use(new FacebookStrategy({
    clientID: '1860823414228341',
    clientSecret: '5bef5bda8f1141a169a576aecc3ef67e',
    callbackURL: 'http://localhost:1337/user/facebook/callback',
    enableProof: false
  },verifyHandler));

  passport.use(new GoogleStrategy({
    clientID:"444898618193-thmlidkh4vjnpf9napj857c0tqeb6atk.apps.googleusercontent.com",
    clientSecret: "zDtdjkde4m8flGH0Fpi-r-VH",
    callbackURL: "http://localhost:1337/user/authcallback",
    //passReqToCallback: true,
    },verifyHandler));