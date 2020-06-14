import React, { useState } from "react";
import firebase from "../../../services/firebase";

import { Table, Button, Modal, Icon, Message, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";

function AlunosFooter() {
  const [modalAdd, setModalAdd] = useState(false);
  const [msg, setMsg] = useState(false);
  const [cursoInput, setCursoInput] = useState("");
  const [cargaHorariaInput, setCargaHorariaInput] = useState("");

  function idGen() {
    var id = 0;
    firebase
      .database()
      .ref("cursos")
      .once("value", (doc) => {
        doc.forEach((snapshot) => {
          id = snapshot.val().codigo;
        });
        addCurso(id);
      });
  }
  function addCurso(id) {
    const now = new Date();
    var data =
      now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();

    var curso = {
      codigo: parseInt(id) + 1,
      curso: cursoInput,
      data,
      cargaHoraria: cargaHorariaInput,
    };
    firebase
      .database()
      .ref(`/cursos/${curso.codigo}`)
      .set(curso)
      .then(() => {
        setModalAdd(false);
      });
  }
  function inputCheck() {
    if (cursoInput === "" || cargaHorariaInput === "") {
      setMsg(true);
    } else {
      idGen();
    }
  }
  return (
    <>
      <Modal open={modalAdd} size="tiny">
        <Modal.Header>Cadastrar Curso</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              fluid
              label="Curso:"
              onChange={(e) => setCursoInput(e.target.value)}
              placeholder="Nome do curso"
            ></Form.Input>
            <Form.Input
              fluid
              label="Carga horária(horas):"
              onChange={(e) => setCargaHorariaInput(e.target.value)}
              placeholder="Carga hóraria do curso"
            ></Form.Input>
          </Form>

          {msg ? (
            <Message
              size="small"
              warning
              onDismiss={() => {
                setMsg(false);
              }}
              header="Há campos vazios!"
              content="Preencha os campos e tente novamente."
            />
          ) : (
            ""
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              setModalAdd(false);
              setMsg(false);
            }}
          >
            Cancelar
          </Button>
          <Button onClick={inputCheck} icon primary labelPosition="right">
            Cadastrar
            <Icon name="check" />
          </Button>
        </Modal.Actions>
      </Modal>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="16">
            <Link to="/CadastrarAluno">
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
