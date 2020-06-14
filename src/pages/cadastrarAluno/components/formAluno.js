import React, { useState } from "react";
import firebase from "../../../services/firebase";
import {useHistory} from "react-router-dom"

import { mCEP, mTel, mCPF } from "../../../functions/masks";

import { FloatedGroup, SegmentArea, FormularioAluno } from "./styles";
import { Segment, Form, TextArea, Dimmer, Loader } from "semantic-ui-react";

function FormAluno() {
  const history = useHistory();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  const [carregando, setCarregando] = useState(false);

  function idGen() {
    setCarregando(true);
    var id = 1;
    firebase
      .database()
      .ref(`cursos/${sessionStorage.getItem("idCurso")}/alunos`)
      .once("value", (doc) => {
        doc.forEach((snapshot) => {
          id = snapshot.val().codigo;
        });
        if (id === undefined) {
          id = 1;
          btnCadastro(id);
        } else {
          btnCadastro(id);
        }
      });
  }
  function btnCadastro(id) {
    var aluno = {
      codigo: id,
      nome,
      cpf: mCPF(cpf),
      email,
      cep: mCEP(cep),
      telefone: mTel(telefone),
      endereco,
    };

    firebase
      .database()
      .ref(
        `/cursos/${sessionStorage.getItem("idCurso")}/alunos/${aluno.codigo}`
      )
      .set(aluno)
      .then(() => {
        setCarregando(false);
        history.push("/Alunos")
      });
  }

  return (
    <>
      <FloatedGroup>
        <SegmentArea>
          {carregando === false ? (
            <>
              <Segment color="blue">
                <h2>Cadastro de alunos</h2>
              </Segment>
              <Segment.Group>
                <FormularioAluno>
                  <Form.Group>
                    <Form.Input
                      label="Nome completo"
                      placeholder="João Pedro da Silva"
                      width={13}
                      onChange={(e) => setNome(e.target.value)}
                    />
                    <Form.Input
                      label="CPF"
                      placeholder="65432145605"
                      width={4}
                      onChange={(e) => setCpf(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      label="Email"
                      placeholder="joaopedrodasilva@gmail.com"
                      width={9}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Input
                      label="Cep"
                      placeholder="65000000"
                      width={3}
                      onChange={(e) => setCep(e.target.value)}
                    />
                    <Form.Input
                      label="Telefone"
                      placeholder="98991644852"
                      width={4}
                      onChange={(e) => setTelefone(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      control={TextArea}
                      label="Endereço"
                      placeholder="rua dos perdizes n9 centro"
                      width={10}
                      onChange={(e) => setEndereco(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Button fluid size="large" primary onClick={idGen}>
                    Cadastrar
                  </Form.Button>
                </FormularioAluno>
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
export default FormAluno;
