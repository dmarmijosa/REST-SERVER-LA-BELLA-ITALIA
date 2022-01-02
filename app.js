const express = require('express');
const http = require('http');

const logger = require('morgan');
const cors = require('cors');
const { status } = require('express/lib/response');

const app = express();
const server = http.createServer(app);

const users = require('./routes/usersRoutes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(cors());

app.disable('x-powered-by');

const port = process.env.PORT || 3000;

app.set('port',port);
/*
 * Rutas
 */
users(app);


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