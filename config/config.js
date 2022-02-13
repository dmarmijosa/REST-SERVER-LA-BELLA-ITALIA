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





const databaseConfig={
    'host':'ec2-52-30-133-191.eu-west-1.compute.amazonaws.com',
    'port':5432,
    'database':'dcjav7dg76hn9h',
    'user':'nqbcdzbxbooogb',
    'password': '061c74852e2e79f12dae7215c0f764588a0dde6db43336c46fca9252e24b4b2d'
};
/*
const databaseConfig={
    'host':'localhost',
    'port':5432,
    'database':'delivery_db',
    'user':'postgres',
    'password': '12251619'
};*/
const db= pgp(databaseConfig);

module.exports = db;
