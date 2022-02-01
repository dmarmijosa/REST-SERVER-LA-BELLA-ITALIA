const orderController = require('../controllers/orders');
const passport = require('passport');
module.exports = (app)=>{


    app.get('/api/order/findByStatus/:status', passport.authenticate('jwt', {session: false}), orderController.findByStatus);
    app.get('/api/order/findByDeliveryAndStatus/:id_delivery/:status', passport.authenticate('jwt', {session: false}), orderController.findByDeliveryAndStatus);
   
    
    app.post('/api/order/create',passport.authenticate('jwt',{session: false}), orderController.create);
    
    
    app.put('/api/order/updateToDispathed',passport.authenticate('jwt',{session: false}), orderController.updateToDispatched);
    

}