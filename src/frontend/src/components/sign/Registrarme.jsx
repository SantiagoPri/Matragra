import {
  Container,
  H3,
  Form,
  Label,
  Input,
  Button,
  Select,
  P,
  Span,
} from "./styled";
import useRegistrarme from "./useRegistrarme";

const Registrarme = () => {
  const { handleChange, handleSubmit, values, errors, isLoading } =
    useRegistrarme();
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <H3>Registrarme</H3>

        <div className="form-group">
          <Label>Nombre de usuario</Label>
          <Input
            type="text"
            className="form-control"
            placeholder="nombre de usuario"
            name="userName"
            value={values.userName}
            onChange={handleChange}
          />
        </div>
        {errors.userName && <P>{errors.userName}</P>}

        <div className="form-group">
          <Label>Tipo de usuario</Label>
          <Select
            className="form-control"
            name="roleName"
            value={values.roleName}
            onChange={handleChange}
          >
            <option className="form-control" value="" hidden>
              Tipo de usuario
            </option>
            <option className="form-control" value="estudiante">
              Estudiante
            </option>
            <option className="form-control" value="director">
              Director
            </option>
          </Select>
        </div>
        {errors.roleName && <P>{errors.roleName}</P>}

        <div className="form-group">
          <Label>Email</Label>
          <Input
            type="text"
            className="form-control"
            placeholder="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && <P>{errors.email}</P>}

        <div className="form-group">
          <Label>Contraseña</Label>
          <Input
            type="password"
            className="form-control"
            placeholder="contraseña"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        {errors.password && <P>{errors.password}</P>}

        <div className="form-group">
          <Label>Confirmar contraseña</Label>
          <Input
            type="password"
            className="form-control"
            placeholder="confirmar contraseña"
            name="password2"
            value={values.password2}
            onChange={handleChange}
          />
        </div>
        {errors.password2 && <P>{errors.password2}</P>}

        <Button type="submit" className="btn btn-primary btn-block">
          Registrarme
          {isLoading && <Span className="spinner-border spinner-border-sm" />}
        </Button>
        <p className="forgot-password text-right">
          Ya tiene una cuenta? <a href="/ingresar">Ingresar</a>
        </p>
      </Form>
    </Container>
  );
};

export default Registrarme;
