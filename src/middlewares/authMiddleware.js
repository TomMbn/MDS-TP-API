import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/jwtUtils.js';

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(403).send('Accès refusé, token manquant.');
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Token invalide.');
    }
    req.user = user;
    next();
  });
};

export default authenticateJWT;
