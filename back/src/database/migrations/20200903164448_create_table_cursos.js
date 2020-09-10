
exports.up = function(knex) {
    return knex.schema.createTable('cursos', function(table) {
        table.increments('id')
        table.text('curso').unique().notNullable()
        table.integer('carga_horaria').notNullable()
        table.text('data_cadastro').notNullable()
    })
  };
  
exports.down = function(knex) {
    knex.schema.dropTable('cursos')
};