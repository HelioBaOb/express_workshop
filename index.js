//Dependencies
const morgan = require('morgan');
const express = require('express');
const app = express ();
//Routers
const pokemon = require('./routes/pokemon');
const user1 = require('./routes/user1')
//Middleware
const auth = require('./middleware/auth');
const notfound = require('./middleware/notfound')
const index = require('./middleware/index')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
Verbos HTTP
GET: obtener un recurso
POST: almacenar/crear un recurso
PATCH: modificar una parte de un recurso
PUT: modificar un recurso
DELTE: borrar un recurso
operdaor ternario es: condicion ? valor si verdadero : valor si falo;
*/

app.get("/", index);
app.use("/user1", user1);
app.use(auth); //un middlewear se encarga de procesar una petición (hacer lo que se considere lo más pertinente).
app.use("/pokemon", pokemon);
app.use(notfound);

app.listen(process.env.PORT || 3000, () =>
{
    console.log("Server is running...");
}); 