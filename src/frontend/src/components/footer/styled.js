import styled from "styled-components";

export const Container = styled.div`
  padding: 60px 60px;
  background: #000;
  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 20px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const Link = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;
  &:hover {
    color: #6666ff;
    transition: 200ms ease-in;
  }
`;

export const Text = styled.p`
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;
`;

export const Title = styled.p`
  font-size: 24px;
  color: #6666cc;
  margin-bottom: 40px;
  font-weight: bold;
`;

export const Icon = styled.i`
  font-size: 18px;
  margin-right: 16px;
`;
