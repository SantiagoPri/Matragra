import { useState } from "react";
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

const Navbar = () => {
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
        <NavMenu>
          <NavLink to="/documentacion">Documentación</NavLink>
          <NavLink to="/registrarme">Registrarme</NavLink>
          <NavBtnLink to="/ingresar">Ingresar</NavBtnLink>
        </NavMenu>
      </Nav>
    </StickyDiv>
  );
};

export default Navbar;
