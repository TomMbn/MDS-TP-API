import request from 'supertest';
import app from '../app.js';
import { User } from '../models/user.js';

describe('POST /auth/login', () => {
  test('should return 200 and a JWT token for valid credentials', async () => {
    const user = await User.findOne({ where: { email: 'jean.dupont@example.com' } });

    if (!user) {
      throw new Error('L\'utilisateur test n\'existe pas dans la base de données.');
    }

    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'jean.dupont@example.com',
        mot_de_passe: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('should return 400 for incorrect email', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'wrong.email@example.com',
        mot_de_passe: 'password123',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Utilisateur non trouvé');
  });

  test('should return 400 for incorrect password', async () => {
    const user = await User.findOne({ where: { email: 'jean.dupont@example.com' } });

    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'jean.dupont@example.com',
        mot_de_passe: 'wrongpassword',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Mot de passe incorrect');
  });
});
