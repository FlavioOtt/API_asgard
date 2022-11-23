const mysql = require("./mysqlConnect");
const jwt = require("jsonwebtoken");

register = async (body) => {
    const conn = await mysql.connect();
    let result;
    let sql = await mysql.query(`
        SELECT * FROM peaple 
        WHERE login = '${body.login}'
    `);

    if (Array.isArray(sql)){
        if (sql.length == 0){
            result = await conn.query(`
            BEGIN;
                INSERT INTO peaple (login,name,email,born)
                VALUES (?,?,?,?);
                INSERT INTO user (peaple_id_peaple,password)
                VALUES (LAST_INSERT_ID(), ?);
            COMMIT;
            `, 
            [
                body.login, 
                body.name, 
                body.email,
                body.born,
                body.password
            ])
        }
    }

    return result;
}

updateSerial = async (body) => {
    const conn = await mysql.connect();

    let result = await mysql.query(`
        UPDATE user SET serial = '${body.serial}'
        WHERE peaple_id_peaple = '${body.id_peaple}'
    `);

    return result;
}

login = async (body) => {
    let res = await mysql.query(`
        SELECT id_peaple,email,login,
            (
                SELECT password FROM user 
                WHERE peaple_id_peaple = p.id_peaple
            ) AS password
        FROM peaple p JOIN user u WHERE email = '${body.email}'
    `)

    if (Array.isArray(res)){
        if (res.length > 0){
            res = res[0];
            if (body.email === res.email && body.password === res.password){
                let token = await jwt.sign({"email": res.email, "login": res.login, "id_peaple": res.id_peaple}, "Q0lNT0w=", {
                    expiresIn: 600
                });
                return {
                    "auth": true, 
                    "message": "Login realizado com sucesso.",
                    "user": {
                        "email": res.email,
                        "id_peaple": res.id_peaple,
                        "login": res.login,
                        "token": token
                    }                    
                }
            }else{
                return {
                    "auth": false, 
                    "message": "Credenciais incorretas", 
                    "token": ""
                }
            }
        }
    }
}

verifyJWT = async (token) => { 
    if (!token){
        resp = { "auth": false, "message": 'Token não informado.' }; 
    }
    
    jwt.verify(token, 'Q0lNT0w=', function(err, decoded) { 
        if (err){
            resp = { "auth": false, "message": 'Token inválido!' };
        }
        if (decoded){
            resp = { "auth": true, "id_peaple": decoded.id_peaple, "login": decoded.login};
        }
    });
    return resp;
}

module.exports = {login, verifyJWT, register, updateSerial}
