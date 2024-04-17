const { Router } = require('express')

const MoviesTagsController = require('../controllers/MoviesTagsController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const tagsRouters = Router();

const moviesTagsController = new MoviesTagsController();

tagsRouters.get('/', ensureAuthenticated, moviesTagsController.index);

module.exports = tagsRouters