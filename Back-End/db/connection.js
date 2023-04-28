const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'Meds-Dashboard',
  port:3306,
});

connection.connect((err)=>{
    if(err){
        console.error("Connection Error",err.stack);
        return;
    }
    console.log('Connected');
});

module.exports = connection;