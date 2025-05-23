import { Request, Response, Router } from 'express';
import {
  getAllCards,
  getCardById,
  getCardsByOwner,
  updateCard
} from '../services/cardsService';
import usersService from '../services/usersService';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware';

const router = Router();


router.get('/dashboard', isAuthenticated, async (req: Request, res: Response) => {
  const cards = await getAllCards();
  res.render('cards/dashboard', {
    cards,
    user: req.session.user
  });
});


router.get('/:id/edit', isAuthenticated, isAdmin, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).render('error', { message: 'Ongeldig ID' });
  }

  const card = await getCardById(id);
  if (!card) {
    return res.status(404).render('error', { message: 'Card niet gevonden' });
  }

  res.render('cards/editHond', { card });
});


router.post('/:id/edit', isAuthenticated, isAdmin, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).render('error', { message: 'Ongeldig ID' });
  }

  const { name, age, breedType, gender, energyLevel } = req.body;

  await updateCard(id, {
    name,
    age: parseInt(age),
    breedType,
    gender,
    energyLevel: parseInt(energyLevel)
  });

  res.redirect(`/cards/${id}`);
});


router.get('/', async (req: Request, res: Response) => {
  const { search = '', sort = '', order = '' } = req.query;
  let cards = await getAllCards();

  if (search) {
    cards = cards.filter(card =>
      card.name.toLowerCase().includes((search as string).toLowerCase())
    );
  }

  if (sort && order) {
    cards.sort((a, b) => {
      const aVal = a[sort as keyof typeof a];
      const bVal = b[sort as keyof typeof b];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return order === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });
  }

  res.render('cards/index', { cards, search, sort, order });
});


router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).render('error', { message: 'Ongeldig ID' });
  }

  const card = await getCardById(id);
  if (!card) {
    return res.status(404).render('error', { message: 'Card niet gevonden' });
  }

  const relatedCards = await getCardsByOwner(card.ownerId);
  const user = await usersService.getUserById(card.ownerId);

  res.render('cards/detail', { card, relatedCards, user });
});

export default router;
