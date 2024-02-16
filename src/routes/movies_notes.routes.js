const { Router } = require('express')

const moviesRouters = Router();
const MoviesNotesController = require('../controllers/MoviesNotesController');
const moviesNotesController = new MoviesNotesController();


moviesRouters.get('/:id', moviesNotesController.show);

moviesRouters.get('/', moviesNotesController.index);

// Create a new movie note
moviesRouters.post('/:user_id', moviesNotesController.create);

// Update a movie note
moviesRouters.patch('/:id', moviesNotesController.update);

// Delete a movie note
moviesRouters.delete('/:id', moviesNotesController.delete);

module.exports = moviesRouters;
