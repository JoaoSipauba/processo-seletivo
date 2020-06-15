import firebase from "../services/firebase";

export function excelDownload() {
    let { json2excel } = require("js2excel");

    var data = [];

    firebase
      .database()
      .ref(`/cursos/${sessionStorage.getItem("idCurso")}`)
      .once("value")
      .then((snapshot) => {
        // let data = snapshot.val().alunos;
        snapshot.val().alunos.forEach((aluno) => {
          data.push(aluno);
        });
        try {
          json2excel({
            data,
            name: `Lista de alunos`,
            formateDate: "dd/mm/yyyy",
          });
        } catch (e) {
          console.error("export error");
        }
      });
  }