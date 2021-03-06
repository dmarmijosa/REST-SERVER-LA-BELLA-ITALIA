const passport = require('passport');
const userController = require('../controllers/users');

module.exports = (app, upload)=>{
    
    app.get('/api/users/getAll',userController.getAll);
    app.get('/api/users/findById/:id',passport.authenticate('jwt',{session: false}),userController.findById);  
    app.get('/api/users/findByRol',passport.authenticate('jwt',{session: false}),userController.findByRol);  
    app.get('/api/users/recoverAccountUser/:email',userController.recoverAccount);  
    app.get('/api/users/findByEmail/:email',userController.findbyEmailUser);  
    app.get('/api/users/getStateRestaurant',userController.getIsAvaiableRestaurant);  
    app.get('/api/users/findDeliverys',userController.findDeliverys);  
    app.get('/api/users/getAdminsNotificationTokens', passport.authenticate('jwt', {session: false}), userController.getAdminsNotificationTokens);

    
    app.post('/api/users/create',upload.array('image',1),userController.registerWithImage);
    app.post('/api/users/login',userController.login);
    app.post('/api/users/logout',userController.logout);
    app.post('/api/users/addDelivery/:id',passport.authenticate('jwt',{session: false}),userController.addDelivery);

    app.put('/api/users/update',passport.authenticate('jwt',{session: false}),upload.array('image',1),userController.update);
    app.put('/api/users/updateStateRestaurant/:id',userController.updateStateRestaurant);
    app.put('/api/users/updateNotificationToken', userController.updateNotificationToken);

    app.delete('/api/users/deleteDelivery/:id',passport.authenticate('jwt',{session: false}),userController.deleteDelivery);

}