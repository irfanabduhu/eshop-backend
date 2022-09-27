const User = require("../models/User");

async function get(req, res, next) {
	const { username } = req.params;
	const user = await User.get(username);
	if (!user) return next();
	res.status(200).json(user);
}

async function getAll(req, res) {
	const { offset = 0, limit = 25 } = req.query;
	const users = await User.getAll({
		offset: +offset,
		limit: +limit,
	});
	res.json(users);
}

async function create(req, res) {
	const user = await User.create(req.body);
	res.json(user);
}

async function updateInfo(req, res) {
	const { username } = req.params;
	const change = req.body;
	const user = await User.updateInfo(username, change);
	res.json(user);
}

async function updateRole(req, res) {
	const { username } = req.params;
	const { newRole } = req.body;
	const user = await User.updateRole(username, newRole);
	res.json(user);
}

async function remove(req, res) {
	const { username } = req.params;
	await User.remove(username);
	res.json({ success: true });
}

module.exports = {
	get,
	getAll,
	create,
	updateInfo,
	updateRole,
	remove,
};
