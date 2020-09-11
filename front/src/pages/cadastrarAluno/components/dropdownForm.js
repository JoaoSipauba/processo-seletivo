import React from "react";
import { useHistory, useParams } from "react-router-dom";

import { Dropdown } from "semantic-ui-react";
import Axios from "axios";

function DropdownForm(props) {
  const history = useHistory();
  const {id} = useParams();
  
  function excluir() {
    Axios.delete('http://localhost:3333/alunos/'+id).then(response=>{
        // console.log(response);
        history.push("/Cursos/"+props.cursoId);
      }).catch(error=>{
        console.log(error);
      })
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
