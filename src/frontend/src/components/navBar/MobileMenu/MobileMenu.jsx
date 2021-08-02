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
const MobileMenu = ({ isOpen, toggle }) => {
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

export default MobileMenu;
