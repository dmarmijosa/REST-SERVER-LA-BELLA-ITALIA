const db = require('../config/config');

const Category={};
Category.getAll = () => {

    const sql = `
        SELECT
            id,
            name,
            description
        FROM
            categories
        ORDER BY
            name
    `;

    return db.manyOrNone(sql);
}
Category.updateCategory =(category)=>{
    const sql = `
    UPDATE
        categories
    SET
        name = $2,
        description = $3,
        updated_at = 4
    WHERE
        id = $1
    `;
    
    return db.none(sql, [
        category.id,
        category.name,
        category.description,
        new Date()
    ]);
}


Category.findByCategoryId = (id) => {
    const sql = `
    SELECT
        C.id,
        C.name,
        C.description,
    FROM 
        categories AS C
    WHERE
        C.id = $1
    GROUP BY
        C.id
    `
    return db.oneOrNone(sql, id);
}

Category.create = (category) => {
    const sql = `
    INSERT INTO
        categories(
            name,
            description,
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3, $4) RETURNING id
    `;
    return db.oneOrNone(sql, [
        category.name,
        category.description,
        new Date(),
        new Date()
    ]);
}

module.exports = Category;