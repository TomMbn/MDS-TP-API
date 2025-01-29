import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id_user, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};
