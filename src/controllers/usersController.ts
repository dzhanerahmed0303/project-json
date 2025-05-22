import { Request, Response, Router } from 'express';
import usersService from '../services/usersService';
import path from 'path';

const router = Router();

// Route voor overzichtspagina van alle eigenaars
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await usersService.getAllUsers();
        res.render('cards/owners', { users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).render('error', { message: 'Error loading users' });
    }
});

// Route voor detailpagina van een specifieke eigenaar
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).render('error', { message: 'Invalid user ID' });
        }

        const user = await usersService.getUserById(userId);
        if (!user) {
            return res.status(404).render('error', { message: 'User not found' });
        }

        res.render('cards/ownerDetail', { user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).render('error', { message: 'Error loading user details' });
    }
});

export default router;
