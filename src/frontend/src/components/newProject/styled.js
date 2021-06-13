import styled from "styled-components";

export const Modal = styled.div`
  background-color: rgba(100, 100, 100, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
  max-width: 100%;
  border-radius: 1.3rem;
`;

export const Lista = styled.ul`
  max-height: 120px;
  overflow-y: scroll;
`;
export const Boton = styled.button`
  background-color: #4a4f56;
  color: #ffffff;
  &:hover {
    background: #000000;
    color: #ffffff
  }
`;
