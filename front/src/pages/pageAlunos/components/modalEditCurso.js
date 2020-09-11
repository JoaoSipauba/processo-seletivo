import React, { useState, useEffect } from "react";

import { useHistory, useParams } from "react-router-dom";

import { Modal, Message, Form, Button } from "semantic-ui-react";
import Axios from "axios";

function ModalEditCurso() {
  const history = useHistory();
  const {id} = useParams();

  const [cursoInput, setCursoInput] = useState();
  const [cargaHorariaInput, setCargaHorariaInput] = useState();
  const [objCurso, setObjCurso] = useState();
  const [msg, setMsg] = useState(false);
  const [msgText, setMsgText] = useState("");

  useEffect(()=>{
    Axios.get('http://localhost:3333/cursos?curso_id='+id).then(response=>{
      let data = response.data[0]
      setObjCurso(data);
      setCursoInput(data.curso)
      setCargaHorariaInput(data.carga_horaria)

    }).catch(error=>{
      console.log(error);
    })
    return () => {};
  },[id])
  function editCurso() {
    let curso = {
      curso: cursoInput,
      carga_horaria: cargaHorariaInput
    }
    Axios.put('http://localhost:3333/cursos/'+id,curso).then(response=>{
      history.push('/')
    }).catch(error=>{
      console.log(error);
    })
    // firebase
    //   .database()
    //   .ref(`/cursos/${sessionStorage.getItem("idCurso")}`)
    //   .update({
    //     curso: cursoInput,
    //     cargaHoraria: cargaHorariaInput,
    //   })
    //   .then(() => {});
    
  }
  function inputCheck() {
    if (cursoInput === "" || cargaHorariaInput === "") {
      setMsg(true);
      setMsgText("Preencha os campos e tente novamente.");
    } else {
      if (
        cursoInput === objCurso.curso &&
        cargaHorariaInput === objCurso.carga_horaria
      ) {
        setMsg(true);
        setMsgText("Não houveram alterações neste curso.");
      } else {
        editCurso();
        // history.push("/");
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
