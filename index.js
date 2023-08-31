const express = require('express');
const app = express();
const routerApi = require('./routes')
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hola mi server en express')
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, esta es una nueva ruta')
});

app.get('/category', (req, res) => {
  res.send('Hola, esta es la ruta de categorias')
});

routerApi(app);

app.listen(port, () => {
  console.log('listening' + port);
});
