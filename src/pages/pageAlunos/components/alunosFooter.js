import React from "react";

import { Table, Button} from "semantic-ui-react";

function AlunosFooter() {
  return (
    <>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="16">
            <Button
              primary
              size="small"
              floated="right"
            >
              Cadastrar aluno
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </>
  );
}
export default AlunosFooter;
