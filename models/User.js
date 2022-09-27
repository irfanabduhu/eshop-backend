const cuid = require("cuid");
const { Schema } = require("mongoose");
const { isEmail, isAlphanumeric } = require("validator");
const db = require("../db/index");
const { hashPassword } = require("../auth/index");

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
	orders: [
		{
			type: Schema.Types.ObjectId,
			ref: "Order",
		},
	],
});

async function getAll({ offset = 0, limit = 25 }) {
	const users = await User.find().sort({ _id: 1 }).skip(offset).limit(limit);
	return users;
}

async function get(_id) {
	const user = await User.findOne({ username });
	return user;
}

async function remove(username) {
	await User.deleteOne({ username });
}

async function create(fields) {
	const hashed = await hashPassword(fields["password"]);
	Object.assign(fields, { password: hased });
	const user = new User(fields);
	await user.save();
	return user;
}

async function updateInfo(username, change) {
	const user = await get(username);
	if (change.password) {
		change.password = await hashPassword(change.password);
	}
	Object.keys(change).forEach((key) => {
		if (key == "role") return;
		user[key] = change[key];
	});
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

module.exports = {
	get,
	getAll,
	create,
	updateInfo,
	updateRole,
	remove,
};
