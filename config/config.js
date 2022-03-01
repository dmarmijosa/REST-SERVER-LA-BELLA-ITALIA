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
    'database':'dcjo88b2kic6v9',
    'user':'hfladqvescwxxe',
    'password': '3d8a09ec0fcf7b7e4900e562d89ae567cebc8b86100bec201a97d11c4922ca6b',
    ssl: { rejectUnauthorized: false }
};
*/
const databaseConfig={
    'host':'localhost',
    'port':5432,
    'database':'delivery_db',
    'user':'postgres',
    'password': '12251619'
};
const db= pgp(databaseConfig);

module.exports = db;
