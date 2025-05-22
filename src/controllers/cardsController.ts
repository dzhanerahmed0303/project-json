import { Request, Response, Router } from 'express';
import { 
  getFilteredAndSortedCards, 
  getCardById,
  getOwnerById,
  getCardsByOwner
} from '../services/cardsService';
import {Card} from '../models/card'

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const { search, sort, order } = req.query;
  
  const cards = getFilteredAndSortedCards(
    search as string,
    sort as keyof Card,
    order as 'asc' | 'desc'
  );
  
  res.render('cards/index', { 
    cards,
    search: search || '',
    sort: sort || '',
    order: order || ''
  });
});

router.get('/:id', async (req: Request, res: Response) => {
  const card = getCardById(Number(req.params.id));
  if (!card) {
    return res.status(404).render('error', { message: 'Card not found' });
  }
  
  const owner = getOwnerById(card.ownerId);
  const relatedCards = getCardsByOwner(card.ownerId)
    .filter(c => c.id !== card.id);
  
  res.render('cards/detail', { 
    card,
    owner,
    relatedCards
  });
});

export default router;