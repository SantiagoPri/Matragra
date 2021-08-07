import styled from "styled-components";

export const Verde = styled.div`
  color: white;
  background-color: #7fc7c7;
  user-select: none;
  cursor: pointer;

  &:active {
    background-color: #5dc5c5;
  }
`;

export const Amarillo = styled.div`
  color: white;
  background-color: #f9db4a;
  user-select: none;
  cursor: pointer;

  &:active {
    background-color: #d7b928;
  }
`;

export const Rojo = styled.div`
  color: white;
  background-color: #d22d56;
  user-select: none;
  cursor: pointer;

  &:active {
    background-color: #b00b34;
  }
`;

export const Titulo = styled.h2`
  position: relative;
  top: 20px;
  color: white;
`;

export const Lista = styled.ul`
  list-style-position: outside;
  position: relative;
  top: 20px;
  overflow-wrap: break-word;
  word-wrap: break-word;

  text-align: left;
  & > li {
    color: white;
  }
`;

export const Text = styled.div`
  overflow-wrap: break-word;
  word-wrap: break-word;
  position: relative;
  top: 20px;
  color: white;
  text-align: justify;
  text-justify: inter-word;
`;

export const TextAdjust = styled.div`
  @media all and (max-width: 575px) {
    width: 90%;
  }
`;

export const IconoAdjust = styled.div`
  @media all and (max-width: 575px) {
    width: 10% !important;
    text-align: center;
  }
`;
