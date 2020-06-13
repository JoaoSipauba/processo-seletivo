import React, { useEffect, useState } from "react";
import firebase from "../../../services/firebase";

import CursosFooter from "../cursosFooter/cursosFooter";
import { FloatedGroup, SegmentArea } from "./styles";
import { Segment, Table, Dimmer, Loader } from "semantic-ui-react";

function CursosList() {
  const [cursos, setCursos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  useEffect(() => {
    setCarregando(true)
    var cursos = {};
    firebase
      .database()
      .ref("cursos")
      .on("value", (snapshot) => {
        cursos = snapshot.val();
        setCursos(Object.values(cursos));
        setCarregando(false)
      });
    return () => {};
  }, []);
  return (
    <>
      <FloatedGroup>
        <SegmentArea>
          {carregando === false ? (
            <>
              <Segment>
                <h3>SELECIONE UM CURSO</h3>
              </Segment>
              <Segment.Group>
                <Table celled selectable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Código</Table.HeaderCell>
                      <Table.HeaderCell>Curso</Table.HeaderCell>
                      <Table.HeaderCell>Data de cadastro</Table.HeaderCell>
                      <Table.HeaderCell>Carga horária(horas)</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {cursos.map((curso, index) => (
                      <Table.Row key={index}>
                        <Table.Cell>{curso.codigo}</Table.Cell>
                        <Table.Cell>{curso.curso}</Table.Cell>
                        <Table.Cell>{curso.data}</Table.Cell>
                        <Table.Cell>{curso.cargaHoraria}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
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
