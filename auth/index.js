const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

async function hashPassword(str) {
	if (str.length < 8)
		throw new Error("password must be at least 8 characters long");

	const hash = await bcrypt.hash(password, SALT_ROUNDS);
	return hash;
}

module.exports = {
	hashPassword,
};
