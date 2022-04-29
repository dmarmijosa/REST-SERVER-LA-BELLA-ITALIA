const promise = require('bluebird');
const options = {
promiseLib: promise,
    query:(e)=>{

    }
};
const pgp = require('pg-promise')(options);


const types = pgp.pg.types;
types.setTypeParser(1114,function(stringValue){
    return stringValue;
});




/*
const databaseConfig={
    'host':'ec2-79-125-26-60.eu-west-1.compute.amazonaws.com',
    'port':5432,
    'database':
    'user':'hfladqvescwxxe',
    'password': 
    ssl: { rejectUnauthorized: false }
};
*/
const databaseConfig={
    'host':'localhost',
    'port':5432,
    'database':'delivery_db',
    'user':'postgres',
    'password': 
};
const db= pgp(databaseConfig);

module.exports = db;
