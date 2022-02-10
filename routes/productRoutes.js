const productsController = require('../controllers/products');
const passport = require('passport');
module.exports = (app,upload)=>{
    app.get('/api/products/findByCategory/:id_category',passport.authenticate('jwt',{session:false}),productsController.findByCategory);
    app.get('/api/products/findByCategoryAndProductName/:id_category/:product_name', passport.authenticate('jwt', {session: false}), productsController.findByCategoryAndProductName);
    
    app.post('/api/products/create', passport.authenticate('jwt', {session: false}), upload.array('image', 3), productsController.create);

    app.put('/api/products/updateProduct', passport.authenticate('jwt', {session: false}), upload.array('image', 3), productsController.updateProduct);
    
    app.delete('/api/products/deleteProduct/:id_product', passport.authenticate('jwt', {session: false}), productsController.deleteProduct);
    

}