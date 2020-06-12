import React from "react";

import { Header, Icon } from "semantic-ui-react";
import {Redirect} from "./styles"

function Menu() {
  return (
    <Header textAlign="center" as="h1" attached="top">
      <Redirect to="/">
        <Icon name="user" />
        Gerenciamento de alunos
      </Redirect>
    </Header>
  );
}
export default Menu;
