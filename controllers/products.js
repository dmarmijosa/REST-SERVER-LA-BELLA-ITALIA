const storage = require('../utils/cloud_storage');
const asyncforEach = require('../utils/async_foreach');

const Producto = require('../models/product');

module.exports={
    async create(req, res, next) {

        let product = JSON.parse(req.body.product);
        const files = req.files;
        let inserts = 0;
        if(files.length ===0){
            return res.status(501).json({
                message: 'EL producto no tiene imagenes',
                success: false
            });
        }else{
            try {
                
                const data = await Producto.create(product);
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
                            }else if(inserts==3){
                                product.image3 = url;
                            }
                        }
                        await Producto.update(product);
                        inserts =inserts+1;
                        if (inserts == files.length) {
                            return res.status(201).json({
                                success: true,
                                message: 'Producto registrado correctamente'
                            });
                        }

                         
                    });
                }
                start();
            } catch (error) {
                console.log(error);
                return res.status(501).json({
                    message:`Error al registrar el producto ${error}`,
                    success:false,
                    error:error
                })
            }
        }

    },
    
}
