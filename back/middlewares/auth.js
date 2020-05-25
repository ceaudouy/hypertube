import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import {Strategy as JwtStrategy} from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';

import { User } from 'models';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(new JwtStrategy(opts, async (jwt, done) => {
  try {
    const user = await User.findOne({ where: {id: jwt.sub} });
    if (user)
      return done(null, user);
    else
      return done(null, false);
  } catch (err) {
    return done(err, false);
  } 
}));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: "http://localhost:3300/user/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOrCreate({
      where: { githubId: profile.id },
      defaults: {
        login: profile.username,
        email: profile.email
      }
    });
    if (user) {
      if (!user.token) {
        user = await User.update({
          token: jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        }, {
          where: { id: user.id }
        });
      }
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
}
));

export const auth = passport.authenticate('jwt', { session: false });

export default passport;