import React, { useEffect, useState } from "react";
import firebase from "../../../../services/firebase";
import { useHistory } from "react-router-dom";
import { storageClear } from "../../../../functions/storageClear";

import CursosFooter from "../cursosFooter/cursosFooter";
import { FloatedGroup, SegmentArea } from "./styles";
import { Segment, Table, Dimmer, Loader } from "semantic-ui-react";

function CursosList() {
  const history = useHistory();

  const [cursos, setCursos] = useState([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    setCarregando(true);

    storageClear("all")

    var cursos = {};
    firebase
      .database()
      .ref("cursos")
      .on("value", (snapshot) => {
        cursos = snapshot.val();
        if (cursos === null || cursos === undefined) {
          setCursos(false);
        } else {
          setCursos(Object.values(cursos));
          setCarregando(false);
        }
      });
    return () => {};
  }, []);

  function rowClick(curso) {
    sessionStorage.setItem("curso", curso.curso);
    sessionStorage.setItem("idCurso", curso.codigo);
    history.push("/Alunos");
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
                      <Table.HeaderCell>
                        <h3>Curso</h3>
                      </Table.HeaderCell>
                      <Table.HeaderCell>Código</Table.HeaderCell>
                      <Table.HeaderCell>Data de cadastro</Table.HeaderCell>
                      <Table.HeaderCell>Carga horária(horas)</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  {cursos === false ? (
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
                            <Table.Cell>{curso.codigo}</Table.Cell>
                            <Table.Cell>{curso.data}</Table.Cell>
                            <Table.Cell>{curso.cargaHoraria}</Table.Cell>
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
