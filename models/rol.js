const db = require('../config/config');
const Rol={};

Rol.create=(id_user, id_rol)=>{
    const sql=`
    INSERT INTO
        user_has_roles(
            id_user,
            id_rol,
            created_at,
            updated_at
        )
        values($1,$2,$3,$4)
    `;
    return db.none(sql,[
        id_user,
        id_rol,
        new Date(),
        new Date()
    ]);
}

Rol.findByDataRestaurant=()=>{
    const sql=`
    SELECT 
        u.id,
        u.name,
        u.lastname,
        u.phone,
        u.email
    FROM users as u
    INNER JOIN
        user_has_roles AS uhr
    ON 
        uhr.id_rol =2 AND u.id = uhr.id_user
    `;
    return db.oneOrNone(sql);

}

module.exports = Rol;