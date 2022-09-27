const cuid = require("cuid");
const { isURL } = require("validator");
const db = require("../db/index");

const Product = db.model("Product", {
	_id: { type: String, default: cuid },
	name: { type: String, required: true },
	category: { type: [String], index: true },
	description: { type: String },
	price: { type: Number },
	img: urlSchema({ required: true }),
	inStock: { type: Number },
});

async function getAll({ offset = 0, limit = 10 }) {
	const products = await Product.find()
		.sort({ _id: 1 })
		.skip(offset)
		.limit(limit);

	return products;
}

async function get(_id) {
	const product = await Product.findById(_id);
	return product;
}

async function create(fields) {
	const product = await new Product(fields).save();
	return product;
}

async function update(_id, change) {
	const product = await get(_id);
	Object.keys(change).forEach((key) => {
		product[key] = change[key];
	});

	await product.save();
	return product;
}

async function remove(_id) {
	await Product.deleteOne({ _id });
}

function urlSchema(opts = {}) {
	const required = opts?.required ?? false;
	return {
		type: String,
		required,
		validate: {
			validator: isURL,
			message: (props) => `${props.value} is not a valid URL`,
		},
	};
}

module.exports = {
	create,
	get,
	getAll,
	update,
	remove,
};
