const categoryController = require('../controllers/categories');
const passport = require('passport');
module.exports = (app)=>{
    app.get('/api/categories/getAll',passport.authenticate('jwt',{session: false}),  categoryController.getAll);
    app.get('/api/categories/findById/:id',passport.authenticate('jwt',{session: false}),categoryController.findById); 

    app.post('/api/categories/create',passport.authenticate('jwt',{session: false}), categoryController.create);
    app.put('/api/categories/update',passport.authenticate('jwt',{session: false}), categoryController.update)

}