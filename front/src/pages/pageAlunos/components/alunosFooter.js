import React from "react";

import { Table, Button} from "semantic-ui-react";
import { Link } from "react-router-dom";

function AlunosFooter(props) {
  return (
    <>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="16">
            <Link to={`/CadastrarAluno/${props.cursoId}`}>
              <Button primary size="small" floated="right">
                Cadastrar alunos
              </Button>
            </Link>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </>
  );
}
export default AlunosFooter;
