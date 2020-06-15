import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PageCursos from "./pages/home/pageCursos"
import PageAlunos from "./pages/pageAlunos/pageAlunos"
import CadastrarAluno from "./pages/cadastrarAluno/cadastrarAluno"

function App() {
  return (
    <div className="App">
        <Router>
          <Route exact path="/" component={PageCursos} />
          <Route exact path="/Alunos" component={PageAlunos}/>
          <Route exact path="/CadastrarAluno" component={CadastrarAluno}/>
        </Router>
    </div>
  );
}

export default App;
