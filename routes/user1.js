const express = require ('express');
const user1 = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');

user1.post("/signin", async (req, res, next)=>{
    const { user_name, user_mail, user_password} = req.body;

    if (user_name && user_mail && user_password){
    let query = "INSERT INTO user1 (user_name, user_mail, user_password)";
    query += `VALUES ('${user_name}', '${user_mail}', '${user_password}');`;

    const rows = await db.query(query);

    if (rows.affectedRows == 1){
        return res.status(201).json({code: 201, messaege: "Usuario registrado correctamente."});
    }
    return res.status(500).json({code: 500, message: "Ocurrió un error."});
}
return res.status(500).json({code: 500, message: "Ocurrió un error."});
});

user1.post("/login", async (req, res, next) =>
{
    //esta parte sirve para pedir el usuario y contraseña de la persona
    const {user_mail, user_password} = req.body;
    const query = `SELECT * FROM user1 WHERE user_mail = '${user_mail}' AND user_password = '${user_password}';`; /*esta es la sintaxis para que se traiga el usuario y contraseña*/
    const rows = await db.query(query);
    
    if (user_mail && user_password)
    {
        if (rows.length == 1)
        {
            const token = jwt.sign(
            {
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "debugkey");
            return res.status(200).json({code: 200, message: token});
        }
        else
        {
            return res.status(401).json({code: 401, message: "Usuario y/o contraseña incorrectos"});
        }
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

user1.get ("/", async(req, res, next) =>
{

    const query = "SELECT * FROM user1";
    const rows = await db.query(query);

    return res.status(200).json({code: 200, message: rows})

});



module.exports = user1;