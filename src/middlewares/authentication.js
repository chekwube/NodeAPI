import authService from '../services/authentication';

class AuthMiddleware{
    authenticate(req, res, next) {
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token){
            authService.verifyToken(token)
                .then(decoded =>{
                    next();
                }).catch(error=>{
                    next(error);
                });
        } else{
            res.status(401).send({ error: "No token provided" });
        }
    }
}

module.exports = new AuthMiddleware();