//Call packages.
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')({
    client: 'pg',
    connection: {
        host : 'dpg-cg3e1dd269v3bp9nej7g-a',
        port : 5432,
        user : 'smartbraindb_kvlp_user',
        password : 'e7f51SFewGppAK5Mw3RPzuTxyAffXFKE',
        database : 'smartbraindb_kvlp'
    }
});
// const knex = require('knex')({
//     client: 'pg',
//     connection: {
//         host : '127.0.0.1',
//         port : 5432,
//         user : 'postgres',
//         password : 'postgres',
//         database : 'smart-brain'
//     }
// });
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const home  = require('./controllers/home');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



//Create app that running Express.
const app = express();
app.use(bodyParser.json());
app.use(cors());

//local db for testing purposes
// const database = {
//     users : [
//         {
//             id: '123',
//             name:'John',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name:'Sally',
//             email: 'sally@gmail.com',
//             password:'bananas',
//             entries: 0,
//             joined: new Date()
//         }
//     ]
// }



//Create a root route.
// app.get('/', (req,res) => { home.handleHome(req,res,knex)});
app.get('/', (req,res) => res.send('success'));

//Create a signin route. 
app.post('/signin', (req,res) => { signin.handleSignin(req,res,knex,bcrypt)});

//Create a register route. Advance way of declaring function.
app.post('/register', register.handleRegister(knex,bcrypt));

//Create a profile/:userId route.
app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req,res,knex)});

//Create a /image PUT route. 
app.put('/image', (req,res) => { image.handleImage(req,res,knex)});
app.post('/imageurl', (req,res) => { image.handleApiCall(req,res)});

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`App is running on port ${process.env.PORT}`);
})


/** Route
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
 */

