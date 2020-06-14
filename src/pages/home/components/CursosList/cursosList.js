import React, { useEffect, useState } from "react";
import firebase from "../../../../services/firebase";

import CursosFooter from "../cursosFooter/cursosFooter";
import { FloatedGroup, SegmentArea } from "./styles";
import { Segment, Table, Dimmer, Loader } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

function CursosList() {
  const history = useHistory()

  const [cursos, setCursos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  
  useEffect(() => {
    setCarregando(true);
    sessionStorage.setItem("curso", "" )
    sessionStorage.setItem("idCurso", "" )
    var cursos = {};
    firebase
      .database()
      .ref("cursos")
      .on("value", (snapshot) => {
        cursos = snapshot.val();
        setCursos(Object.values(cursos));
        setCarregando(false);
      });
    return () => {};
  }, []);

  function rowClick(curso) {
    sessionStorage.setItem("curso", curso.curso )
    sessionStorage.setItem("idCurso", curso.codigo )
    history.push("/Alunos")
  }

  return (
    <>
      <FloatedGroup>
        <SegmentArea>
          {carregando === false ? (
            <>
              <Segment color="blue">
                <h2>SELECIONE UM CURSO</h2>
              </Segment>
              <Segment.Group>
                <Table celled selectable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell><h3>Curso</h3></Table.HeaderCell>
                      <Table.HeaderCell>Código</Table.HeaderCell>
                      <Table.HeaderCell>Data de cadastro</Table.HeaderCell>
                      <Table.HeaderCell>Carga horária(horas)</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body style={{cursor: 'pointer'}}>
                    {cursos.map((curso, index) => (
                      <Table.Row
                        key={index}
                        onClick={()=> rowClick(curso)}
                      >
                        <Table.Cell>
                          <strong>{curso.curso}</strong>
                        </Table.Cell>
                        <Table.Cell>{curso.codigo}</Table.Cell>
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
