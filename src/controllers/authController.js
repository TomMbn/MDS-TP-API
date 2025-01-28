import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import { generateToken } from '../utils/jwtUtils.js';

export const login = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send('Utilisateur non trouvé');
    }

    if (user.mot_de_passe !== mot_de_passe) { 
      return res.status(400).send('Mot de passe incorrect');
    }

    const token = generateToken(user);
    return res.json({ token });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).send('Erreur interne du serveur');
  }
};

