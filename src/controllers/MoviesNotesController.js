const knex = require('../database/knex')
class MoviesNotesController {
    async index(request, response){
        const { user_id, title, tags} = request.query

        let movie_notes

        if(title && !tags){
          movie_notes = await knex('movie_notes')
            .where({ user_id})
            .whereLike('title', `%${title}%`)
            .select('id', 'title', 'description', 'rating')
            .orderBy('title')
        } else if(tags && title){
            const filterTags = tags.split(',').map(tag => tag.trim())

            movie_notes = await knex('movie_tags')
            .select([
                'movie_notes.id',
                'movie_notes.title',
                'movie_notes.description',
                'movie_notes.rating'
            ])
            .where('movie_notes.user_id', user_id)
            .whereLike('movie_notes.title', `%${title}%`)
            .whereIn('name', filterTags)
            .innerJoin('movie_notes', 'movie_notes.id', 'movie_tags.note_id')
            .orderBy('movie_notes.title')

        } else if(tags && !title){
            const filterTags = tags.split(',').map(tag => tag.trim())

            movie_notes = await knex('movie_tags')
            .select([
                'movie_notes.id',
                'movie_notes.title',
                'movie_notes.description',
                'movie_notes.rating'
            ])
            .where('movie_notes.user_id', user_id)
            .whereIn('name', filterTags)
            .innerJoin('movie_notes', 'movie_notes.id', 'movie_tags.note_id')
            .orderBy('movie_notes.title')

        } else {
            movie_notes = await knex('movie_tags')
            .select([
                'movie_notes.id',
                'movie_notes.title',
                'movie_notes.description',
                'movie_notes.rating'
            ])
            .where('movie_notes.user_id', user_id)
            .innerJoin('movie_notes', 'movie_notes.id', 'movie_tags.note_id')
            .orderBy('movie_notes.title')
        }

        response.json(movie_notes)
    }

    async show(request, response){
        const { id } = request.params
        const movie_note = await knex('movie_notes').where('id', id).first().select('id', 'title', 'description', 'rating')
        const tags = await knex('movie_tags').where('note_id', id).orderBy('name').select('name', 'id')

        if(movie_note){
          return response.json({...movie_note, tags})
        }
        
        response.status(404).json({status: 'error', message: 'Nota não encontrada!'})
    }

    async create(request, response){
        const { title, description, rating, tags } = request.body
        const { user_id } = request.params
        const [note_id] = await knex('movie_notes').insert({title, description, rating, user_id})

        const tagsInsert = tags.map(name => {
            return {
                name,
                note_id,
                user_id
            }
        });

        await knex('movie_tags').insert(tagsInsert)

        response.json({status: 'success', message: 'Nota cadastrada com sucesso!'})
    }

    async delete(request, response){
        const { id } = request.params
        const movie_note = await knex('movie_notes').where('id', id).first()

        if (!id || !movie_note) {
            return response.status(404).json({status: 'error', message: 'Nota não encontrada!'})
        }

        await knex('movie_notes').where('id', id).delete()

        response.status(200).json({status: 'success', message: 'Nota deletada com sucesso!'})

    }
}

module.exports = MoviesNotesController