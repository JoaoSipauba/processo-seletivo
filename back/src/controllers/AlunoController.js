const knex = require('../database');

module.exports = {
    async index(req, res, next) {
        try {
            let { curso_id, aluno_id } = req.query;

            var query = await knex('alunos')
            .join('cursos', 'cursos.id', '=', 'alunos.curso_id')
            .select('alunos.*', 'cursos.curso', 'cursos.carga_horaria')
            .orderBy('nome')

            if (curso_id) {
                query = await knex('alunos')
                .where({curso_id})
                .join('cursos', 'cursos.id', '=', 'alunos.curso_id')
                .select('alunos.*', 'cursos.curso', 'cursos.carga_horaria')
                .orderBy('nome')
            }
            if (aluno_id) {
                query = await knex('alunos')
                .where({id:aluno_id})
            }
            const results = query;

            return res.json(results);
        } catch (error) {
            next(error);
        }
    },
    async create(req, res, next) {
        let { nome, curso_id, cep, cpf, email, endereco, telefone } = req.body
        try {
            await knex('alunos').insert({
                nome,
                curso_id,
                cep,
                cpf,
                email,
                endereco,
                telefone
            })
            res.status(201).send({status: 201, msg: `Aluno cadastrado com sucesso!`});
        } catch (error) {
            switch (error.constraint) {
                case 'alunos_cpf_unique':
                    var msg = 'Cpf já cadastrado!'
                    break;
                case 'alunos_email_unique':
                    var msg = 'Email já cadastrado!'
                    break;
                default:
                    var msg = 'Erro ao cadastrar aluno!'
                    break;
            }
            res.status(400).send({status: 400, msg})
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