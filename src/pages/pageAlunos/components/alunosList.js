import React from "react";
// import firebase from "../../../../services/firebase";

import AlunosFooter from "./alunosFooter";
import {
  FloatedGroup,
  SegmentArea,
} from "../../home/components/CursosList/styles";
import { Segment, Table } from "semantic-ui-react";

function CursosList() {
  return (
    <>
      <FloatedGroup>
        <SegmentArea>
          <>
            <Segment color="blue">
              <h2>Alunos de {sessionStorage.getItem("curso")}:</h2>
            </Segment>
            <Segment.Group>
              <Table compact>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Código</Table.HeaderCell>
                    <Table.HeaderCell>Nome</Table.HeaderCell>
                    <Table.HeaderCell>CPF</Table.HeaderCell>
                    <Table.HeaderCell>Endereço</Table.HeaderCell>
                    <Table.HeaderCell>CEP</Table.HeaderCell>
                    <Table.HeaderCell>E-mail</Table.HeaderCell>
                    <Table.HeaderCell>Telefone</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Pedro da Silva Carvalho</Table.Cell>
                    <Table.Cell>60175853402</Table.Cell>
                    <Table.Cell>
                      Res pinheiros rua 3 quadra 6 n9 cohama
                    </Table.Cell>
                    <Table.Cell>64018540</Table.Cell>
                    <Table.Cell>pedrodasilva@gmail.com</Table.Cell>
                    <Table.Cell>(98)984445405</Table.Cell>
                  </Table.Row>
                </Table.Body>
                <AlunosFooter />
              </Table>
            </Segment.Group>
          </>
        </SegmentArea>
      </FloatedGroup>
    </>
  );
}
export default CursosList;
