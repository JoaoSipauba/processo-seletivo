import React, { useEffect, useState } from "react";
import firebase from "../../../services/firebase";
import { useHistory } from "react-router-dom";
import { storageClear } from "../../../functions/storageClear";

import AlunosFooter from "./alunosFooter";
import {
  FloatedGroup,
  SegmentArea,
} from "../../home/components/CursosList/styles";
import DropdownMenu from "./dropdownMenu";
import { Segment, Table, Dimmer, Loader, Grid } from "semantic-ui-react";

function CursosList() {

  const history = useHistory();

  const [alunosList, setAlunosList] = useState([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    setCarregando(true);

    storageClear("alunos");
    
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

  function rowClick(aluno) {
    sessionStorage.setItem("aluno", aluno.nome);
    sessionStorage.setItem("codigo", aluno.codigo);
    sessionStorage.setItem("cpf", aluno.cpf);
    sessionStorage.setItem("endereco", aluno.endereco);
    sessionStorage.setItem("cep", aluno.cep);
    sessionStorage.setItem("email", aluno.email);
    sessionStorage.setItem("telefone", aluno.telefone);
    history.push("/CadastrarAluno");
  }

  return (
    <>
      <FloatedGroup>
        <SegmentArea>
          <>
            {carregando === false ? (
              <>
                <Segment color="blue">
                  <Grid columns={2} stackable>
                    <Grid.Row verticalAlign="middle">
                      <Grid.Column>
                        <h2>Alunos de {sessionStorage.getItem("curso")}:</h2>
                      </Grid.Column>
                      <Grid.Column style={{height: "100%"}} textAlign="right">
                        <DropdownMenu />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
                <Segment.Group>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Código</Table.HeaderCell>
                        <Table.HeaderCell>Nome</Table.HeaderCell>
                        {/* <Table.HeaderCell>CPF</Table.HeaderCell>
                        <Table.HeaderCell>Endereço</Table.HeaderCell>
                        <Table.HeaderCell>CEP</Table.HeaderCell> */}
                        <Table.HeaderCell>E-mail</Table.HeaderCell>
                        <Table.HeaderCell>Telefone</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    {alunosList === false ? (
                      <Table.Body>
                        <h3 style={{ padding: "3%" }}>
                          Não há alunos cadastrados nesta disciplina
                        </h3>
                      </Table.Body>
                    ) : (
                      <>
                        <Table.Body style={{ cursor: "pointer" }}>
                          {alunosList.map((aluno, index) => (
                            <Table.Row key={index} onClick={()=> rowClick(aluno)}>
                              <Table.Cell>{aluno.codigo}</Table.Cell>
                              <Table.Cell>
                                <strong>{aluno.nome}</strong>
                              </Table.Cell>
                              {/* <Table.Cell>{aluno.cpf}</Table.Cell> */}
                              {/* <Table.Cell>{aluno.endereco}</Table.Cell> */}
                              {/* <Table.Cell>{aluno.cep}</Table.Cell> */}
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
