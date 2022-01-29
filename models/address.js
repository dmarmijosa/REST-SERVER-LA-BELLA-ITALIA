const db = require('../config/config');

const Address = {};


Address.findByUser = (id_user) => {
    const sql = `
    SELECT
        id,
        id_user,
        address,
        town,
        lat,
        lng
    FROM
        address
    WHERE 
        id_user = $1
    `;

    return db.manyOrNone(sql, id_user);
}
Address.delete = (id)=>{
    const sql = 
    `
    DELETE FROM 
        address
    WHERE id=$1
    `;
    return db.none(sql,id);
}

Address.create = (address) => {
    const sql = `
    INSERT INTO
        address(
            id_user,
            address,
            town,
            lat,
            lng,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id
    `;

    return db.oneOrNone(sql, [
        address.id_user,
        address.address,
        address.town,
        address.lat,
        address.lng,
        new Date(),
        new Date()
    ]);
}


module.exports = Address;