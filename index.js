const jsonServer  = require('json-server')
const auth = require('json-server-auth');
const cors = require('cors');
const express = require('express');

const app = express();
const router = jsonServer .router('db.json');

// Habilitar CORS
app.use(cors());

// Middlewares de json-server y json-server-auth
app.db = router.db;
app.use(express.json());
app.use(auth);
app.use('/api', router);

// Escuchar en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
