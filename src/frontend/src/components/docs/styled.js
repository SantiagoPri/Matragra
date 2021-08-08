import styled from "styled-components";

export const Container = styled.div`
  background-color: white;
  text-align: justify;
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;

  h3,
  p,
  h2,
  h1,
  li {
    color: black !important;
  }

  h5  {
    text-align: center;
    color: black !important;
  }
  img {
    margin-left: 100;
    margin-right: 0;
  }

  @media (max-width: 767px) {
    padding: 15px;
  }
`;
