import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Page } from "./styles";
import Home from "./pages/home"

function App() {
  return (
    <div className="App">
      <Page>
        <Router>
          <Route exact path="/" component={Home} />
        </Router>
      </Page>
    </div>
  );
}

export default App;
