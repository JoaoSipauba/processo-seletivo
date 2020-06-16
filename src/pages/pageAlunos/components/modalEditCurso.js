import React, { useState } from "react";

import firebase from "../../../services/firebase";
import { useHistory } from "react-router-dom";

import { Modal, Message, Form, Button } from "semantic-ui-react";

function ModalEditCurso() {
  const history = useHistory();

  const [cursoInput, setCursoInput] = useState(sessionStorage.getItem("curso"));
  const [cargaHorariaInput, setCargaHorariaInput] = useState(
    sessionStorage.getItem("cargaHoraria")
  );
  const [msg, setMsg] = useState(false);
  const [msgText, setMsgText] = useState("");

  function editCurso() {
    firebase
      .database()
      .ref(`/cursos/${sessionStorage.getItem("idCurso")}`)
      .update({
        curso: cursoInput,
        cargaHoraria: cargaHorariaInput,
      })
      .then(() => {});
  }
  function inputCheck() {
    if (cursoInput === "" || cargaHorariaInput === "") {
      setMsg(true);
      setMsgText("Preencha os campos e tente novamente.");
    } else {
      if (
        cursoInput === sessionStorage.getItem("curso") &&
        cargaHorariaInput === sessionStorage.getItem("cargaHoraria")
      ) {
        console.log("inputs iguais");
        setMsg(true);
        setMsgText("Não houveram alterações neste curso.");
      } else {
        editCurso();
        console.log("editou");
        history.push("/");
      }
    }
  }
  return (
    <>
      <Modal.Header>Editar Curso</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            fluid
            label="Curso:"
            value={cursoInput}
            onChange={(e) => setCursoInput(e.target.value)}
            placeholder="Nome do curso"
          ></Form.Input>
          <Form.Input
            fluid
            label="Carga horária(horas):"
            value={cargaHorariaInput}
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
            header={msgText}
            content="Verifique e tente novamente."
          />
        ) : (
          ""
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={inputCheck} negative>
          Confirmar alteração
        </Button>
      </Modal.Actions>
    </>
  );
}
export default ModalEditCurso;
