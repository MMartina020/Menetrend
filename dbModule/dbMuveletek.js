const mysql = require('mysql');
const config = require('../config/configDB.json');

const connection = mysql.createConnection({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password
});
//async -wait - promise- átdolgozni a másik szerint 
module.exports.vonatEsemenyLista = function (vId) {
    myQuery = `SELECT vNev, allId, ora, perc, jelleg FROM esemeny INNER JOIN vonat on vonat.vId=esemeny.vId WHERE vId=${vId}`;
    connection.query(myQuery, (err, result, fields) => {
        if (err) throw err;
        return JSON.parse(JSON.stringify(result));
    })
}

module.exports.vonatLista = function (callback) { //több paramétert adok átt a callback mindig az  utolsó, vissza adok egy hibát és ha van akkor a callbacket a null result fieldssel adom vissza ha nincs rá szügség nem adom vissza 
    myQuery = `SELECT vId, vNev FROM vonat`;
    connection.query(myQuery, (err, result, fields) => {
        if (err)
            callback(err, null);
        else {
            callback(null, JSON.parse(JSON.stringify(result)));
        }
    })
}

//nem egyenesen mennek a lekérdezések 