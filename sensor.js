const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('./db3');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.get('/', (req, res) => {
    mysql.query('SELECT * FROM sensor', (error, results, fields) => {
        if (error) {
            console.error('Error al obtener datos de la base de datos:', error);
            res.status(500).send('Error al obtener datos de la base de datos.');
            return;
        }
        res.send(results);
    });
});

app.get('/data', (req, res) => {
    mysql.query('SELECT watts, ampers, vrms, KWhr, time FROM sensor ORDER BY time LIMIT 1;', (error, results, fields) => {
        if (error) {
            console.error('Error al obtener datos de la base de datos:', error);
            res.status(500).send('Error al obtener datos de la base de datos.');
            return;
        }
        res.send(results);
    });
});

app.get('/sensor/:id', (req, res) => {
    const id = req.params.id;
    mysql.query('SELECT * FROM sensor WHERE id = ?', id, (error, results, fields) => {
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

app.post('/', (req, res) => {
    const data = req.body;
    mysql.query('INSERT INTO sensor SET ?', data, (error, results, fields) => {
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
    mysql.query('UPDATE sensor SET ? WHERE id = ?', [data, id], (error, results, fields) => {
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
    mysql.query('DELETE FROM sensor WHERE id = ?', id, (error, results, fields) => {
        if (error) {
            console.error('Error al eliminar datos de la base de datos:', error);
            res.status(500).send('Error al eliminar datos de la base de datos.');
            return;
        }
        res.send(results);
    });
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000.');
});