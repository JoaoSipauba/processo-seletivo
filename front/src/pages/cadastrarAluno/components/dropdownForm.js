import React from "react";
// import firebase from "../../../services/firebase";
import { useHistory } from "react-router-dom";

import { Dropdown } from "semantic-ui-react";

function DropdownForm() {
  const history = useHistory();

  function excluir() {
    // firebase
    //   .database()
    //   .ref(
    //     `/cursos/${sessionStorage.getItem(
    //       "idCurso"
    //     )}/alunos/${sessionStorage.getItem("codigo")}`
    //   )
    //   .remove()
    //   .then(() => {
    //     history.push("/Alunos");
    //   });
  }
  return (
    <Dropdown style={{ height: "100%" }} icon="align justify" className="icon">
      <Dropdown.Menu direction="left">
        <Dropdown.Item icon="trash" text="Excluir aluno" onClick={excluir} />
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default DropdownForm;
