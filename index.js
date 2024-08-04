const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');
const express = require('express');
const bcrypt = require('bcryptjs'); // Importa bcryptjs para manejar el hash de contraseñas

const app = express();
const router = jsonServer.router('db.json');

// Habilitar CORS
app.use(cors());

// Middlewares de json-server y json-server-auth
app.db = router.db;
app.use(express.json());
app.use(auth);

// Middleware para cambiar la contraseña sin necesidad de la contraseña antigua
app.post('/api/admin/change-password', async (req, res) => {
  const { userId, newPassword } = req.body;

  if (!userId || !newPassword) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const user = app.db.get('users').find({ id: userId }).value();

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  app.db.get('users')
    .find({ id: userId })
    .assign({ password: hashedPassword })
    .write();

  res.status(200).json({ message: 'Contraseña actualizada correctamente' });
});

// Middleware para cambiar la contraseña
app.post('/api/change-password', async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;

  if (!userId || !oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const user = app.db.get('users').find({ id: userId }).value();

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Contraseña antigua incorrecta' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  app.db.get('users')
    .find({ id: userId })
    .assign({ password: hashedPassword })
    .write();

  res.status(200).json({ message: 'Contraseña actualizada correctamente' });
});


// Usa el router de json-server
app.use('/api', router);

// Escuchar en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
