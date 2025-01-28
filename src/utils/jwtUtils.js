import jwt from 'jsonwebtoken';

export const JWT_SECRET = 'votre_clé_secrète'; // Vous pouvez mettre cette clé dans un fichier .env

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id_user, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};
