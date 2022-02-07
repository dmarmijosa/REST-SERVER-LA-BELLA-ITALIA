const express = require('express');
const http = require('http');

const logger = require('morgan');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const users = require('./routes/usersRoutes');
const category = require('./routes/categoryRoutes');
const product = require('./routes/productRoutes');
const address = require('./routes/addressRoutes');
const order = require('./routes/orderRoutes');


const multer = require('multer');
const admin = require('firebase-admin');
const ServiceAccout = require('./serviceAccountKey.json');

const passport = require('passport');
const io = require('socket.io')(server);

/*
* Socket
*/

const orderDelivery = require('./sockets/orders_delivery_socket');



/*
* Firebase
*/
admin.initializeApp({
    credential: admin.credential.cert(ServiceAccout)
})

const upload = multer({
    storage: multer.memoryStorage()
})



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.disable('x-powered-by');

const port = process.env.PORT || 3000;

orderDelivery(io);

app.set('port',port);
/*
 * Rutas
 */
users(app,upload);
product(app, upload);
category(app);
address(app);
order(app);

server.listen(3000,'192.168.1.150', function(){
    console.log('App corriendo');
});

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).send(
        err,stack);
})


module.exports ={
	app: app,
	server: server,
}