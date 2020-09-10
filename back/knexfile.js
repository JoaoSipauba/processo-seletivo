// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: "gerenciamentoDeAlunos",
      user: "postgres",
      password: "0000"
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  },
};
