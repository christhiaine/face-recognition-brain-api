const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex');
const register = require('./src/controllers/register');
const signin = require('./src/controllers/signin');
const profile = require('./src/controllers/profile');
const image = require('./src/controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'chris',
      password : 'remenis',
      database : 'smart_brain'
    }
  });


const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => { res.send(database.users)});

app.post('/signin', signin.handleSignin(db, bcrypt) );

app.post('/register', (req, res) => { register.handleRegister (req,res, db, bcrypt, saltRounds)});

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req,res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) });


app.listen(3000, ()=> {
    console.log('App i running');
});

