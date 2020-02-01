import authService from '../services/authentication';

class LoginController{
    login(req, res){
        
        let data = {
            username: req.body.username,
            password: req.body.password
        };

        authService.generateToken(data)
            .then(token=>{
                res.json({success: true, user: data.username, token});
            }).catch(error=>{
                res.json({success: false, error});
            });
    }
}

module.exports = new LoginController();