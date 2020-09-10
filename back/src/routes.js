const express = require('express');
const routes = express.Router();

const CursoController = require('./controllers/CursoController')
const AlunoController = require('./controllers/AlunoController')

routes
    // Cursos
    .get('/cursos', CursoController.index)
    .post('/cursos', CursoController.create)
    .put('/cursos/:id', CursoController.update)
    .delete('/cursos/:id', CursoController.delete)
    // Alunos
    .get('/alunos', AlunoController.index)
    .post('/alunos', AlunoController.create)
    .put('/alunos/:id', AlunoController.update)
    .delete('/alunos/:id', AlunoController.delete)

module.exports = routes