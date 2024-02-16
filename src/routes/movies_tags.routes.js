const { Router } = require('express')

const tagsRouters = Router();
const MoviesTagsController = require('../controllers/MoviesTagsController');
const moviesTagsController = new MoviesTagsController();


tagsRouters.get('/:user_id', moviesTagsController.index);


module.exports = tagsRouters;
