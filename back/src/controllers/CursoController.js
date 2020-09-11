const knex = require('../database');
function date(params) {
    var data = new Date()
    
    var dia = data.getDate();
    if (dia <= 9){
        dia = `0${dia}`
    }
    var mes = data.getMonth();
    if (mes+1 <= 9){
        mes = `0${mes+1}`
    }
    var ano4 = data.getFullYear();
    
    return dia + '/' + (mes) + '/' + ano4;
}

module.exports = {
    async index(req, res){
        let { curso_id } = req.query;

        let query = await knex('cursos').orderBy('curso')
        
        if (curso_id) {
            query = await knex('cursos').orderBy('curso')
            .where({id:curso_id})
        }
        return res.json(query);
    },
    async create(req, res, next){
        try {
            let {curso, carga_horaria} = req.body
            let data_cadastro = await date()
            await knex('cursos').insert({
                curso,
                carga_horaria,
                data_cadastro
            })
            return res.status(201).send(`Curso ${curso} inserido com sucesso!`);
        } catch (error) {
            next(error);
        }
    },
    async update(req, res, next){
        try {
            let {curso, carga_horaria} = req.body
            let { id } = req.params
            await knex('cursos').update({ 
                curso,
                carga_horaria
            }).where({id})
            return res.status(201).send(`Curso ${curso} atualizado com sucesso!`);
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next){
        try {
            let { id } = req.params
            await knex('cursos').delete().where({id})
            return res.status(201).send(`Curso excluído com sucesso!`);
        } catch (error) {
            next(error);
        }
    }
}