const Order = require('../models/order');
const OrderHasProduct = require('../models/order_has_product');

module.exports={
    async findByStatus(req, res, next) {

        try {
            const status = req.params.status;
            const data = await Order.findByStatus(status);
            console.log(`Status ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Error al obtener las ordenes por estado',
                error: error,
                success: false
            })
        }

    },
    async create(req, res, next) {
        try {
            
            let order = req.body;
            order.status = 'CREADA';
            const data = await Order.create(order);
            
            console.log('LA ORDEN SE CREO CORRECTAMENTE');

            for (const product of order.products) {
                await OrderHasProduct.create(data.id, product.id, product.quantity, product.detail);
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se creo correctamente',
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error creando la orden',
                error: error
            });
        }
    },
    async findByDeliveryAndStatus(req, res, next) {

        try {
            const id_delivery = req.params.id_delivery;
            const status = req.params.status;

            const data = await Order.findByDeliveryAndStatus(id_delivery, status);
            console.log(`Status delivery ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las ordenes por estado',
                error: error,
                success: false
            })
        }

    },

    async findByClientAndStatus(req, res, next) {

        try {
            const id_client = req.params.id_client;
            const status = req.params.status;

            const data = await Order.findByClientAndStatus(id_client, status);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las ordenes por estado',
                error: error,
                success: false
            })
        }

    },
    async updateToDispatched(req, res, next) {
        try {
            
            let order = req.body;
            order.status = 'DESPACHADA';
            await Order.update(order);
            

            return res.status(201).json({
                success: true,
                message: 'La orden se actualizo correctamente',
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    },

    async updateOnTheWay(req, res, next) {
        try {
            
            let order = req.body;
            order.status = 'EN CAMINO';
            await Order.update(order);
            

            return res.status(201).json({
                success: true,
                message: 'La orden se actualizo correctamente',
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    },

    async updateToDelivered(req, res, next) {
        try {
            
            let order = req.body;
            order.status = 'ENTREGADA';
            await Order.update(order);
            

            return res.status(201).json({
                success: true,
                message: 'La orden se actualizo correctamente',
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    },

    async updateLatLng(req, res, next) {
        try {
            
            let order = req.body;
            await Order.updateLatLng(order);
            
            return res.status(201).json({
                success: true,
                message: 'La orden se actualizo correctamente',
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    }
}