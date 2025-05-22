import express from 'express';
import path from 'path';
import cardsRouter from './controllers/cardsController';
import ownersRouter from './controllers/usersController';

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/honden', cardsRouter);
app.use('/baasjes', ownersRouter);

// Home route
app.get('/', (req, res) => res.redirect('/honden'));

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).render('error', { message: 'Something went wrong!' });
});
     
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});