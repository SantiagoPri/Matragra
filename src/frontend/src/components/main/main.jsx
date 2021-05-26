import { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import {
  ProyectContainer,
  ProyectWrapper,
  ProyectsCard,
  ProyectsH1,
  ProyectsH2,
  ProyectsIcon,
  ProyectsP,
  SearchBarButton,
  SearchBarForm,
  SearchBarInput,
  SearchBarContainer,
  Details,
  Summary,
  HR,
} from "./styled";

const Main = () => {
  return (
    <ProyectContainer id="services">
      <ProyectsH1>PROYECTOS</ProyectsH1>
      <SearchBar />
      <Collapse Title="Mis proyectos">
        <ProyectWrapper>
          <ProyectsCard>
            <ProyectsIcon src={"./img/6nuevoproyecto_192x192.png"} />
            <ProyectsH2>Nuevo Proyecto</ProyectsH2>
          </ProyectsCard>
          <ProyectsCard></ProyectsCard>
          <ProyectsCard></ProyectsCard>
        </ProyectWrapper>
      </Collapse>
      <Collapse Title="Todos Los Proyectos">
        <ProyectWrapper>
          <ProyectsCard>
            <ProyectsIcon src={"./img/6nuevoproyecto_192x192.png"} />
            <ProyectsH2>Nuevo Proyecto</ProyectsH2>
          </ProyectsCard>
          <ProyectsCard></ProyectsCard>
          <ProyectsCard></ProyectsCard>
        </ProyectWrapper>
      </Collapse>
    </ProyectContainer>
  );
};

export default Main;

function SearchBar() {
  const [input, setInput] = useState("");
  const inputFocus = useRef();

  const onFormSubmit = (e) => {
    // When form submited, clear input, close the searchbar and do something with input
    e.preventDefault();
    setInput("");
    // After form submit, do what you want with the input value
    console.log(`Form was submited with input: ${input}`);
  };

  return (
    <SearchBarContainer>
      <SearchBarForm>
        <SearchBarButton type="submit">
          {" "}
          <FaSearch />
        </SearchBarButton>
        <SearchBarInput
          onChange={(e) => setInput(e.target.value)}
          ref={inputFocus}
          value={input}
          placeholder="Busca un proyecto"
        />
      </SearchBarForm>
    </SearchBarContainer>
  );
}

const Collapse = (props) => {
  const { Title, children } = props;
  return (
    <Details open={true}>
      <Summary>
        {Title}
        <HR />
      </Summary>
      {children}
    </Details>
  );
};
