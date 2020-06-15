import React, { useState, useEffect } from "react";
import firebase from "../../../services/firebase";
import { useHistory } from "react-router-dom";

import { mCEP, mTel, mCPF } from "../../../functions/masks";

import { FloatedGroup, SegmentArea, FormularioAluno } from "./styles";
import DropdownForm from "./dropdownForm";
import {
  Segment,
  Form,
  TextArea,
  Dimmer,
  Loader,
  Message,
  Grid,
} from "semantic-ui-react";

function FormAluno() {
  const history = useHistory();

  const [cadastro, setCadastro] = useState(true);
  const [nome, setNome] = useState(sessionStorage.getItem("aluno"));
  const [cpf, setCpf] = useState(sessionStorage.getItem("cpf"));
  const [email, setEmail] = useState(sessionStorage.getItem("email"));
  const [cep, setCep] = useState(sessionStorage.getItem("cep"));
  const [telefone, setTelefone] = useState(sessionStorage.getItem("telefone"));
  const [endereco, setEndereco] = useState(sessionStorage.getItem("endereco"));

  const [carregando, setCarregando] = useState(false);
  const [msg, setMsg] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("codigo") !== "") {
      setCadastro(false);
    }
    return () => {};
  }, []);

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
          btnCadastro(id + 1);
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
        history.push("/Alunos");
      });
  }

  function update() {
    setCarregando(true)
    firebase
      .database()
      .ref(
        `/cursos/${sessionStorage.getItem(
          "idCurso"
        )}/alunos/${sessionStorage.getItem("codigo")}`
      )
      .update({
        nome,
        cpf: mCPF(cpf),
        email,
        cep: mCEP(cep),
        telefone: mTel(telefone),
        endereco,
      })
      .then(() => {
        setCarregando(false)
        history.push("/Alunos");
      });
  }
  function inputCheck() {
    if (
      nome === "" ||
      cpf === "" ||
      cep === "" ||
      endereco === "" ||
      email === "" ||
      telefone === ""
    ) {
      setMsg(true);
    } else {
      if (cadastro) {
        idGen();
      } else {
        update();
      }
    }
  }
  return (
    <>
      <FloatedGroup>
        <SegmentArea>
          {carregando === false ? (
            <>
              <Segment color="grey">
                {cadastro ? (
                  <h2>Cadastro de alunos</h2>
                ) : (
                  <>
                    <Grid columns={2} stackable>
                      <Grid.Row verticalAlign="middle">
                        <Grid.Column>
                          <h2>Alterar aluno</h2>
                        </Grid.Column>
                        <Grid.Column
                          style={{ height: "100%" }}
                          textAlign="right"
                        >
                          <DropdownForm />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </>
                )}
              </Segment>
              <Segment.Group>
                <FormularioAluno>
                  <Form.Group>
                    <Form.Input
                      label="Nome completo"
                      placeholder="João Pedro da Silva"
                      width={13}
                      onChange={(e) => setNome(e.target.value)}
                      value={nome}
                    />
                    <Form.Input
                      label="CPF"
                      placeholder="65432145605"
                      width={4}
                      onChange={(e) => setCpf(e.target.value)}
                      value={cpf}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      label="Email"
                      placeholder="joaopedrodasilva@gmail.com"
                      width={9}
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email"
                    />
                    <Form.Input
                      label="Cep"
                      placeholder="65000-000"
                      width={3}
                      onChange={(e) => setCep(e.target.value)}
                      value={cep}
                    />
                    <Form.Input
                      label="Telefone"
                      placeholder="(98)99164-4852"
                      width={4}
                      onChange={(e) => setTelefone(e.target.value)}
                      value={telefone}
                      type="tel"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      control={TextArea}
                      label="Endereço"
                      placeholder="rua dos perdizes n9 centro"
                      width={10}
                      onChange={(e) => setEndereco(e.target.value)}
                      value={endereco}
                    />
                  </Form.Group>

                  <Message
                    visible={msg}
                    size="big"
                    warning
                    onDismiss={() => {
                      setMsg(false);
                    }}
                    header="Há campos vazios!"
                    content="Preencha os campos e tente novamente."
                  />

                  {cadastro ? (
                    <Form.Button
                      fluid
                      size="large"
                      primary
                      onClick={inputCheck}
                    >
                      Cadastrar
                    </Form.Button>
                  ) : (
                    <Form.Button
                      fluid
                      size="large"
                      negative
                      onClick={inputCheck}
                    >
                      Alterar
                    </Form.Button>
                  )}
                </FormularioAluno>
              </Segment.Group>
            </>
          ) : (
            <>
              <Dimmer active>
                <Loader size="big">Carregando informações</Loader>
              </Dimmer>
            </>
          )}
        </SegmentArea>
      </FloatedGroup>
    </>
  );
}
export default FormAluno;
