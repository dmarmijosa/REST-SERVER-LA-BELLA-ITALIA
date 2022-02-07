module.exports=(io)=>{
    const orderDelivery = io.of('/orders/delivery');
    orderDelivery.on('connection', function(socket){
        console.log('Usuario conectado');
        
        socket.on('position', function(data){
            console.log(`DATA EMITIDA: ${JSON.stringify(data)}`);
            orderDelivery.emit(`position/${data.id_order}`,{lat: data.lat, lng: data.lng})
        })

        socket.on('disconnect', function(data){
            console.log('Usuario desconectado');
        })

    })
}