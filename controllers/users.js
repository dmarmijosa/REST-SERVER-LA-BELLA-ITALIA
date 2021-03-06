const User = require('../models/user');
const jwt =  require('jsonwebtoken');
const keys = require('../config/keys');
const Rol = require('../models/rol');
const storage = require('../utils/cloud_storage');

const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'labellaitaliadeliverytest@gmail.com',
      pass: 'labellaitaliadeliverytest2022'
    }
  });
  




function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *  charactersLength));
   }
   return result;
}



module.exports={
    async getAll(req,res,next){
        try {
            const data = await User.getAll();
     
            return res.status(200).json(data);

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                
                success: false,
                message: 'Error al obtener usuarios'
            })
        }
    },

    async getIsAvaiableRestaurant(req,res,next){
        try {
            const data = await User.getStateRestaurant();    
  
            return res.status(200).json(data[0].is_available);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener el usuario por ID'
            });
        }

    },
    async updateStateRestaurant(req, res, next) {
        try {
            const data = await User.getStateRestaurant();  
            const id = (req.params.id);
            const is_available = !data[0].is_available;
            await User.updateRestaurant(id,is_available);
            return res.status(200).json({
                success: true,
                message: 'Cambio realizado',
            });
                     
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Hubo un error con el estado del resturant',
                error: error
            });
        }
    },

  

    
    async registerWithImage(req,res,next){
        try {
            const user = JSON.parse(req.body.user);
            console.log(`Datos enviados ${user}`);
            const files = req.files;
            if(files.length > 0 ){
                const pathImage = `image_${Date.now()}`;
                const url =  await storage(files[0], pathImage);
                if(url !=  undefined && url != null){
                    user.image = url;
                }
            }
            const data = await User.create(user);
            await Rol.create(data.id,1);
            return res.status(200).json({
                success: true,
                message: 'Registro exitoso',
                data: data.id
            });
                     
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al crear la cuenta revise si el correo no fue usado anteriormente.',
                error: error
            });
        }
    },

    async update(req, res, next) {
        try {
            const user = JSON.parse(req.body.user);
            console.log(`Datos enviados: ${JSON.stringify(user)}`);
            const files = req.files;
            if(files.length > 0 ){
                const pathImage = `image_${Date.now()}`;
                const url =  await storage(files[0], pathImage);
                if(url !=  undefined && url != null){
                    user.image = url;
                }
            }
            await User.update(user);
            return res.status(200).json({
                success: true,
                message: 'Actualizaci??n exitosa',
                
            });
                     
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Hubo un error con la actualizaci??n del usuario',
                error: error
            });
        }
    },
    
    async findById(req, res, next) {
        try {
            const id = req.params.id;

            const data = await User.findByUserId(id);    
            return res.status(200).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener el usuario por ID'
            });
        }
    },
    async findByRol(req, res, next) {
        try {


            const data = await Rol.findByDataRestaurant();    
            return res.status(200).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener el usuario por Rol'
            });
        }
    },
    async recoverAccount(req,res,next){
        try {
            const email = req.params.email;
            const myUser =  await User.findByEmail(email);
            
            if(myUser){
                password = (makeid(10));
                mailOptions={
                    from: 'labellaitaliadeliverytest@gmail.com',
                    to: email,
                    subject: 'Clave de recuperaci??n de su cuenta',
                    html: `<h1>Su clave temporal es: </h1><h3>${password}</h3>`
                }
                transporter.sendMail(mailOptions);
                await updatePassword(email,password);
                
                return res.status(200).json({
                    success: true,
                    message: 'Clave temporal enviada a su correo'

                });
            }else{
                return res.status(401).json({
                    success: false,
                    message: 'Correo no encontrado'

                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                
                success: false,
                message: 'Error al obtener usuarios'
            })
        }
    },

    async login(req,res,next){
        try {
            const email = req.body.email;
            const password = req.body.password;

            const myUser =  await User.findByEmail(email);
            
            if(!myUser){
                return res.status(401).json({
                    success: false,
                    message: 'Correo no encontrado'

                });
            }

            if(User.isPasswordMatch(password, myUser.password)){
                const token = jwt.sign({ id: myUser.id, email: myUser.email }, keys.secretOrkey, 
                {
                    //expiresIn: (60*60*24)
                   //expiresIn: (60*3)
                }
                );

                const data = {
                    id:myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    is_avaiable: myUser.is_avaiable,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                    roles: myUser.roles
                };
                await User.updateToken(myUser.id,  `JWT ${token}`)
               
                return res.status(200).json({
                    success: true,
                    data: data,
                    message: 'Usuario auntentificado'
                })
            }else{
                return res.status(401).json({
                    success: false,
                    message: 'Contrase??a incorrecta',
                    

            })};
            
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al momento de ingresar',
                error: error
            });
            
        }
    },

    async logout(req,res,next){
        try {
            const id = req.body.id;
            await User.updateToken(id,null);
            return res.status(200).json({
                success: true,
                message: 'Sessi??n cerrada correctamente'
            })
            
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error en login',
                error: error
            });
        }
    },
    async deleteDelivery(req,res,next){
        try {
            const id = req.params.id;
            await Rol.delete(id);
            return res.status(200).json({
                success: true,
                message: 'Mensajero eliminado correctamente'
            })
            
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error en eliminar al mensajero',
                error: error
            });
        }
    },

    
    async addDelivery(req,res,next){
        try {
            const id = req.params.id;
            await Rol.create(id,3);
            return res.status(200).json({
                success: true,
                message: 'Mensajero agregado correctamente'
            })
            
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error en agregado el mensajero',
                error: error
            });
        }
    },
    async findbyEmailUser(req,res,next){
        try{
            const email = req.params.email;
            const myUser =  await User.findByEmail(email);
            
            if(myUser){
                
                return res.status(401).json({
                    success: false,
                    message: 'El correo ya ha sido registrado',
                    data: myUser

                });
            }else{
                return res.status(200).json({
                    success: true,
                    message: 'Correo no encontrado'

                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                
                success: false,
                message: 'Error al obtener usuarios'
            })
        }
    },

    async updateNotificationToken(req, res, next) {
        try {
            
            const body = req.body;
            console.log('Datos enviados del usuario: ', body);

            await User.updateNotificationToken(body.id, body.notification_token);

            return res.status(200).json({
                success: true,
                message: 'El token de notificaciones se ha almacenado correctamente'
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Hubo un error con la actualizacion de datos del usuario',
                error: error
            });
        }
    },

    async findDeliverys(req, res, next) {
        try {
            
            const data = await User.findDelivery();    
       
            return res.status(200).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener los repartidores'
            });
        }
    },

    async getAdminsNotificationTokens(req, res, next) {
        try {
            const data = await User.getAdminsNotificationTokens();    
            let tokens = [];


            data.forEach(d => {
                tokens.push(d.notification_token);
            });

            console.log('Tokens de admin:', tokens);
            return res.status(200).json(tokens);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener los repartidores'
            });
        }
    },



    
    
}