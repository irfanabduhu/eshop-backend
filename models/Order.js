const cuid = require("cuid");
const { Schema } = require("mongoose");
const db = require("../db/index");

const Order = db.model("Order", {
	_id: { type: String, default: cuid },
	totalPrice: { type: Number, required: true },
	totalItems: { type: Number, required: true },
	userId: { type: Schema.Types.ObjectId, ref: "User" },
	status: {
		type: String,
		enum: ["Pending", "Approved", "Shipped", "Delivered"],
		default: "Pending",
	},
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: "Product",
		},
	],
});

async function getAll({ offset = 0, limit = 25 }) {
	const orders = await Order.find().skip(offset).limit(limit);
	return orders;
}

async function get(_id) {
	const order = await Order.findById(_id);
	return order;
}

async function create(fields) {
	const order = await new Order(fields).save();
	return order;
}

async function update(_id, change) {
	const order = await get(_id);
	Object.keys(change).forEach((key) => {
		order[key] = change[key];
	});

	await order.save();
	return order;
}

async function remove(_id) {
	await Order.deleteOne({ _id });
}

module.exports = {
	get,
	getAll,
	create,
	update,
	remove,
};
