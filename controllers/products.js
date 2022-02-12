const storage = require('../utils/cloud_storage');
const asyncforEach = require('../utils/async_foreach');

const Product = require('../models/product');

module.exports={
    async create(req, res, next) {

        let product = JSON.parse(req.body.product);
        const files = req.files;
        let inserts = 0;
        if(files.length ===0){
            return res.status(500).json({
                message: 'EL producto no tiene imagenes',
                success: false
            });
        }else{
            try {
                
                const data = await Product.create(product);
                product.id = data.id

                const start = async()=>{
                    await asyncforEach(files, async (file)=>{
                        const pathImage = `image_${Date.now()}`;
                        const url = await storage(file, pathImage);
                        if(url != undefined && url != null){
                            if(inserts ==0){
                                product.image1 = url;
                            }
                            else if(inserts==1){
                                product.image2 = url;
                            }else if(inserts==2){
                                product.image3 = url;
                            }
                        }
                        await Product.update(product);
                        inserts =inserts+1;
                        if (inserts == files.length) {
                            return res.status(200).json({
                                success: true,
                                message: 'Producto registrado correctamente'
                            });
                        }

                         
                    });
                }
                start();
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    message:`Error al registrar el producto ${error}`,
                    success:false,
                    error:error
                });
            }
        }

    },
    async deleteProduct(req,res,next){
        try {
            const id_product = req.params.id_product; // CLIENTE
            await Product.delete(id_product);
            return res.status(200).json({
                success: true,
                message: 'Producto eliminado correctamente'
            });
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                message: `Error al eliminar producto`,
                success: false,
                error: error
            });
        }
    },


    async updateProduct(req, res, next) {


        try {
            let product = JSON.parse(req.body.product);
             const files = req.files;
             let inserts = 0;
            
            if(files.length > 0 ){
                try {
                    await Product.update(product);
                    const start = async()=>{
                        await asyncforEach(files, async (file)=>{
                            const pathImage = `image_${Date.now()}`;
                            const url = await storage(file, pathImage);
                            if(url != undefined && url != null){
                                if(inserts ==0){
                                    product.image1 = url;
                                }
                                else if(inserts==1){
                                    product.image2 = url;
                                }else if(inserts==2){
                                    product.image3 = url;
                                }
                            }
                            await Product.update(product);
                            inserts =inserts+1;   
                        });
                    }
                    start();
                } catch (error) {
                    console.log(error);
                    return res.status(500).json({
                        message:`Error al actualizar el producto ${error}`,
                        success:false,
                        error:error
                    });
                }
            }
            await Product.update(product);
            return res.status(200).json({
                success: true,
                message: 'Actualización exitosa',
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message:`Error al actualizar el producto ${error}`,
                success:false,
                error:error
            });
        }

    },
    async findByCategoryAndProductName(req, res, next) {
        try {
            const id_category = req.params.id_category; // CLIENTE
            const product_name = req.params.product_name; // CLIENTE
            const data = await Product.findByCategoryAndProductName(id_category, product_name);
            return res.status(200).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                message: `Error al listar los productos por categoria`,
                success: false,
                error: error
            });
        }
    },

    async findByCategory(req,res,next){
        try {
            const id_category = req.params.id_category;
            const data = await Product.findByCategory(id_category);
            return res.status(200).json(data);
            
        } catch (error) {
            console.log(error);
                return res.status(500).json({
                    message:`Error al obtener los productos por categoria`,
                    success:false,
                    error:error
                })
        }

    }
    
}
