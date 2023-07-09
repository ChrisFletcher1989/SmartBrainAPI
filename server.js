const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db= knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(express.json());
app.use(cors())
app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
   
    
    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email) 
    .then(data => {
       const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
       console.log(isValid)
       if (isValid) { 
       db.select('*').from('users')
       .where('email', '=', req.body.email)
       .then(user => {
                res.json(user[0])
       })
       
       }
       else if(isValid===false) {
        res.status(400).json("incorrect username or password")}
    })
    .catch(err => res.status(400).json('User Not Found'))
})
app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
    });
const hash = bcrypt.hashSync(password);
db.transaction(trx => {
    trx.insert({
        hash: hash,
        email: email,
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
        return trx ('users')
 .returning('*')
 .insert({
    email: loginEmail[0].email,
    name: name,
    joined: new Date() 
    }).
    then(user => { 
    res.json(user[0])
    })
    })
    .then(trx.commit)
    .catch(trx.rollback)
})
 
    .catch (err => res.status(400).json('unable to register'))
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where ({id})
    .then(user => {
        if(user.length) {
              res.json(user[0])
        }
        else {
            res.status(400).json('not found')
        }
    })
    .catch (err => res.status(400).json('error getting user'))
    
})
app.put('/image', (req, res) => {
    const { id } = req.body;
  db('users').where('id', '=', id)
  .increment ('entries', 1)
  .returning('entries')
  .then (entries => {
    res.json(entries[0].entries)
  })
  .catch (err => res.status(400).json("unable to get entries"))
})


app.listen(3000, () => {
    console.log('running OK on port 3000')
})
