import express from 'express';
import path from 'path';
import { MongoClient, Db } from 'mongodb';
import cardsData from './data/characters.json';
import ownersData from './data/owners.json';

import cardsRouter from './controllers/cardsController';
import ownersRouter from './controllers/usersController';

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

    const cardsCollection = db.collection('cards');
    const ownersCollection = db.collection('owners');

    const cardsCount = await cardsCollection.countDocuments();
    if (cardsCount === 0) {
        await cardsCollection.insertMany(cardsData);
        console.log('Inserted cards data into MongoDB.');
    }

    const ownersCount = await ownersCollection.countDocuments();
    if (ownersCount === 0) {
        await ownersCollection.insertMany(ownersData);
        console.log('Inserted owners data into MongoDB.');
    }
    const users = await db.collection('owners').find().toArray();
console.log('Aantal eigenaars in database:', users.length);
console.log('Voorbeeld eigenaar:', users[0]);

}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/honden', cardsRouter);
app.use('/baasjes', ownersRouter);

app.get('/', (req, res) => res.redirect('/honden'));
app.get('/login', (req, res) => {
  res.render('cards/login');
});
app.get('/register', (req, res) => {
  res.render('cards/register');
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).render('error', { message: 'Something went wrong!' });
});

initDatabase().then(() => {
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
}).catch(err => {
    console.error('Database init failed:', err);
});
