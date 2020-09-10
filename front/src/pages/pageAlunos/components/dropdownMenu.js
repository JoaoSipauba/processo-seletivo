import React from "react";

// import firebase from "../../../services/firebase";
import { useHistory } from "react-router-dom";
import { excelDownload } from "../../../functions/excelDownload";

import { Dropdown, Modal } from "semantic-ui-react";
import ModalEditCurso from "./modalEditCurso";

function DropdownMenu() {
  const history = useHistory();

  var curso = sessionStorage.getItem("idCurso");

  function excluir() {
    // firebase
    //   .database()
    //   .ref(`/cursos/${curso}`)
    //   .remove()
    //   .then(() => {
    //     history.push("/");
    //   });
  }
  return (
    <>
      <Dropdown
        style={{ height: "100%" }}
        icon="align justify"
        className="icon"
      >
        <Dropdown.Menu direction="left">
          <Modal
            size="tiny"
            trigger={<Dropdown.Item icon="pencil" text="Editar curso" />}
            closeIcon
          >
            <ModalEditCurso />
          </Modal>
          <Dropdown.Item icon="trash" text="Excluir curso" onClick={excluir} />
          <Dropdown.Divider />
          <Dropdown.Item
            icon="file alternate"
            text="Exportar para excel"
            onClick={() => excelDownload("alunos")}
          />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
export default DropdownMenu;
