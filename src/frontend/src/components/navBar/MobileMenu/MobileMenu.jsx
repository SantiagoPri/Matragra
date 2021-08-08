import { useContext } from "react";
import { ApiContext } from "../../../contexts/ApiContext";
import { ProjectContext } from "../../../contexts/ProjectContext";
import {
  CloseIcon,
  Icon,
  MenuContainer,
  MenuBtnLink,
  MenuLink,
  MenuWrapper,
  Menu,
  MenuBtnWrapper,
} from "./styled";
export const MobileMenu = ({ isOpen, toggle }) => {
  return (
    <MenuContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <MenuWrapper>
        <Menu>
          <MenuLink to="/">Inicio</MenuLink>
          <MenuLink to="/documentacion">Documentación</MenuLink>
          <MenuLink to="/registrarme">Registrarme</MenuLink>
        </Menu>
        <MenuBtnWrapper>
          <MenuBtnLink to="/ingresar">Ingresar</MenuBtnLink>
        </MenuBtnWrapper>
      </MenuWrapper>
    </MenuContainer>
  );
};

export const MobileMenu2 = ({ isOpen, toggle }) => {
  const { setIsLogged, setJwt } = useContext(ApiContext);
  const { name: projectName } = useContext(ProjectContext);
  const signOut = () => {
    localStorage.removeItem("jwt");
    setIsLogged(false);
    setJwt("");
  };
  return (
    <MenuContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <MenuWrapper>
        <Menu>
          <MenuLink to="/documentacion">Documentación</MenuLink>
          <MenuLink to="/main">Proyectos</MenuLink>
          {projectName ? (
            <MenuLink to={`/project/${projectName}`}>Proyecto actual</MenuLink>
          ) : null}
        </Menu>
        <MenuBtnWrapper>
          <MenuBtnWrapper>
            <MenuBtnLink to="/" onClick={signOut}>
              Cerrar Sesión
            </MenuBtnLink>
          </MenuBtnWrapper>
        </MenuBtnWrapper>
      </MenuWrapper>
    </MenuContainer>
  );
};
