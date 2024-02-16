const { Router } = require('express')
const routes = Router()

// Route files imports
const usersRouters = require('./users.routes')
const moviesNotesRouters = require('./movies_notes.routes')
const moviesTagsRouters = require('./movies_tags.routes')

// Define group routers
routes.use('/users', usersRouters)
routes.use('/movies_notes', moviesNotesRouters)
routes.use('/movies_tags', moviesTagsRouters)

module.exports = routes