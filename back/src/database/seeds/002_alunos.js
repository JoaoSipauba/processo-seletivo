
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('alunos').del()
    .then(function () {
      // Inserts seed entries
      return knex('alunos').insert([
        {
          nome: 'João Sipauba',
          curso_id: 5,
          cep: '65000-000',
          cpf: '604.182.593-05',
          email: 'joaosipauba@hotmail.com',
          endereco: 'rua dos perdizes numero 9',
          telefone: '(98)99169-9685'
        },
      ]);
    });
};
