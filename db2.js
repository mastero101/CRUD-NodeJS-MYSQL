const mysql = require('mysql');

const dbConfig = {
    host: 'nodemysql12.mysql.database.azure.com',
    user: 'mastero',
    password: 'Alejandrof15',
    database: 'test',
    port: 3306,
    ssl: true
};

const connection = mysql.createConnection(dbConfig);

connection.connect((error) => {
    if (error) {
        console.error('Error al conectar con la base de datos:', error);
        return;
    }
    console.log('Conexión exitosa con la base de datos.');
});

module.exports = connection;
