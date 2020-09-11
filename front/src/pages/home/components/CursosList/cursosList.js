import React, { useEffect, useState } from "react";

import Axios from "axios";
import { useHistory } from "react-router-dom";
import { excelDownload } from "../../../../functions/excelDownload";

import CursosFooter from "../cursosFooter/cursosFooter";
import { FloatedGroup, SegmentArea } from "./styles";
import {
  Segment,
  Table,
  Dimmer,
  Loader,
  Grid,
  Icon,
  Popup,
} from "semantic-ui-react";

function CursosList() {
  const history = useHistory();

  const [cursos, setCursos] = useState([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    setCarregando(true);

    Axios.get('http://localhost:3333/cursos/')
      .then(response=>{
        console.log(response);
        setCursos(response.data)
        setCarregando(false);
      }).catch(error=>{
        console.log(error);
        setCarregando(false);
      })
    return () => {};
  }, []);

  function rowClick(curso) {
    history.push(`/Cursos/${curso.id}`);
    // console.log(curso.id);
  }

  return (
    <>
      <FloatedGroup>
        <SegmentArea>
          {carregando === false ? (
            <>
              <Segment color="blue">
                <Grid columns={2} stackable>
                  <Grid.Row verticalAlign="middle">
                    <Grid.Column>
                      <h2>SELECIONE UM CURSO</h2>
                    </Grid.Column>
                    <Grid.Column style={{ height: "100%" }} textAlign="right">
                      <Popup
                        inverted
                        position="bottom right"
                        content="Exportar lista de cursos para excel"
                        trigger={
                          <Icon
                            style={{ cursor: "pointer" }}
                            name="download"
                            size="large"
                            onClick={()=>excelDownload("cursos",cursos)}
                          />
                        }
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              <Segment.Group>
                <Table celled selectable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        <h3>Curso</h3>
                      </Table.HeaderCell>
                      <Table.HeaderCell>Código</Table.HeaderCell>
                      <Table.HeaderCell>Data de cadastro</Table.HeaderCell>
                      <Table.HeaderCell>Carga horária(horas)</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  {cursos.length < 1 ? (
                    <h3 style={{ padding: "3%" }}>
                      Não há cursos cadastrados no sistema
                    </h3>
                  ) : (
                    <>
                      <Table.Body style={{ cursor: "pointer" }}>
                        {cursos.map((curso, index) => (
                          <Table.Row
                            key={index}
                            onClick={() => rowClick(curso)}
                          >
                            <Table.Cell>
                              <strong>{curso.curso}</strong>
                            </Table.Cell>
                            <Table.Cell>{curso.id}</Table.Cell>
                            <Table.Cell>{curso.data_cadastro}</Table.Cell>
                            <Table.Cell>{curso.carga_horaria}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </>
                  )}
                  <CursosFooter />
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
        </SegmentArea>
      </FloatedGroup>
    </>
  );
}
export default CursosList;
