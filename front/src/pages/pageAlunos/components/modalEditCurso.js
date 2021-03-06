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
  const [msgColor, setMsgColor] = useState('')

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
      setMsg(true)
      setMsgColor('green')
      console.log(response.data);
      setMsgText(response.data.msg)
      setTimeout(function(){ 
        history.push('/')
      }, 2000);
    }).catch(error=>{
      setMsg(true)
      setMsgColor('red')
      setMsgText(error.response.data.msg)
    })
    
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
        setMsgColor('yellow')
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
            color={msgColor}
            onDismiss={() => {
              setMsg(false);
            }}
            header={msgText}
            content="Verifique os dados e tente novamente."
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
