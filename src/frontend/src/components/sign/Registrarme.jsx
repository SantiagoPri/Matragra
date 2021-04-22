import { Container, H3, Form, Label, Input, Button, Select } from "./styled";

const Registrarme = () => {
  return (
    <Container>
      <Form>
        <H3>Registrarme</H3>

        <div className="form-group">
          <Label>Nombre de usuario</Label>
          <Input
            type="text"
            className="form-control"
            placeholder="nombre de usuario"
          />
        </div>

        <div className="form-group">
          <Label>Tipo de usuario</Label>
          <Select className="form-control">
            <option className="form-control" value="" hidden>
              Tipo de usuario
            </option>
            <option className="form-control" value="1">estudiante</option>
            <option className="form-control" value="2">profesor</option>
          </Select>
        </div>

        <div className="form-group">
          <Label>Email</Label>
          <Input type="email" className="form-control" placeholder="email" />
        </div>

        <div className="form-group">
          <Label>Contraseña</Label>
          <Input
            type="password"
            className="form-control"
            placeholder="contraseña"
          />
        </div>

        <div className="form-group">
          <Label>Confirmar contraseña</Label>
          <Input
            type="password"
            className="form-control"
            placeholder="confirmar contraseña"
          />
        </div>

        <Button type="submit">Registrarme</Button>
        <p className="forgot-password text-right">
          Ya tiene una cuenta? <a href="#">Ingresar</a>
        </p>
      </Form>
    </Container>
  );
};

export default Registrarme;
