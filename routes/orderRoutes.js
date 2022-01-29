const orderController = require('../controllers/orders');
const passport = require('passport');
module.exports = (app)=>{
    
    app.post('/api/order/create',passport.authenticate('jwt',{session: false}), orderController.create);
    

}