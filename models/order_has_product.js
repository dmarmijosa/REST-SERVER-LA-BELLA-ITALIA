const db = require('../config/config');

const OrderHasProducts = {};

OrderHasProducts.create = (id_order, id_product, quantity,detail) => {
    const sql = `
    INSERT INTO
        order_has_products(
            id_order,
            id_product,
            quantity,
            detail,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5, $6)
    `;

    return db.none(sql, [
        id_order,
        id_product,
        quantity,
        detail,
        new Date(),
        new Date()
    ]);
}

module.exports = OrderHasProducts;