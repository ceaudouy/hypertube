// const db = require('../../server');
// const jwt = require('jsonwebtoken');

// const conn = db.conn;

// function signOut(user) {
// 	return new Promise ((resolve, reject) => {
// 		const token = res.headers.authorization.split(' ')[1];
// 		const decodedToken = jwt.verify(token, 'qetuoadgjlxvnwryipsfhkzcbma');
// 		const userId = decodedToken.userId;
// 		const login = decodedToken.loginId;
// 		const role = decodedToken.role;

// 		if (resolve)

// 		// const token = localStorage.getItem('token');
// 		// const checkToken = jwt.verify(token, 'qetuoadgjlxvnwryipsfhkzcbma');
// 		// const loginToken = checkToken.loginId;
// 		// const idToken = checkToken.userId;

// 		console.log('ccc')
// 	})
// }

// module.exports.signOut = signOut;

// module.exports = (req, res, next) => {
// 	try {
// 	  const token = req.headers.authorization.split(' ')[1];
// 	  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
// 	  const userId = decodedToken.userId;
// 	  if (req.body.userId && req.body.userId !== userId) {
// 		throw 'Invalid user ID';
// 	  } else {
// 		next();
// 	  }
// 	} catch {
// 	  res.status(401).json({
// 		error: new Error('Invalid request!')
// 	  });
// 	}
//   };

//   async function auth(req, res, next) {
// 	try {
// 	  const { headers } = req;
// 	  /* 1. On vérifie que le header Authorization est présent dans la requête */
// 	  if (!headers || !headers.authorization) {
// 		return res.status(401).json({
// 		  message: 'Missing Authorization header'
// 		});
// 	  }

// 	  /* 2. On vérifie que le header Authorization contient bien le token */
// 	  const [scheme, token] = headers.authorization.split(' ');

// 	  if (!scheme || scheme.toLowerCase() !== 'bearer' || !token) {
// 		return res.status(401).json({
// 		  message: 'Header format is Authorization: Bearer token'
// 		});
// 	  }

// 	  /* 3. On vérifie et décode le token à l'aide du secret et de l'algorithme utilisé pour le générer */
// 	  const decodedToken = await jwt.verify(token, secret, {
// 		algorithms: algorithm
// 	  });

// 	  /* 4. On vérifie que l'utilisateur existe bien dans notre base de données */
// 	  const userId = decodedToken.sub;
// 	  const user = await User.findOne({ where: { id: userId } });

// 	  if (!user) {
// 		return res.status(401).json({
// 		  message: `User ${userId} not exists`
// 		});
// 	  }

// 	  /* 5. On passe l'utilisateur dans notre requête afin que celui-ci soit disponible pour les prochains middlewares */
// 	  req.user = user;

// 	  /* 7. On appelle le prochain middleware */
// 	  return next();
// 	} catch (err) {
// 	  return res.status(401).json({
// 		message: 'Invalid token'
// 	  });
// 	}
//   }
