exports.up = function(knex) {
    return knex.schema.createTable('alunos', function(table) {
        table.increments('id')
        table.text('nome').notNullable()

        // relacionamento
        table.integer('curso_id')
            .references('cursos.id')
            .notNullable()
            .onDelete('CASCADE')

        table.text('cep').notNullable()
        table.text('cpf').notNullable().unique()
        table.text('email').notNullable().unique()
        table.text('endereco').notNullable()
        table.text('telefone').notNullable()
        
    })
};
  
exports.down = function(knex) {
    knex.schema.dropTable('alunos')
};
