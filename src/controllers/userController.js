import User from '../models/user.js';

export const createUser = async (req, res) => {
  const { nom, prenom, email, adresse, mot_de_passe, role, telephone, id_commerciale } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send('L\'utilisateur existe déjà');
    }

    const newUser = await User.create({
      nom,
      prenom,
      email,
      adresse,
      mot_de_passe, 
      role,
      telephone,
      id_commerciale,
    });

    return res.status(201).json({ id: newUser.id_user, email: newUser.email, role: newUser.role });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).send('Erreur interne du serveur');
  }
};

export const getUsersByRole = async (req, res) => {
  const { role } = req.params;

  try {
    const users = await User.findAll({ where: { role } });

    if (users.length === 0) {
      return res.status(404).send('Aucun utilisateur trouvé avec ce rôle');
    }

    return res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).send('Erreur interne du serveur');
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }

    return res.json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    res.status(500).send('Erreur interne du serveur');
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, adresse, mot_de_passe, role, telephone, id_commerciale } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }

    const updatedPassword = mot_de_passe ? mot_de_passe : user.mot_de_passe;

    await user.update({
      nom,
      prenom,
      email,
      adresse,
      mot_de_passe: updatedPassword, 
      role,
      telephone,
      id_commerciale,
    });

    return res.json({ message: 'Utilisateur mis à jour avec succès', user });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    res.status(500).send('Erreur interne du serveur');
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }

    await user.destroy();

    return res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    res.status(500).send('Erreur interne du serveur');
  }
};
