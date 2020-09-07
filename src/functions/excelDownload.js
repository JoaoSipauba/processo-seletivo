// import firebase from "../services/firebase";

export function excelDownload(tipo, obj) {
  let { json2excel } = require("js2excel");

  if (tipo === "alunos") {
    var data = [];
    // firebase
    //   .database()
    //   .ref(`/cursos/${sessionStorage.getItem("idCurso")}`)
    //   .once("value")
    //   .then((snapshot) => {
    //     snapshot.val().alunos.forEach((aluno) => {
    //       data.push(aluno);
    //     });
    //     try {
    //       json2excel({
    //         data,
    //         name: `Lista de alunos`,
    //         formateDate: "dd/mm/yyyy",
    //       });
    //     } catch (e) {
    //       console.error("export error");
    //     }
    //   });
  } else {
    if (tipo === "cursos") {
      for (let index = 0; index < obj.length; index++) {
        const curso = obj[index];
        delete curso.alunos;
      }
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
