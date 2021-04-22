import { Container, Form, H3, Button, Input, Label } from "./styled";

const Ingresar = () => {
  return (
    <Container>
      <Form>
        {/* <form > */}
          <H3>Ingresar</H3>

          <div className="form-group">
            <Label>Nombre de usuario</Label>
            <Input
              type="email"
              className="form-control"
              placeholder="Ingrese usuario"
            />
          </div>

          <div className="form-group">
            <Label>Contraseña</Label>
            <Input
              type="password"
              className="form-control"
              placeholder="Ingrese contraseña"
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
        {/* </form> */}
      </Form>
    </Container>
  );
};

export default Ingresar;
