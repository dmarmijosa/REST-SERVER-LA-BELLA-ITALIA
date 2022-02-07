const orderController = require('../controllers/orders');
const passport = require('passport');
module.exports = (app)=>{


    app.get('/api/order/findByStatus/:status', passport.authenticate('jwt', {session: false}), orderController.findByStatus);
    app.get('/api/order/findByDeliveryAndStatus/:id_delivery/:status', passport.authenticate('jwt', {session: false}), orderController.findByDeliveryAndStatus);
    app.get('/api/order/findByClientAndStatus/:id_client/:status', passport.authenticate('jwt', {session: false}), orderController.findByClientAndStatus);
   
    
    app.post('/api/order/create',passport.authenticate('jwt',{session: false}), orderController.create);
    
    
    app.put('/api/order/updateToDispathed',passport.authenticate('jwt',{session: false}), orderController.updateToDispatched);
    app.put('/api/order/updateToDispathedBack',passport.authenticate('jwt',{session: false}), orderController.updateToDispatchedBack);
    app.put('/api/order/updateToOnWay',passport.authenticate('jwt',{session: false}), orderController.updateOnTheWay);
    app.put('/api/order/updateToDelivered',passport.authenticate('jwt',{session: false}), orderController.updateToDelivered);
    app.put('/api/order/updateToCancel',passport.authenticate('jwt',{session: false}), orderController.updateSToCancel);
    app.put('/api/order/updateLatLng',passport.authenticate('jwt',{session: false}), orderController.updateLatLng);
    

}