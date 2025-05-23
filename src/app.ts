/// <reference path="./types/express-session.d.ts" />
import express from 'express';
import bcrypt from 'bcrypt';
import session from 'express-session';
import path from 'path';
import { MongoClient, Db } from 'mongodb';

import cardsData from './data/characters.json';
import ownersData from './data/owners.json';

import cardsRouter from './controllers/cardsController';
import ownersRouter from './controllers/usersController';
import authRouter, { setDb as setAuthDb } from './controllers/authController';

import { setDb as setCardsDb } from './services/cardsService';
import { setDb as setUsersDb } from './services/usersService';

const app = express();
const uri = 'mongodb+srv://Dzhaner:12345678Dzhaner@cluster0.pa8gmws.mongodb.net/';
const client = new MongoClient(uri);
let db: Db;


async function initDatabase() {
  await client.connect();
  db = client.db('project');

  setCardsDb(db);
  setUsersDb(db);
  setAuthDb(db);

  const cardsCollection = db.collection('cards');
  const ownersCollection = db.collection('owners');
  const authCollection = db.collection('auth');

  if (await cardsCollection.countDocuments() === 0) {
    await cardsCollection.insertMany(cardsData);
    console.log('✅ Cards data inserted.');
  }

  if (await ownersCollection.countDocuments() === 0) {
    await ownersCollection.insertMany(ownersData);
    console.log('✅ Owners data inserted.');
  }

  if (await authCollection.countDocuments() === 0) {
    const hashedAdmin = await bcrypt.hash('admin', 10);
    const hashedUser = await bcrypt.hash('user', 10);

    await authCollection.insertMany([
      { username: 'admin', password: hashedAdmin, role: 'ADMIN' },
      { username: 'user', password: hashedUser, role: 'USER' }
    ]);

    console.log('Users added to collection.');
  }

  
}


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
  secret: 'supersecretkey', 
  resave: false,
  saveUninitialized: false
}));


app.use('/cards', authRouter);        
app.use('/cards', cardsRouter);       
app.use('/baasjes', ownersRouter);    


app.get('/', (req, res) => res.redirect('/cards'));


app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).render('error', { message: 'Er is iets misgegaan!' });
});

initDatabase()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('Database failed:', err);
  });
