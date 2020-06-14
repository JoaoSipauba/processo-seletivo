import React, { useEffect, useState } from "react";
import firebase from "../../../services/firebase";

import AlunosFooter from "./alunosFooter";
import {
  FloatedGroup,
  SegmentArea,
} from "../../home/components/CursosList/styles";
import { Segment, Table, Dimmer, Loader } from "semantic-ui-react";

function CursosList() {
  const [alunosList, setAlunosList] = useState([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    setCarregando(true);
    var alunos = {};
    firebase
      .database()
      .ref(`cursos/${sessionStorage.getItem("idCurso")}/alunos`)
      .on("value", (snapshot) => {
        alunos = snapshot.val();
        if (alunos === null || alunos === undefined) {
          setAlunosList(false);
        } else {
          setAlunosList(Object.values(alunos));
        }
        setCarregando(false);
      });
    return () => {};
  }, []);
  return (
    <>
      <FloatedGroup>
        <SegmentArea>
          <>
            {carregando === false ? (
              <>
                <Segment color="blue">
                  <h2>Alunos de {sessionStorage.getItem("curso")}:</h2>
                </Segment>
                <Segment.Group>
                  <Table celled>
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
                    {alunosList === false ? (
                      <h3 style={{ padding: "3%" }}>
                        Não há alunos cadastrados nesta disciplina
                      </h3>
                    ) : (
                      <>
                        <Table.Body style={{ cursor: "pointer" }}>
                          {alunosList.map((aluno, index) => (
                            <Table.Row key={index}>
                              <Table.Cell>{aluno.codigo}</Table.Cell>
                              <Table.Cell>
                                <strong>{aluno.nome}</strong>
                              </Table.Cell>
                              <Table.Cell>{aluno.cpf}</Table.Cell>
                              <Table.Cell>{aluno.endereco}</Table.Cell>
                              <Table.Cell>{aluno.cep}</Table.Cell>
                              <Table.Cell>{aluno.email}</Table.Cell>
                              <Table.Cell>{aluno.telefone}</Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </>
                    )}
                    <AlunosFooter />
                  </Table>
                </Segment.Group>
              </>
            ) : (
              <>
                <Dimmer active>
                  <Loader size="big">Listando cursos</Loader>
                </Dimmer>
              </>
            )}
          </>
        </SegmentArea>
      </FloatedGroup>
    </>
  );
}
export default CursosList;
