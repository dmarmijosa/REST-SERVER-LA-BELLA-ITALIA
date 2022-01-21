const Category = require('../models/category');

module.exports ={
    async getAll(req,res,next){
        try {
            const data = await Category.getAll();
            return res.status(201) .json(data);

        } catch (error) {
            console.log(`Error: ${error}`);    
            return res.status(501).json({
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
            console.log(`Categoria: ${data}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtenerla categoria por ID'
            });
        }
    },
    async create(req, res, next) {
        try {
            const category = req.body;
            console.log(`Categoria enviada: ${category}`);

            const data = await Category.create(category);

            return res.status(201).json({
                message: 'Categoría creada correctamente.',
                success: true,
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);    
            return res.status(501).json({
                message: 'Error al crear la categoría',
                success: false,
                error: error
            });
        }
    },
    
    async update(req, res, next) {
        try {
            const category = JSON.parse(req.body.category);
            console.log(`Datos enviados: ${JSON.stringify(category)}`);
            
            await Category.updateCategory(category);
            return res.status(201).json({
                success: true,
                message: 'Actualización exitosa',
                
            });
                     
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la actualización',
                error: error
            });
        }
    },

}