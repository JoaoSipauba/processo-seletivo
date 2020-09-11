import Axios from "axios";

export async function excelDownload(tipo, id) {
  let { json2excel } = require("js2excel");

  if (tipo === "alunos") {
    var data = [];
    await Axios.get('http://localhost:3333/alunos?curso_id='+id).then(response=>{
      response.data.map((aluno)=>{
        let newAluno = {
          id: aluno.id ,
          nome: aluno.nome ,
          email: aluno.email ,
          cpf: aluno.cpf ,
          cep: aluno.cep ,
          telefone: aluno.telefone ,
          endereço: aluno.endereco
        }
        data.push(newAluno)
        return () => {};
      })
    })
    try {
      json2excel({
        data,
        name: `Lista de alunos`,
        formateDate: "dd/mm/yyyy",
      });
    } catch (e) {
      console.error("export error");
    }
  } else {
    if (tipo === "cursos") {
      var obj = []
      await Axios.get('http://localhost:3333/cursos').then(response=>{
      response.obj.map(curso=>{
        console.log(curso);
        let newCurso = {
          id: curso.id ,
          curso: curso.curso ,
          carga_horaria: curso.carga_horaria,
          data_cadastro: curso.data_cadastro
        }
        obj.push(newCurso)
        return () => {};
      })
    })
      try {
        json2excel({
          data: obj,
          name: `Lista de cursos`,
          formateDate: "dd/mm/yyyy",
        });
      } catch (e) {
        console.error("export error");
      }
    }
  }
}
