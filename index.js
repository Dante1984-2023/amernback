

const express = require('express');
const cors = require('cors');
const dotenv = require( 'dotenv').config();
const PORT = process.env.PORT;
require('./conexion/conexion');
const Usuario = require('./model/userModel');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`<h1>Soy el Back del MERN</h1>`)
});


app.post('/usuarios', async (req, res) => {
    console.log(req.body);
    const { nombre, apellido, email, password } = req.body;

    console.log(`Mi nombre es ${nombre}, mi apellido es ${apellido}, mi email es ${email} y el password ${password}`);

       //4. si no Existe, creamos un nuevo usuario
    const nuevoUsuario = new Usuario(req.body);

    console.log(`1. Nuevo Usuario a guardar: ${nuevoUsuario}`);

    await nuevoUsuario.save();


});

app.get('/clientes', async (req, res) =>{
    const personas = await Usuario.find({},
        {
            "nombre": 1,
            "apellido": 1,
           "email": 1,
           "timestamp": 1
        });

       let miDia= new Date();

        console.log(personas);
        res.json({ 
          personas
        })
})

/* Eliminamos los datos de clientes */

app.delete('/clientes/:id', async (req, res)=>{
    const id = req.params.id;
    console.log(id);

    try {
        const deleteUser = await Usuario.findByIdAndDelete(id);
         console.log(deleteUser);
         if(!deleteUser){
            return res.status(404).send();
         }else{
            console.log('Cliente Eliminado');
            return res.status(200).send();
         }
    }catch(error){

    }
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el Puerto ${PORT}`);
})

