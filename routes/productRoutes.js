const productsController = require('../controllers/products');
const passport = require('passport');
module.exports = (app,upload)=>{
    

    app.post('/api/products/create', passport.authenticate('jwt', {session: false}), upload.array('image', 3), productsController.create);

}