
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cursos').del()
    .then(function () {
      // Inserts seed entries
      return knex('cursos').insert([
        {curso: 'Direito', carga_horaria: 1800}
      ]);
    });
};
