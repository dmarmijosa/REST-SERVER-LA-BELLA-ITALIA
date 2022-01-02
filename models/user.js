const db = require('../config/config');
const crypto = require ('crypto');


const User = {}
User.getAll=()=>{
    const sql = `SELECT * FROM users`;
    return db.manyOrNone(sql);
};

User.create=(user)=>{
    const myPassCrypto = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = myPassCrypto;
    const sql = `INSERT INTO users(email,name,lastname, phone,image,password,created_at,update_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`
    return db.oneOrNone(sql,[
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        user.password,
        new Date(),
        new Date(),
    ]);
}

User.findById= async (id,callback)=>{
    const sql = `
    select 
        id,
        email,
        name,
        lastname,
        image,
        phone,
        password,
        session_token
    from
	    users
    where
	    id = $1`;
    const user = await db.oneOrNone(sql, id);
    callback(null, user);
}
User.findByEmail=(email)=>{
    const sql = `
    select 
        id,
        email,
        name,
        lastname,
        image,
        phone,
        password,
        session_token
    from
	    users
    where
	    email = $1`;
    return db.oneOrNone(sql,email);
}

User.isPasswordMatch = (userPassword,hash)=>{
    const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
    if (myPasswordHashed === hash) {
        return true;
    }
    return false;
}
module.exports = User;


