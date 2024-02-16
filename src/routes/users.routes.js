const { Router } = require('express')

const usersRouters = Router();
const UsersController = require('../controllers/UsersController');
const usersController = new UsersController();

const MoviesNotesController = require('../controllers/MoviesNotesController');
const moviesNotesController = new MoviesNotesController();



// Show info aboult an user
usersRouters.get('/:id', usersController.show);

// Create a new user
usersRouters.post('/', usersController.create);

// Update an user
usersRouters.patch('/:id', usersController.update);

// Delete an user
usersRouters.delete('/:id', usersController.delete);

// usersRouters.get('/:user_id/movies_notes', moviesNotesController.index);

// Create a new movie note
// usersRouters.post('/:user_id/movies_notes', moviesNotesController.create);

module.exports = usersRouters;
