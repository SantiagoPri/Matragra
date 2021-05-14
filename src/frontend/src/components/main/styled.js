import styled from "styled-components";

export const ProyectContainer = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #282c34;

  @media screen and (max-width: 768px) {
    height: 1180px;
  }

  @media screen and (max-width: 480px) {
    height: 1380px;
  }
`;

export const ProyectWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 40px;
  padding: 0 50px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

export const ProyectsCard = styled.div`
  background: #3b3b3c;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 6px solid #4c4c4d;
  border-radius: 10px;
  max-height: 240px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0, 2);
  transition: all 0.2s ease-in-out;

  &:hover {
    border: 6px solid #fff;
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export const ProyectsIcon = styled.img`
  height: 130px;
  width: 130px;
  margin-bottom: 10px;
`;

export const ProyectsH1 = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-top: 10px;
  font-family: "Fira Sans", sans-serif;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const ProyectsH2 = styled.h2`
  font-size: 1rem;
  color: #fff;
  margin-bottom: 10px;
  font-family: "Fira Sans", sans-serif;
`;

export const ProyectsP = styled.p`
  font-size: 1rem;
  color: #fff;
  text-align: center;
  font-family: "Fira Sans", sans-serif;
`;

// #################### SEARCH BAR ###################
export const SearchBarContainer = styled.div`
  font-family: sans-serif;
  display: flex;
  margin-bottom: 64px;
`;

export const SearchBarForm = styled.form`
  display: flex;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #37474f;
  width: 30rem;
  cursor: "auto";
  padding: 2rem;
  height: 2rem;
  border-radius: 3rem;
`;

export const SearchBarInput = styled.input`
  font-size: 14px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  margin-left: 1rem;
  border: none;
  color: white;

  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: white;
  }
`;

export const SearchBarButton = styled.button`
  align-items: center;
  line-height: 1;
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
`;
