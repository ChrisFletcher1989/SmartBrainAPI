const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require ('./controllers/register');
const signin = require ('./controllers/signin')
const profile = require ('./controllers/profile')
const image = require ('./controllers/image')
const imageDetect = require ('./controllers/imageDetect')


//Connect to database with knex
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const db= knex({
    client: 'pg',
    connection: {
    connectionString: process.env.DATABASE_URL,
    ssl:true
    }
  })
//Setup express and cors
const app = express();
app.use(express.json());
app.use(cors())
app.get('/', (req, res) => {res.send('it is working') })
//Components
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet (req, res, db)})
app.put('/image', (req, res,) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res,) => { image.handleApiCallCeleb(req, res)})
app.post('/imagedetect', (req, res,) => {imageDetect.handleApiCallRecognize(req, res)})

//Listen for changes

app.listen(process.env.PORT || 3000, () => {
    console.log(`running OK on port ${process.env.PORT}`)
})
// CREATE TABLE login (id serial PRIMARY KEY, hash varchar(100) NOT NULL, email text UNIQUE NOT NULL);
// CREATE TABLE users (id serial PRIMARY KEY, name varchar(100), email text UNIQUE NOT NULL, entries BIGINT DEFAULT 0, joined TIMESTAMP NOT NULL);
