import authController from '../controllers/authentication';
import patchController from '../controllers/jsonPatcher';
import thumbnailController from '../controllers/thumbnailGenerator';
import authMiddleware from '../middlewares/authentication';
let loginValidator = require('../validators/loginValidator');
let validator = require('../middlewares/payloadErrorHandler');

module.exports = (router) => {
    router.post('/login', validator.payloadValidatorHandler(loginValidator.payload), authController.login);
    router.patch('/jsonpatcher', authMiddleware.authenticate, patchController.patchData);
    router.get('/generatethumbnail', authMiddleware.authenticate, thumbnailController.generateThumbnail);

    return router;
}