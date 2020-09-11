import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PageCursos from "./pages/home/pageCursos"
import PageAlunos from "./pages/pageAlunos/pageAlunos"
import CadastrarAluno from "./pages/cadastrarAluno/cadastrarAluno"
import Menu from "./components/menu/menu"

function App() {
  return (
    <div className="App">
        <Router>
          <Menu />
          <Route exact path="/" component={PageCursos} />
          <Route path="/Cursos/:id" component={PageAlunos}/>
          <Route path="/CadastrarAluno/:id" component={CadastrarAluno}/>
          <Route path="/AlterarAluno/:id" component={CadastrarAluno}/>
        </Router>
    </div>
  );
}

export default App;
