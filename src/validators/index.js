const Joi = require('@hapi/joi');

module.exports = function validate(data, payload) {
    return new Promise((resolve, reject) => {
        Joi.validate(data, payload)
        .then(result => {
           resolve();
        })
        .catch(error => {
            reject(error);
        });

    })
}