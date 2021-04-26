import { useState } from "react";
import { useQuery } from "react-query";
import { Container, Form, H3, Button, Input, Label } from "./styled";
import { login } from "../../helpers/backend-api";

const Ingresar = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { data, refetch } = useQuery(["logIn", userName, password], logIn, {
    refetchOnWindowFocus: false,
    enabled: false,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("userName: ", userName);
    console.log("password: ", password);
    refetch();
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <H3>Ingresar</H3>

        <div className="form-group">
          <Label>Nombre de usuario</Label>
          <Input
            type="text"
            className="form-control"
            placeholder="Ingrese usuario"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <Label>Contraseña</Label>
          <Input
            type="password"
            className="form-control"
            placeholder="Ingrese contraseña"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <Input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <Label className="custom-control-label" htmlFor="customCheck1">
              Recordarme
            </Label>
          </div>
        </div>

        <Button type="submit" className="btn btn-primary btn-block">
          Ingresar
        </Button>
        <p className="forgot-password text-right">
          ¿Olvidó <a href="#">contraseña?</a>
        </p>
      </Form>
    </Container>
  );
};

export default Ingresar;

async function logIn(query) {
  const [key, userName, password] = query.queryKey;
  const result = await login({ userName, password });
  console.log("Resultado: ", result);
}
