import React, { useEffect, useState } from "react";

import Axios from "axios";
import { useHistory, useParams } from "react-router-dom";

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
  const [curso, setCurso] = useState();
  const [carregando, setCarregando] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    setCarregando(true);
    Axios.get('http://localhost:3333/alunos?curso_id='+id)
      .then(response=>{
        setAlunosList(response.data)
        if (response.data.length === 0) {
          console.log(response.data);
          Axios.get('http://localhost:3333/cursos?curso_id='+id).then(res=>{
            setCurso(res.data[0].curso)
          })
        }
        else{
          setCurso(response.data[0].curso)
        }
        setCarregando(false);
      }).catch(error=>{
        console.log(error);
        setCarregando(false);
      })
    return () => {};
  }, []);

  function rowClick(aluno_id) {
    history.push("/AlterarAluno/"+aluno_id);
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
                        <h2>Alunos de {curso}:</h2>
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
                        <Table.HeaderCell>E-mail</Table.HeaderCell>
                        <Table.HeaderCell>Telefone</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    {alunosList.length < 1 ? (
                      <Table.Body>
                        <h3 style={{ padding: "3%" }}>
                          Não há alunos cadastrados nesta disciplina
                        </h3>
                      </Table.Body>
                    ) : (
                      <>
                        <Table.Body style={{ cursor: "pointer" }}>
                          {alunosList.map((aluno, index) => (
                            <Table.Row key={index} onClick={()=> rowClick(aluno.id)}>
                              <Table.Cell>{aluno.id}</Table.Cell>
                              <Table.Cell>
                                <strong>{aluno.nome}</strong>
                              </Table.Cell>
                              <Table.Cell>{aluno.email}</Table.Cell>
                              <Table.Cell>{aluno.telefone}</Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </>
                    )}
                    <AlunosFooter cursoId={id}/>
                  </Table>
                </Segment.Group>
              </>
            ) : (
              <>
                <Dimmer active>
                  <Loader size="big">Listando alunos</Loader>
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
