const Products = require("../models/Product");

async function get(req, res, next) {
	const { id } = req.params;
	const product = await Products.get(id);
	if (!product) return next();
	res.status(200).json(product);
}

async function getAll(req, res) {
	const { offset = 0, limit = 25 } = req.query;
	const products = await Products.getAll({
		offset: +offset,
		limit: +limit,
	});

	if (products) return res.status(200).json(products);
	res.status(404).json({ message: "Products not found" });
}

async function create(req, res) {
	const product = await Products.create(req.body);
	res.status(201).json(product);
}

async function update(req, res) {
	const change = req.body;
	const product = await Products.update(req.params.id, change);
	res.json(product);
}

async function remove(req, res) {
	await Products.remove(req.params.id);
	res.status(200).json({ success: true });
}

module.exports = {
	get,
	getAll,
	create,
	update,
	remove,
};
