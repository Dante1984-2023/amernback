


//COLECCION


const mongoose = require('mongoose');
const { Schema } = require('mongoose');

//configuramos con Schema nuestra coleccion de DB
const userSchema = new Schema({
    nombre: {
        type: String,
        require: true,
    },
    apellido:{
        type: String,
        require: true
    },
    email:{
        type:String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    timestamp:{
        type: Date,
        default: new Date(),  //Fecha de dato insertado
    }
});

//exportamos la configuracion con el nombre de la coleccion

module.exports = mongoose.model('Formularios', userSchema);
