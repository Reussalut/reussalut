const express = require('express')

require('dotenv').config()
require('../db/mongoose')

const frasesSalut = require('../models/frasesSalut');
const usuarioRouter = require('../routers/usuario');
const usuarioBRouter = require('../routers/usuarioB');
const frasesRouter = require('../routers/frasesSalut');
const hiloRouter = require('../routers/hilo');
const respuestaBRouter = require('../routers/respuestaB');

const auth = require('../middleware/auth')

const port = process.env.PORT | 3001

// express app
const app = express();

// listen for requests
app.listen(port, () => {
  console.log(`Server listening to port ${port}`)
});

// register view engine
app.set('view engine', 'ejs');


// middleware & static files
app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/src'));
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});



app.get('/', async (req, res) => {
 
  let lasFrases =  await frasesSalut.find({});
  let random = Math.floor(Math.random() * lasFrases.length);
  
  res.render('login', { title: 'Login', fraseSalut: lasFrases[random]});
});

app.get('/registro', async (req, res) => {
  res.render('signup', { title: 'Registro' });
});


app.use(express.json());
app.use('/api', usuarioRouter);
app.use('/api', frasesRouter);
app.use('/api', hiloRouter);
app.use('/api', respuestaBRouter);
app.use('/api', usuarioBRouter);

app.get('/forum', (req ,res) => {
  res.render('forum', {title: 'Forum'})
})

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});