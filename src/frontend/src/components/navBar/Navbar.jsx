import { useState, useContext } from "react";
import {
  MobileIcon,
  Nav,
  NavBtnLink,
  NavLink,
  NavMenu,
  StickyDiv,
} from "./styled";
import { FaBars } from "react-icons/fa";
import { MobileMenu2, MobileMenu } from "./MobileMenu/MobileMenu";
import { ApiContext } from "../../contexts/ApiContext";
import { ProjectContext } from "../../contexts/ProjectContext";
import { FaArrowLeft } from "react-icons/fa";

const Navbar = () => {
  const { isLogged } = useContext(ApiContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StickyDiv>
      <Nav>
        <div className="row">
          {/* <NavLink className="text-center icono-modal ml-3" to="/">
            <FaArrowLeft></FaArrowLeft>
          </NavLink> */}
          <NavLink to="/">
            <img
              src={`${process.env.PUBLIC_URL}/img/logo40x200.png`}
              alt="logo"
            />
          </NavLink>
        </div>
        {isLogged ? (
          <MobileMenu2 isOpen={isOpen} toggle={toggle} />
        ) : (
          <MobileMenu isOpen={isOpen} toggle={toggle} />
        )}
        <MobileIcon onClick={toggle}>
          <FaBars />
        </MobileIcon>
        {isLogged ? <MainNavMenu /> : <SignNavMenu />}
      </Nav>
    </StickyDiv>
  );
};

export default Navbar;

const SignNavMenu = () => {
  return (
    <NavMenu>
      <NavLink to="/documentacion">Documentación</NavLink>
      <NavLink to="/registrarme">Registrarme</NavLink>
      <NavBtnLink to="/ingresar">Ingresar</NavBtnLink>
    </NavMenu>
  );
};

const MainNavMenu = () => {
  const { setIsLogged, setJwt } = useContext(ApiContext);
  const { name: projectName } = useContext(ProjectContext);
  const signOut = () => {
    localStorage.removeItem("jwt");
    setIsLogged(false);
    setJwt("");
  };
  return (
    <NavMenu>
      <NavLink to="/documentacion">Documentación</NavLink>
      <NavLink to="/main">Proyectos</NavLink>
      {projectName ? (
        <NavLink to={`/project/${projectName}`}>Proyecto actual</NavLink>
      ) : null}
      <NavBtnLink to="/" onClick={signOut}>
        Cerrar Sesión
      </NavBtnLink>
    </NavMenu>
  );
};
