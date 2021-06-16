import styled from "styled-components";

export const Container = styled.div`
  min-height: 600px;
  display: flex;
  align-items: center;
  background: #282c34;
`;

export const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;
`;

export const Loader = styled.div`
  /* background: #6699ff; */
  /* background: #6666ff; */
  /* background: #6666cc; */
  width: calc(100% - 0px);
  height: calc(100% - 0px);
  border: 10px solid #162534;
  border-top: 10px solid #6699ff;
  border-radius: 60%;
  animation: rotate 5s linear infinite;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;
