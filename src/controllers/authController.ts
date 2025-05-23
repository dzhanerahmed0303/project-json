import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Db } from 'mongodb';

const router = Router();
let db: Db;

export function setDb(database: Db) {
  db = database;
}

router.get('/login', (req: Request, res: Response) => {
  if (req.session.user) return res.redirect('/cards/dashboard');
  res.render('cards/login', { error: null });
});

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await db.collection('auth').findOne({ username });
    if (!user) return res.render('cards/login', { error: 'Gebruiker bestaat niet.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.render('cards/login', { error: 'Wachtwoord is onjuist.' });

    req.session.user = { username: user.username, role: user.role };
    res.redirect('/cards/dashboard');
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).render('error', { message: 'Interne fout tijdens inloggen.' });
  }
});

router.post('/logout', (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect('/cards/login');
  });
});

router.get('/register', (req: Request, res: Response) => {
  res.render('cards/register', { error: null });
});

router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const existing = await db.collection('auth').findOne({ username });
    if (existing) return res.render('cards/register', { error: 'Gebruikersnaam is al in gebruik.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection('auth').insertOne({ username, password: hashedPassword, role: 'USER' });

    res.redirect('/cards/login');
  } catch (err) {
    console.error('Registratie error:', err);
    res.status(500).render('error', { message: 'Registratie mislukt door serverfout.' });
  }
});

export default router;
