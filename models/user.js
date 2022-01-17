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
    const sql = `INSERT INTO users(email,name,lastname, phone,image,password,created_at,updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`
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

User.update = (user) => {
    const myPassCrypto = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = myPassCrypto;
    const sql = `
    UPDATE
        users
    SET
        name = $2,
        lastname = $3,
        phone = $4,
        image = $5,
        password = $6,
        updated_at = $7
    WHERE
        id = $1
    `;

    return db.none(sql, [
        user.id,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        user.password,
        new Date()
    ]);
}

User.updateToken = (id,token) => {
    const sql = `
    UPDATE
        users
    SET
        session_token = $2
        
    WHERE
        id = $1
    `;

    return db.none(sql, [
        id,
        token
    ]);
}


User.findByUserId = (id) => {
    const sql = `
    SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.password,
        U.session_token,
        json_agg(
            json_build_object(
                'id', R.id,
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
        ) AS roles
    FROM 
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON
        R.id = UHR.id_rol
    WHERE
        U.id = $1
    GROUP BY
        U.id
    `
    return db.oneOrNone(sql, id);
}

User.findByEmail=(email)=>{
    const sql = `
    select 
        u.id,
        u.email,
        u.name,
        u.lastname,
        u.image,
        u.phone,
        u.password,
        u.session_token,
        json_agg(
            json_build_object(
                'id', r.id,
                'name',r.name,
                'image',r.image,
                'route',r.route
            )
        )as roles
    from
        users as u
    INNER JOIN
        user_has_roles as uhr
    on
        uhr.id_user = u.id
    INNER JOIN
        roles as r
    on
        r.id = uhr.id_rol
    where
        u.email = $1
    GROUP BY
        u.id
`;
    return db.oneOrNone(sql,email);
}
updatePassword = (email, password) => {
    const myPassCrypto = crypto.createHash('md5').update(password).digest('hex');
    
    const sql = `
    UPDATE
        users
    SET
        password = $2,
        updated_at = $3
    WHERE
        email = $1
    `;

    return db.none(sql, [
        email,
        myPassCrypto,
        new Date()
    ]);
}

User.isPasswordMatch = (userPassword,hash)=>{
    const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
    if (myPasswordHashed === hash) {
        return true;
    }
    return false;
}
module.exports = User;


