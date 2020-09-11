import React from "react";

import Axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { excelDownload } from "../../../functions/excelDownload";

import { Dropdown, Modal } from "semantic-ui-react";
import ModalEditCurso from "./modalEditCurso";

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
            onClick={() => excelDownload("alunos", id)}
          />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
export default DropdownMenu;
