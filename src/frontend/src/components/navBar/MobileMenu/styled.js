import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";

export const MenuContainer = styled.aside`
  position: fixed;
  z-index: 998;
  width: 100%;
  height: 100%;
  background: #000;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
`;

export const CloseIcon = styled(FaTimes)`
  color: #fff;
`;

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;

export const MenuWrapper = styled.div`
  color: #fff;
`;

export const Menu = styled.ul`
  display: grid;
  grid-template-rows: repeat(6, 60px);

  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(6, 60px);
  }
`;

export const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #fff;
  cursor: pointer;

  &::hover {
    color: #01bf71;
    transition: 0.2s ease-in-out;
  }
`;

export const MenuBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const MenuBtnLink = styled(Link)`
  border-radius: 50px;
  /* background: #6699ff; */
  background: #6666ff;
  /* background: #6666cc; */
  white-space: nowrap;
  padding: 16px 64px;
  color: #010606;
  font-size: 16px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #6666cc;
    color: #010606;
  }
`;
