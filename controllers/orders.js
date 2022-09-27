const { isAdmin } = require("../auth");
const Order = require("../models/Order");

async function get(req, res, next) {
	const { id } = req.params;
	const order = await Order.get(id);
	if (
		order &&
		(isAdmin(req?.user?.role) || order.username === req.user.username)
	)
		res.json(order);
	else next();
}

async function getAll(req, res) {
	const { offset = 0, limit = 25 } = req.query;
	const orders = await Order.getAll({
		offset: +offset,
		limit: +limit,
	});
	res.json(orders);
}

async function create(req, res) {
	const fields = req.body;
	fields[username] = req.user.username;
	const order = await Order.create(req.body);
	res.json(order);
}

async function updateInfo(req, res) {
	const { id } = req.params;
	const change = req.body;
	const order = await Order.updateInfo(id, change);
	res.json(order);
}

async function updateStatus(req, res) {
	const { id } = req.params;
	const { status } = req.body;
	const order = await Order.updateStatus(id, status);
	res.json(order);
}

async function remove(req, res, next) {
	const { id } = req.params;
	const order = await Order.get(id);
	if (req?.user?.username === order.username) {
		await Order.remove(id);
		res.json({ success: true });
	} else {
		next();
	}
}

module.exports = {
	get,
	getAll,
	create,
	updateInfo,
	updateStatus,
	remove,
};
