const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt; //Se extrae el Payload
const { getUserbyId } = require("@appModels/users");
const cleaner = require("@appHelpers/cleanResponses");
const { API_KEY } = process.env;

module.exports = (passport) => {
  //Clave a la cabecera
  const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  const opts = {
    jwtFromRequest,
    secretOrKey: API_KEY,
  };
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      authenticatingInDynamo(payload.userName, done);
    })
  );
};

function authenticatingInDynamo(userName, done) {
  getUserbyId(userName)
    .then((data) => {
      if (data.Count) {
        const cData = cleaner(data)
        return done(null, cData.Items[0]);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => done(err, null));
}
