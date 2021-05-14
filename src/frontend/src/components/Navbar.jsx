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
import MobileMenu from "./MobileMenu/MobileMenu";
import { ApiContext } from "./../contexts/ApiContext";

const Navbar = () => {
  const { isLogged } = useContext(ApiContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StickyDiv>
      <Nav>
        <NavLink to="/">
          <img
            src={`${process.env.PUBLIC_URL}/img/logo40x200.png`}
            alt="logo"
          />
        </NavLink>
        <MobileMenu isOpen={isOpen} toggle={toggle} />
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
  const { setIsLogged } = useContext(ApiContext);
  const signOut = () => {
    localStorage.removeItem("jwt");
    setIsLogged(false);
  };
  return (
    <NavMenu>
      <NavLink to="/documentacion">Documentación</NavLink>

      
      <NavBtnLink to="/" onClick={signOut}>
        Cerrar Sesión
      </NavBtnLink>
    </NavMenu>
  );
};
