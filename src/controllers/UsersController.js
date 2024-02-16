const knex = require('../database/knex')
class UsersController {
    async show(request, response){
        const { id } = request.params

        const user = await knex('users').where('id', id).first()
        if(user){
          return response.json(user)
        }

        return response.status(404).json({status: 'error', message: 'Usuário não encontrado!'})
    }

    async create(request, response){
        const { name, email, password, avatar } = request.body

        if(!name) {
            throw new AppError('Nome é obrigatório!')
        }

        const user = await knex('users').insert({name, email, password, avatar})

       if(user) {
        return response.status(200).json({status: 'success', message: 'Usuário cadastrado com sucesso!'})
       }

       return response.status(500).json({status: 'error', message: 'Erro ao cadastrar usuário!'})
    }

    async update(request, response){
        const { name, email, password, avatar} = request.body
        const { id } = request.params
        
        const userUpdate = await knex('users').where('id', id).update({name, email, password, avatar})

        if(userUpdate) {
            return response.status(200).json({status: 'success', message: 'Usuário atualizado com sucesso!'})
        }

        return response.status(500).json({status: 'error', message: 'Erro ao atualizar usuário!'})
    }

    async delete(request, response){
        const { id } = request.params

        await knex('users').where('id', id).delete()

        response.status(200).json({status: 'success', message: 'Usuário deletado com sucesso!'})
    }
}

module.exports = UsersController