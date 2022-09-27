const cuid = require("cuid");
const { isEmail, isAlphanumeric } = require("validator");
const bcrypt = require("bcrypt");
const db = require("../db/index");

const User = db.model("User", {
	_id: { type: String, default: cuid },
	username: usernameSchema(),
	firstName: { type: String },
	lastName: { type: String },
	email: emailSchema({ required: true }),
	password: { type: String, maxLength: 120, required: true },
	role: {
		type: String,
		enum: ["User", "Admin", "Super Admin"],
		default: "User",
	},
});

async function getAll({ offset = 0, limit = 25 }) {
	const users = await User.find().sort({ _id: 1 }).skip(offset).limit(limit);
	return users;
}

async function get(username) {
	const user = await User.findOne({ username });
	return user;
}

async function remove(username) {
	await User.deleteOne({ username });
}

async function create(fields) {
	const hashed = await hashPassword(fields["password"]);
	Object.assign(fields, { password: hashed });
	const user = new User(fields);
	await user.save();
	return user;
}

async function updateInfo(username, change) {
	const user = await get(username);
	if (req.user.username != username) return next();
	if (change.password) {
		change.password = await hashPassword(change.password);
	}
	Object.assign(user, change, { role: user.role });
	await user.save();
	return user;
}

async function updateRole(username, newRole) {
	const user = await get(username);
	user[role] = newRole;
	await user.save();
	return user;
}

function emailSchema({ required = false }) {
	return {
		type: String,
		required,
		validate: {
			validator: isEmail,
			message: (props) => `${props.value} is not a valid email.`,
		},
	};
}

function usernameSchema() {
	return {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		minLength: 3,
		maxLength: 16,
		validate: [
			{
				validator: isAlphanumeric,
				message: (props) =>
					`${props.value} contains special characters`,
			},
		],
	};
}

async function hashPassword(str) {
	if (str?.length >= 8) {
		const SALT_ROUNDS = +process.env.SALT_ROUNDS || 10;
		const hash = await bcrypt.hash(str, SALT_ROUNDS);
		return hash;
	}
	throw new Error("password must be at least 8 characters long");
}

module.exports = {
	get,
	getAll,
	create,
	updateInfo,
	updateRole,
	remove,
};
