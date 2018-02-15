var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy;

// function findById(id, fn) {
//   User.findOne(id).done(function (err, user) {
//     if (err) {
//       return fn(null, null);
//     } else {
//       return fn(null, user);
//     }
//   });
// }

function findByFacebookId(id, fn) {
  User.findOne({
    facebookid: id
  }).done(function (err, user) {
    if (err) {
      return fn(null, null);
    } else {
      return fn(null, user);
    }
  });
}

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function (id, done) {
  User.findOne(id).exec(function (err, user) {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: '1860823414228341',
    clientSecret: '5bef5bda8f1141a169a576aecc3ef67e',
    callbackURL: 'http://localhost:1337/user/facebook/callback',
    enableProof: false
  }, function (accessToken, refreshToken, profile, done) {
    sails.log(profile);
  //  findByFacebookId(profile.id, function (err, user) {
      var id= profile.id;
      // Create a new User if it doesn't exist yet
     //if (!user) {
      sails.log(typeof profile.id)
      User.findOne({facebookid:profile.id}).exec(function(err,user){
          if(err){
            return done(null,err);
          }
          else{
            if(!user){
              User.create({facebookid:profile.id}).exec(function(err,createUser){
                if(err){
                  return done(null,err);
                }
                else{
                  return done(null,createUser);
                }
              });
            }
            else{
              return done(null,user);
            }
          }
      });
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
  }
));
