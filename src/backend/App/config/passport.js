const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt; //Se extrae el Payload
const { getUserbyId } = require("@appModels/users");
const cleaner = require("@appHelpers/cleanResponses");
const { API_KEY } = process.env

const opts = {};
//Clave a la cabecera
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = API_KEY;

module.exports = passport => {
  console.log("Authenticating");
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      //console.log(jwt_payload);
      const user = await getUserbyId(jwt_payload.userName);
      if (user.Count) {
        return done(null, user);
      } 
      return done(null, false);
    })
  );
};
