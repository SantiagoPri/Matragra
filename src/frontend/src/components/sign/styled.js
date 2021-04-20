import styled from "styled-components";

export const Container = styled.form`
  background: #1a1a1a;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  display: flex;
  font-weight: 400;
  font-family: "Fira Sans", sans-serif;
  box-sizing: border-box;
  text-align: left;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 2px red;
    border-color: #167bff;
  }
`;

export const H3 = styled.h3`
  font-size: 24px;
  font-weight: 500;
  font-family: "Fira Sans", sans-serif;
  box-sizing: border-box;
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
`;

export const Form = styled.form`
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
  box-sizing: border-box;
`;

export const Label = styled.label`
  font-weight: 500;
  font-family: "Fira Sans", sans-serif;
  box-sizing: border-box;
`;

export const Input = styled.input`
  cursor: pointer;
  margin-bottom: 0;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0px;
  outline: none;
  font-size: 14px;
  padding: 6px 8px;
  border-width: 1px;
  border-style: solid;
  border-color: 'black';
  margin: 0;
`

export const Button = styled.button`
border-radius: 4px;
/* background: #6699ff; */
background: #6666ff;
/* background: #6666cc; */
padding: 10px 142px;
color: #fff;
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

export const Select = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
    font-family: "Fira Sans", sans-serif;
  }
`

//   .forgot-password,
//   .forgot-password a {
//     text-align: right;
//     font-size: 13px;
//     padding-top: 10px;
//     color: #7f7d7d;
//     margin: 0;
//   }

//   .forgot-password a {
//     color: #167bff;
//   }
