import styled from "styled-components";

export const Container = styled.div`
  text-align: justify;
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;

  .img {
    margin-left: 100;
    margin-right: 0;
    width: 50%;
  }

  @media (max-width: 767px) {
    padding: 15px;
  }
`;
