const Joi = require('@hapi/joi');

const payload = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = {
    payload
}