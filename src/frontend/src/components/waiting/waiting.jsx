import { Container, Circle, Loader } from "./styled";

const Waiting = () => {
  return (
    <Container>
      <Circle>
        <Loader>
          <Loader>
            <Loader>
              <Loader>
                <Loader />
              </Loader>
            </Loader>
          </Loader>
        </Loader>
      </Circle>
    </Container>
  );
};

export default Waiting;
