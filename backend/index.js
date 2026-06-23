// simplemnete estamos  usando express
const express = require('express');
// cors permite que el frontend se pueda cominicar con el backend
const cors = require('cors');
//dotenv lee el archivo .env y lo procesa para que se puedan usar las variables de entorno
// .config() lo activa para que se puedan usar las variables de entorno en el codigo
require('dotenv').config();

// simplemente se llama el arcchivo de query.js
const query = require('./query');

//express() crea el servidor 
// y se guarda en all para configurarlo
const app = express();

// prot es el puerto xd, se declara 
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log("funcionando el pueto", PORT)
})

//usamos cors para permitir la comunicacion entre el frontend y el backend
app.use(cors());

//los datos se traen como JSON
//sin esto, no se podrio leer los datos
app.use(express.json());
