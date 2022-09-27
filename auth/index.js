const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { autoCatch } = require("../middlewares");
const Strategy = require("passport-local").Strategy;

const User = require("../models/User");

const jwtSecret = process.env.JWT_SECRET || "duck duck";
const jwtOpts = { algorithm: "HS256", expiresIn: "30d" };

passport.use(
	new Strategy(async (username, password, cb) => {
		try {
			const user = await User.get(username);
			if (!user) return cb(null, false);

			const success = await bcrypt.compare(password, user.password);
			if (success)
				return cb(null, {
					username: user.username,
					role: user.role,
				});
		} catch (err) {
			cb(null, false);
		}
	})
);

const authenticate = passport.authenticate("local", { session: false });

function accessChecker(roles) {
	return async (req, res, next) => {
		const jwtString = req.headers.authorization || req.cookies.jwt;
		const payload = await verify(jwtString);
		if (roles.includes(payload.role)) return next();

		const err = new Error("Unauthorized");
		err.statusCode = 401;
		next(err);
	};
}

const hasSuperAdminAccess = accessChecker(["Super Admin"]);
const hasAdminAccess = accessChecker(["Admin", "Super Admin"]);
const hasUserAccess = accessChecker(["User", "Admin", "Super Admin"]);

function isAdmin(role) {
	return role && ["Admin", "Super Admin"].includes(role);
}

async function login(req, res) {
	const token = await sign({
		username: req.user.username,
		role: req.user.role,
	});
	res.cookie("jwt", token, { httpOnly: true });
	res.json({ success: true, token: token });
}

async function sign(payload) {
	const token = await jwt.sign(payload, jwtSecret, jwtOpts);
	return token;
}

async function verify(jwtString = "") {
	jwtString = jwtString.replace(/^Bearer /i, "");
	try {
		const payload = await jwt.verify(jwtString, jwtSecret);
		return payload;
	} catch (err) {
		err.statusCode = 401;
		throw err;
	}
}

module.exports = autoCatch({
	hasUserAccess,
	hasAdminAccess,
	hasSuperAdminAccess,
	authenticate,
	login,
	isAdmin,
});
