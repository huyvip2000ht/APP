const sql = require('mysql');

var db = sql.createConnection({
    host: 'localhost',
    user: "root",
    password: '',
    database: 'CNPM'
})
db.connect((err) => {
    if (err) throw err;
    else {
        console.log("Connected database...")
    }
})
module.exports = db;