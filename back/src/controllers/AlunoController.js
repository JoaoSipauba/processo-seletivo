const knex = require('../database');

module.exports = {
    async index(req, res, next) {
        try {
            let { curso_id } = req.query;

            var query = await knex('alunos')
            .join('cursos', 'cursos.id', '=', 'alunos.curso_id')

            if (curso_id) {
                query = await knex('alunos')
                .where({curso_id})
                .join('cursos', 'cursos.id', '=', 'alunos.curso_id')
                // .select('alunos.id', 'alunos.nome', 'curso')
            }
            const results = query;

            return res.json(results);
        } catch (error) {
            next(error);
        }
    },
    async create(req, res, next) {
        try {
            let { nome, curso_id, cep, cpf, email, endereco, telefone } = req.body
            await knex('alunos').insert({
                nome,
                curso_id,
                cep,
                cpf,
                email,
                endereco,
                telefone
            })

            return res.status(201).send(`Aluno inserido com sucesso!`);
        } catch (error) {
            next(error);
        }
    },
    async update(req, res, next) {
        try {
            let { nome, curso_id, cep, cpf, email, endereco, telefone } = req.body
            let { id } = req.params
            await knex('alunos').update({
                nome,
                curso_id,
                cep,
                cpf,
                email,
                endereco,
                telefone
            }).where({ id })

            return res.status(201).send(`Aluno atualizado com sucesso!`);
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next) {
        try {
            let { id } = req.params
            await knex('alunos').delete().where({ id })

            return res.status(201).send(`Aluno excluído com sucesso!`);
        } catch (error) {
            next(error);
        }
    }
}