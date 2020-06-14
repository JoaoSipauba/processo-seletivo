import React from "react";
import firebase from "../../../services/firebase";
import { useHistory } from "react-router-dom";

import { Dropdown } from "semantic-ui-react";

function DropdownMenu() {

  const history = useHistory();

  function excluir() {
    var curso = sessionStorage.getItem("idCurso");
    firebase
      .database()
      .ref(`/cursos/${curso}`)
      .remove()
      .then(() => {
        history.push("/")
      });
  }
  return (
    <Dropdown style={{height: "100%"}} icon="align justify" className="icon">
      <Dropdown.Menu direction="left">
        <Dropdown.Item
          icon="pencil"
          text="Editar curso"
        />
        <Dropdown.Item icon="dont" text="Excluir curso" onClick={excluir} />
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default DropdownMenu;
