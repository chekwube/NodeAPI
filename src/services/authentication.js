import jwt from 'jsonwebtoken';
const secret = process.env.SECRET;

class Authentication{
    generateToken(data){
        return new Promise((resolve, reject) => {
            jwt.sign(data, secret, { expiresIn: '24hr' }, function(error, token) {
                if (error) {
                    reject(error);
                } else {
                    resolve(token);
                }
            });
        });
    }

    verifyToken(token){
        return new Promise((resolve, reject) => {
            jwt.verify(token.replace("Bearer ", ""), secret, function(error, decodedToken) {
                if (error) {
                    reject(error);
                } else {
                    resolve(decodedToken);
                }
            });
        });
    }
}

module.exports = new Authentication();