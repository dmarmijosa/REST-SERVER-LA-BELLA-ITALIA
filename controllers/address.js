const Address = require('../models/address');

module.exports={
    async findByUser(req, res, next) {
        try {
            const id_user = req.params.id_user;
            const data = await Address.findByUser(id_user);
           
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las direcciones',
                error: error,
                success: false
            })
        }
    },
    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const data = await Address.delete(id);
            
            return res.status(201).json({
                success: true,
                message: 'La dirección se ha eliminado.',
                
            });
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de eliminar la dirección.',
                error: error,
                success: false
            })
        }
    },
    
    async create(req,res,next){
        try {
            const address = req.body;
            const data = await Address.create(address);

            return res.status(201).json({
                success: true,
                message: 'La direccion se creo correctamente',
                data: data.id
            });
        } catch (error) {
            console.log(`Error ${error}`);  
            return res.status(500).json({
                success: false,
                message: 'Error al momento crear la dirección',
                error: error
            });
        }
    }
}