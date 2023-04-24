const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const mysql = require('./db2');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

const options = {
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('fullchain.pem')
};

app.get('/', (req, res) => {
    mysql.query('SELECT * FROM componentes', (error, results, fields) => {
        if (error) {
            console.error('Error al obtener datos de la base de datos:', error);
            res.status(500).send('Error al obtener datos de la base de datos.');
            return;
        }
        res.send(results);
    });
});

app.get('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    mysql.query('SELECT * FROM componentes WHERE id = ?', id, (error, results, fields) => {
      if (error) {
        console.error('Error al obtener datos de la base de datos:', error);
        res.status(500).send('Error al obtener datos de la base de datos.');
        return;
      }
      if (results.length === 0) {
        res.status(404).send('No se encontró ningún usuario con el ID proporcionado.');
        return;
      }
      res.send(results[0]);
    });
});


app.get('/procesadores', (req, res) => {
    mysql.query("SELECT modelo, precio FROM componentes WHERE tipo = 'procesador'", (error, results, fields) => {
        if (error) {
            console.error('Error al obtener datos de la base de datos:', error);
            res.status(500).send('Error al obtener datos de la base de datos.');
            return;
        }
        res.send(results);
    });
});

app.get('/motherboards', (req, res) => {
    mysql.query('SELECT modelo FROM componentes WHERE tipo = ?', 'motherboard', (error, results, fields) => { 
        if (error) {
            console.error('Error al obtener datos de la base de datos:', error);
            res.status(500).send('Error al obtener datos de la base de datos.');
            return;
        }
        res.send(results);
    });
});

app.get('/rams', (req, res) => {
    mysql.query('SELECT modelo FROM componentes WHERE tipo = ?', 'ram', (error, results, fields) => {
        if (error) {
            console.error('Error al obtener datos de la base de datos:', error);
            res.status(500).send('Error al obtener datos de la base de datos.');
            return;
        }
        res.send(results);
    });
});

app.get('/almacenamientos', (req, res) => {
    mysql.query('SELECT modelo FROM componentes WHERE tipo = ?', 'almacenamiento', (error, results, fields) => { 
        if (error) {
            console.error('Error al obtener datos de la base de datos:', error);
            res.status(500).send('Error al obtener datos de la base de datos.');
            return;
        }
        res.send(results);
    });
});

app.get('/disipadores', (req, res) => {
    mysql.query('SELECT modelo FROM componentes WHERE tipo = ?', 'disipador', (error, results, fields) => {
        if (error) {
            console.error('Error al obtener datos de la base de datos:', error);
            res.status(500).send('Error al obtener datos de la base de datos.');
            return;
        }
        res.send(results);
    });
});

app.get('/fuentes', (req, res) => {
    mysql.query('SELECT modelo FROM componentes WHERE tipo = ?', 'psu', (error, results, fields) => {
        if (error) {
            console.error('Error al obtener datos de la base de datos:', error);
            res.status(500).send('Error al obtener datos de la base de datos.');
            return;
        }
        res.send(results);
    });
});

app.get('/graficas', (req, res) => {
    mysql.query('SELECT modelo FROM componentes WHERE tipo = ?', 'gpu', (error, results, fields) => {
        if (error) {
            console.error('Error al obtener datos de la base de datos:', error);
            res.status(500).send('Error al obtener datos de la base de datos.');
            return;
        }
        res.send(results);
    });
});


app.get('/gabinetes', (req, res) => {
    mysql.query('SELECT modelo FROM componentes WHERE tipo = ?', 'gabinete', (error, results, fields) => {
        if (error) {
            console.error('Error al obtener datos de la base de datos:', error);
            res.status(500).send('Error al obtener datos de la base de datos.');
            return;
        }
        res.send(results);
    });
});

app.post('/', (req, res) => {
    const data = req.body;
    mysql.query('INSERT INTO componentes SET ?', data, (error, results, fields) => {
        if (error) {
            console.error('Error al insertar datos en la base de datos:', error);
            res.status(500).send('Error al insertar datos en la base de datos.');
            return;
        }
        res.send(results);
    });
});

app.put('/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    mysql.query('UPDATE componentes SET ? WHERE id = ?', [data, id], (error, results, fields) => {
        if (error) {
            console.error('Error al actualizar datos en la base de datos:', error);
            res.status(500).send('Error al actualizar datos en la base de datos.');
            return;
        }
        res.send(results);
    });
});

app.delete('/:id', (req, res) => {
    const id = req.params.id;
    mysql.query('DELETE FROM componentes WHERE id = ?', id, (error, results, fields) => {
        if (error) {
            console.error('Error al eliminar datos de la base de datos:', error);
            res.status(500).send('Error al eliminar datos de la base de datos.');
            return;
        }
        res.send(results);
    });
});

https.createServer(options, app).listen(443, () => {
    console.log('Servidor escuchando en el puerto 443.');
});
