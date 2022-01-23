const { Router } = require('express');
const genreRouter = require('./genre.js')
const videoGamesRouter = require('./videogames.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames',videoGamesRouter)
router.use('/genre', genreRouter)

module.exports = router;
