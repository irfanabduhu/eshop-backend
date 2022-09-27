const Order = require("../models/Order");

async function get(req, res, next) {
	const { id } = req.params;
	const order = await Order.get(id);
	if (!order) return next();
	res.json(order);
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
	const order = await Order.create(req.body);
	res.json(order);
}

async function update(req, res) {
	const { id } = req.params;
	const change = req.body;
	const order = await Order.update(id, change);
	res.json(order);
}

async function remove(req, res) {
	await Order.remove(req.params.id);
	res.json({ success: true });
}

module.exports = {
	get,
	getAll,
	create,
	update,
	remove,
};
