import React from "react";

// import firebase from "../../../services/firebase";
import { useHistory, useParams } from "react-router-dom";
import { excelDownload } from "../../../functions/excelDownload";

import { Dropdown, Modal } from "semantic-ui-react";
import ModalEditCurso from "./modalEditCurso";
import Axios from "axios";

function DropdownMenu() {
  const history = useHistory();
  const {id} = useParams();

  function excluir() {
    Axios.delete('http://localhost:3333/cursos/'+id).then(response=>{
      console.log(response);
      history.push('/')
    }).catch(error=>{
      console.log(error)
    })
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
