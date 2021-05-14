import { Container, Form, H3, Button, Input, Label, P, Span } from "./styled";
import useIngresar from "./useIngresar";

const Ingresar = () => {
  const {
    handleChange,
    values,
    errors,
    handleSubmit,
    isLoading,
  } = useIngresar();

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
            name="userName"
            value={values.userName}
            onChange={handleChange}
          />
        </div>
        {errors.userName && <P>{errors.userName}</P>}

        <div className="form-group">
          <Label>Contraseña</Label>
          <Input
            type="password"
            className="form-control"
            placeholder="Ingrese contraseña"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        {errors.password && <P>{errors.password}</P>}

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
          {isLoading && <Span className="spinner-border spinner-border-sm" />}
        </Button>
        <p className="forgot-password text-right">
          ¿Olvidó <a href="/">contraseña?</a>
        </p>
      </Form>
    </Container>
  );
};

export default Ingresar;
