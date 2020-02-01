var payloadValidator = require('../validators/index')

module.exports.payloadValidatorHandler = function (payload) {
	return async function (req, res, next) {
		payloadValidator(req.body, payload)
			.then((result) => {
				next();
			})
			.catch((error) => {
				res.status(400).json({
					"success": false,
					"error": "Please provide all the required fields"
				});
			});
	};
}