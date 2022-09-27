function handleError(err, req, res, next) {
	if (res.headersSent) return next(err);
	res.status(500).json({ error: "Internal Error", message: err.message });
}

function notFound(req, res) {
	res.status(404).json({ error: "Not Found" });
}

function autoCatch(handlers) {
	return Object.entries(handlers).reduce((acc, [key, handler]) => {
		acc[key] = (req, res, next) => {
			Promise.resolve(handler(req, res, next)).catch(next);
		};
		return acc;
	}, {});
}

module.exports = {
	handleError,
	notFound,
	autoCatch,
};
