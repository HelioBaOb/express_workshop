const morgan = require('morgan');
const express = require('express');
const app = express ();
const pokemon = require('./routes/pokemon');
const user1 = require('./routes/user1')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
Verbos HTTP
GET: obtener un recurso
POST: almacenar/crear un recurso
PATCH: modificar una parte de un recurso
PUT: modificar u recurso
DELTE: borrar un recurso
operdaor ternario es: condicion ? valor si verdadero : valor si falo;
*/

app.get("/",(req, res, next) =>
{
    return res.status(200).json({ code: 1, message: "Bienvenido a la pokedex" });
});

app.use("/pokemon", pokemon);

app.use("/user1", user1);

app.use((req, res, next) =>
    {
        return res.status(404).json({code: 404, message: "URL no encontrado"})
});

app.listen(process.env.PORT || 3000, () =>
{
    console.log("Server is running...");
}); 