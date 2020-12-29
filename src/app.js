const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config()

require('../db/mongoose')
const postRouter = require('../routers/post')
const userRouter = require('../routers/user')
const testRouter = require('../routers/test')

const Test = require('../models/test')
const Post = require('../models/post')

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
app.use(morgan('dev'))

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
  res.render('login', { title: 'Login' });
  // Si el usuario está conectado entonces renderizamos index.
});

app.get('/registro', async (req, res) => {
  // TODO

  // Si el usuario no esta conectado se renderiza login.
  res.render('signup', { title: 'Registro' });
  // Si el usuario está conectado entonces renderizamos index.
});

/*app.get('/post/create', (req, res) => {
  res.render('post-create', { title: 'Create a new post' });
});

app.get('/post-edit/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const post = await Post.findById(_id)

    if (!post) {
      return res.status(404).send()
    }

    res.render('post-edit', { title: 'Edit post', post });
  } catch (e) {
    res.status(500).send()
  }
});

app.get('/tests', async (req, res) => {
  try {
    const tests = await Test.find({})
    res.render('tests', { title: 'List of tests', tests: tests });
  } catch (e) {
    res.render('tests', { title: 'List of tests', tests: [] });
  }
});

app.get('/test/create', (req, res) => {
  res.render('test-create', { title: 'Create a new test'}); // owner: req.user
});

app.get('/test-edit/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const test = await Test.findById(_id)

    if (!test) {
      return res.status(404).send()
    }

    res.render('test-edit', { title: 'Edit test', test });
  } catch (e) {
    res.status(500).send()
  }
});

app.get('/interfaz', (req, res) => {
  res.render('interfaz', { title: 'Interacción con el servidor' });
});

app.get('/user-login', (req, res) => {
  res.render('user-login', {title: 'Login'})
})

app.get('/user-create', (req, res) => {
  res.render('user-create', { title: 'Create a new user' });
});*/

app.use(cors())
app.use(express.json())
//app.use('/api', postRouter)
app.use('/api', userRouter)
//app.use('/api', testRouter)

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});