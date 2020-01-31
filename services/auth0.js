// import auth0 from 'auth0-js';
// import Cookies from 'js-cookie';
// import jwt from 'jsonwebtoken';
// import axios from 'axios';
// import jwk_decode from 'jwt-decode';

// class Auth0 {
// 	constructor() {
// 		this.auth0 = new auth0.WebAuth({
// 			domain: 'dev-5z8osyph.auth0.com',
// 			clientID: 'qiIfWiVHXdjsIVmOMq3P0Fqfjf7GAx4P',
// 			redirectUri: 'http://localhost:3000/callback',
// 			responseType: 'token id_token',
// 			scope: 'openid profile'
// 		});

// 		this.login = this.login.bind(this);
// 		this.logout = this.logout.bind(this);
// 		this.handleAuthentication = this.handleAuthentication.bind(this);
// 		// this.isAuthenticated = this.isAuthenticated.bind(this);
// 	}

// 	handleAuthentication() {
// 		return new Promise((reject, resolve) => {
// 			this.auth0.parseHash((err, authResult) => {
// 				if (authResult && authResult.accessToken && authResult.idToken) {
// 					this.setSession(authResult);
// 					resolve();
// 				} else if (err) {
// 					reject(err);
// 					console.log(err);
// 				}
// 			});
// 		});
// 	}

// 	login() {
// 		this.auth0.authorize();
// 	}

// 	// isAuthenticated() {
// 	// 	const expiresAt = Cookies.getJSON('expiresAt');
// 	// 	return new Date().getTime() < expiresAt;
// 	// }

// 	setSession(authResult) {
// 		// save token
// 		const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());

// 		localStorage.setItem('accessToken', authResult.accessToken);
// 		localStorage.setItem('id_token', authResult.idToken);
// 		localStorage.setItem('expires_at', expiresAt);

// 		// Cookies.set('user', authResult.idTokenPayload);
// 		// Cookies.set('jwt', authResult.idToken);
// 		// Cookies.set('expiresAt', expiresAt);
// 	}

// 	logout() {
// 		Cookies.remove('accessToken');
// 		Cookies.remove('id_token');
// 		Cookies.remove('expires_at');
// 		this.auth0.logout({
// 			returnTo: '',
// 			clientID: 'qiIfWiVHXdjsIVmOMq3P0Fqfjf7GAx4P'
// 		});
// 	}

// 	async getJWKS() {
// 		const res = await axios.get('https://dev-5z8osyph.auth0.com/.well-known/jwks.json');
// 		const jwks = res.data;
// 		return jwks;
// 	}

// 	async verifyToken(token) {
// 		debugger;
// 		if (token) {
// 			const decodedToken = jwt.decode(token, { complete: true });
// 			if (decodedToken) {
// 				// return undefined;
// 				alert('okey');
// 			}
// 			const jwks = await this.getJWKS();
// 			const jwk = jwks.keys[0];

// 			// Build certficate
// 			let certifi = JSON.stringify(jwk.x5c[0]);

// 			let Matched = /.{1,64}/g;
// 			certifi = certifi.match(Matched).join('\n');
// 			certifi = `----- Begin Certificate -----\n${certifi}\n----End Certificate-----\n`;

// 			if (jwk.kid === decodedToken.header.kid) {
// 				try {
// 					const verifiedToken = jwt.verify(token, certifi);
// 					console.log(verifiedToken);
// 					const expiresAt = verifiedToken.exp * 1000;
// 					return;

// 						verifiedToken && new Date().getTime() < expiresAt ? verifiedToken :
// 						undefined;
// 				} catch (error) {
// 					console.log(error);
// 					return undefined;
// 				}
// 			}
// 		}

// 		return undefined;
// 	}

// 	async clientAuth() {
// 		debugger;

// 		const token = Cookies.getJSON('jwt');
// 		const verifiedToken = await this.verifyToken(token);
// 		console.log('verifiedToken :', verifiedToken);
// 		return verifiedToken;
// 	}

// 	async serverAuth(req) {
// 		debugger;

// 		if (req.headers.cookie) {
// 			const tokenCookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith('jwt='));

// 			if (!tokenCookie) {
// 				return undefined;
// 			}

// 			const token = tokenCookie.split('=')[1];
// 			const verifiedToken = await this.verifyToken(token);

// 			return verifiedToken;
// 		}
// 		return undefined;
// 	}
// }

// const auth0Client = new Auth0();

// export default auth0Client;

// ============================================================

// auth0.js Without jwks

import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
// import { getCookieFromRequest } from './../helpers/utils';

class Auth0 {
	constructor() {
		this.auth0 = new auth0.WebAuth({
			domain: 'dev-5z8osyph.auth0.com',
			clientID: 'qiIfWiVHXdjsIVmOMq3P0Fqfjf7GAx4P',
			redirectUri: 'http://localhost:3000/callback',
			responseType: 'token id_token',
			scope: 'openid profile'
		});
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.handleAuthentication = this.handleAuthentication.bind(this);
	}

	handleAuthentication() {
		return new Promise((reject, resolve) => {
			this.auth0.parseHash((err, authResult) => {
				if (authResult && authResult.accessToken && authResult.idToken) {
					this.setSession(authResult);
					resolve();
				} else if (err) {
					reject(err);
					console.log(err);
				}
			});
		});
	}

	login() {
		this.auth0.authorize();
	}
	setSession(authResult) {
		// save token
		const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());

		// localStorage.setItem('accessToken', authResult.accessToken);
		// localStorage.setItem('id_token', authResult.idToken);
		// localStorage.setItem('expires_at', expiresAt);

		Cookies.set('user', authResult.idTokenPayload);
		Cookies.set('jwt', authResult.idToken);
		Cookies.set('expiresAt', expiresAt);
	}

	logout() {
		Cookies.remove('user');
		Cookies.remove('jwt');
		Cookies.remove('expiresAt');
		this.auth0.logout({
			returnTo: '',
			clientID: 'qiIfWiVHXdjsIVmOMq3P0Fqfjf7GAx4P'
		});
	}

	verifyToken(token) {
		if (token) {
			const decodedToken = jwt.decode(token);
			const expirestAt = decodedToken.exp * 1000;

			return ( decodedToken && new Date().getTime() < expirestAt) ? decodedToken : undefined;
		}
		return undefined;
	}

	clientAuth() {
		// return this.isAuthenticated();
		const token = Cookies.getJSON('jwt');
		const verifiedToken = this.verifyToken(token);
		return verifiedToken;
	}

	 serverAuth(req) {
		if (req.headers.cookie) {
			const tokenCookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith('jwt='));

			if (!tokenCookie) {
				return undefined;
			}

			const token = tokenCookie.split('=')[1];
			const verifiedToken = this.verifyToken(token);

			return verifiedToken;
		}
		return undefined;
	}
}

const auth0Client = new Auth0();
export default auth0Client;
