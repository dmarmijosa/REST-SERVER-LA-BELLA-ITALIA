const passport = require('passport');
const userController = require('../controllers/users');

module.exports = (app, upload)=>{
    
    app.get('/api/users/getAll',userController.getAll);
    app.get('/api/users/findById/:id',passport.authenticate('jwt',{session: false}),userController.findById);  
    app.get('/api/users/recoverAccountUser/:email',userController.recoverAccount);  
    
    
    app.post('/api/users/create',upload.array('image',1),userController.registerWithImage);
    app.post('/api/users/login',userController.login);
    app.post('/api/users/logout',userController.logout);

    app.put('/api/users/update',passport.authenticate('jwt',{session: false}),upload.array('image',1),userController.update);

}