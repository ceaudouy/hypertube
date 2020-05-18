import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Strategy as FTStrategy } from 'passport-42';
import { Strategy as GitHubStrategy } from 'passport-github';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

/* Routes */

import { userRouter, movieRouter } from 'routes';

const app = express();

const urlencodedParser = bodyParser.urlencoded({
	extended: true
});

app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
// disables 'x-powered-by', this makes it more difficult for users to see that we are using Express
app.disable('x-powered-by');
app.set('trust proxy', 1);

// Oauth 42
// app.use(new FortyTwoStrategy({
// 	clientID: "c455f7124e747b8aa997c911a5b8f18cab3f43f0b454cee14411e1d3e56cae80",
// 	clientSecret: "018bf1af403a3c06d4b8968fabf33ecea69db2787acc37df7983b9acd5c9244b",
// 	callbackURL: "http://localhost:3000/suggests",
// 	profileFields: {
// 		'name.givenName': 'first_name',
// 		'name.familyName': 'last_name',
// 		'username': 'login',
// 		'emails.0.value': 'email',
// 	}},
// 	function (accessToken, refreshToken, profile, cb) {
// 		User.findOrCreate({ fortytwoId: profile.id }, function (err, user) {
// 			return cb(err, user);
// 		});
// 	}
// ));

// // Oauth Github
// app.use(new GitHubStrategy({
// 	clientID: "56cde1b189c027546c85",
// 	clientSecret: "38c75383c9205d771272767fa094353187574128",
// 	callbackURL: "http://localhost:3000/suggests"
// 	},
// 	function(accessToken, refreshToken, profile, cb) {
// 		User.findOrCreate({ githubId: profile.id }, function (err, user) {
// 			return cb(err, user);
// 		});
// 	}
// ));

// Road 42
// app.get('/auth/42/callback', passport.authenticate('42', { failureRedirect: '/' }),
// 	function(req, res) {
// 		res.redirect('/suggests');
// });

// // Road Github
// app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
// 	function(req, res) {
// 		res.redirect('/suggests');
// });

app.use('/user', userRouter);
app.use('/movie', movieRouter);

// ERROR PAGES
app.use(function (req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Not found !');
});

// Listening Port
app.listen(3300);
