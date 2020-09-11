import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

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
import Axios from "axios";

function FormAluno() {
  const history = useHistory();
  
  const [cadastro, setCadastro] = useState(true);
  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [email, setEmail] = useState();
  const [cep, setCep] = useState();
  const [telefone, setTelefone] = useState();
  const [endereco, setEndereco] = useState();
  const [objAluno, setObjAluno] = useState();
  const [cursoId, setCursoId] = useState();

  const [carregando, setCarregando] = useState(false);
  const [msg, setMsg] = useState(false);
  const [msgText, setMsgText] = useState("");

  const {id} = useParams();
  var currentRoute = useLocation().pathname;

  useEffect(() => {
    setCarregando(true)
    currentRoute = currentRoute.split('/')
    if (currentRoute[1] === 'AlterarAluno') {
      setCadastro(false);
      Axios.get('http://localhost:3333/alunos?aluno_id='+id).then(response=>{
        var data = response.data[0]
        setNome(data.nome)
        setCpf(data.cpf)
        setEmail(data.email)
        setCep(data.cep)
        setTelefone(data.telefone)
        setEndereco(data.endereco)
        setCursoId(data.curso_id)
        setObjAluno(data)
      })
    }
    setCarregando(false)
    return () => {};
  }, []);

  function btnCadastro() {
    setCarregando(true);

    var aluno = {
      nome,
      cep: mCEP(cep),
      cpf: mCPF(cpf),
      email,
      telefone: mTel(telefone),
      endereco,
      curso_id: id
    };
    
    Axios.post('http://localhost:3333/alunos',aluno).then(sucesso=>{
      setCarregando(false);
      history.push('/Cursos/'+id)
    }).catch(error=>{
      console.log(error);
      setCarregando(false);

    })
  }

  function update() {
    setCarregando(true);
    var aluno = {
      nome,
      curso_id: objAluno.curso_id,
      cpf: mCPF(cpf),
      email,
      cep: mCEP(cep),
      telefone: mTel(telefone),
      endereco,
    }
    Axios.put("http://localhost:3333/alunos/"+id,aluno).then(response=>{
      setCarregando(false)
      history.push('/Cursos/'+aluno.curso_id)
      console.log(response);
    }).catch(error=>{
      setCarregando(false)
      console.log(error);
    })
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
      setMsgText("Preencha os campos e tente novamente.");
    } else {
      if (cadastro) {
        btnCadastro();
      } else {
        if (
          nome === objAluno.nome &&
          cpf === objAluno.cpf &&
          cep === objAluno.cep &&
          endereco === objAluno.endereco &&
          email === objAluno.email &&
          telefone === objAluno.telefone
        ) {
          setMsg(true);
          setMsgText("Não houveram alterações neste aluno.");
        } else {
          update();
        }
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
                          <DropdownForm cursoId={cursoId} />
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
                      style={{ maxlength: "10" }}
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
                    header={msgText}
                    content="Verifique e tente novamente."
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
