const express = require('express')

require('dotenv').config()

require('../db/mongoose')

const usuarioRouter = require('../routers/usuario')

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
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.get('/', async (req, res) => {
  // TODO !

  // Si el usuario no esta conectado se renderiza login.
  res.render('index', { title: 'Login' });
  // Si el usuario está conectado entonces renderizamos index.
});

app.get('/registro', async (req, res) => {
  // TODO

  // Si el usuario no esta conectado se renderiza login.
  res.render('signup', { title: 'Registro' });
  // Si el usuario está conectado entonces renderizamos index.
});


app.get('/hola', async (req, res) => {
  // TODO !

  // Si el usuario no esta conectado se renderiza login.
  res.render(path.join(__dirname+'./src/index.js'));
  // Si el usuario está conectado entonces renderizamos index.
});

app.use(express.json())
app.use('/api', usuarioRouter)

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});