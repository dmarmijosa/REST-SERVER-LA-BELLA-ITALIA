const Category = require('../models/category');

module.exports ={
    async getAll(req,res,next){
        try {
            const data = await Category.getAll();
            return res.status(200) .json(data);

        } catch (error) {
            console.log(`Error: ${error}`);    
            return res.status(500).json({
                message: 'Error al obtener las categorías',
                success: false,
                error: error
            });
        }

    },
    async findById(req, res, next) {
        try {
            const id = req.params.id;

            const data = await Category.findByCategoryId(id);    
            
            return res.status(200).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al obtenerla categoria por ID'
            });
        }
    },
    async create(req, res, next) {
        try {
            const category = req.body;
            
            const data = await Category.create(category);

            return res.status(200).json({
                message: 'Categoría creada correctamente.',
                success: true,
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);    
            return res.status(500).json({
                message: 'Error al crear la categoría',
                success: false,
                error: error
            });
        }
    },
    
    async update(req, res, next) {
        try {
            const category = req.body;
            await Category.updateCategory(category);
            return res.status(200).json({
                success: true,
                message: 'Actualización exitosa',
                
            });
                     
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Hubo un error con la actualización',
                error: error
            });
        }
    },

    async deleteCategory(req,res,next){
        try {
            const id_category = req.params.id_category;
            console.log(`${id_category}  fasasfsa`); // CLIENTE
            await Category.delete(id_category);
            return res.status(200).json({
                success: true,
                message: 'Categoria eliminada correctamente'
            });
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                message: `Error al eliminar categoria`,
                success: false,
                error: error
            });
        }
    },

}