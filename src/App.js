import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/home/home"
import PageAlunos from "./pages/pageAlunos/pageAlunos"
import CadastrarAluno from "./pages/cadastrarAluno/cadastrarAluno"

function App() {
  return (
    <div className="App">
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/Alunos" component={PageAlunos}/>
          <Route exact path="/CadastrarAluno" component={CadastrarAluno}/>
        </Router>
    </div>
  );
}

export default App;
