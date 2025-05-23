import { Request, Response, NextFunction } from 'express';


export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session.user) {
    res.locals.user = req.session.user; 
    return next();
  } else {
    return res.redirect('/cards/login');
  }
}


export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session.user?.role === 'ADMIN') {
    return next();
  } else {
    return res.status(403).render('error', { message: 'Alleen admins mogen deze actie uitvoeren.' });
  }
}
