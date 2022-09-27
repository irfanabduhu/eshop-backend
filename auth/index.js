const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;

const SALT_ROUNDS = 10;
const jwtSecrete = process.env.JWT_SECRET || "duck duck";
const jwtOpts = { algorithm: "HS256", expiresIn: "30d" };

async function hashPassword(str) {
	if (str.length < 8)
		throw new Error("password must be at least 8 characters long");

	const hash = await bcrypt.hash(str, SALT_ROUNDS);
	return hash;
}

module.exports = {
	hashPassword,
};
