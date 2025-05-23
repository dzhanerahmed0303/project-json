import { Request, Response, Router } from 'express';
import usersService from '../services/usersService';
import { getCardsByOwner } from '../services/cardsService';

const router = Router();


router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await usersService.getAllUsers();
    res.render('cards/owners', { users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).render('error', { message: 'Fout bij het laden van de gebruikers.' });
  }
});


router.get('/:id', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).render('error', { message: 'Ongeldig ID voor gebruiker.' });
    }

    const user = await usersService.getUserById(userId);
    if (!user) {
      return res.status(404).render('error', { message: 'Gebruiker niet gevonden.' });
    }

    const dogs = await getCardsByOwner(userId);

    res.render('cards/ownerDetail', { user, dogs });
  } catch (error) {
    console.error('Error fetching user detail:', error);
    res.status(500).render('error', { message: 'Fout bij het laden van de gebruiker.' });
  }
});


router.get('/:id/edit', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = await usersService.getUserById(userId);

  if (!user) {
    return res.status(404).render('error', { message: 'Gebruiker niet gevonden.' });
  }

  res.render('cards/editOwner', { user });
});


router.post('/:id/edit', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { name, bio, email, phone, isExperienced } = req.body;

  await usersService.updateUser(userId, {
    name,
    bio,
    isExperienced: isExperienced === 'true',
    contact: {
      email,
      phone
    }
  });

  res.redirect(`/baasjes/${userId}`);
});

export default router;
