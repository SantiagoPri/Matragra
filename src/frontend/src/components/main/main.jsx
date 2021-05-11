import {
  ServiceContainer,
  ServiceWrapper,
  ServicesCard,
  ServicesH1,
  ServicesH2,
  ServicesIcon,
  ServicesP,
} from "./styled";

const Main = () => {
  return (
    <ServiceContainer id="services">
      <ServicesH1>Proyectos</ServicesH1>
      <ServiceWrapper>
        <ServicesCard>
          <ServicesIcon src={"./img/logo_192x192.png"} />
          <ServicesH2>Proyectos1</ServicesH2>
          <ServicesP>Acá esta la primera prueba</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={"./img/logo_192x192.png"} />
          <ServicesH2>Proyectos2</ServicesH2>
          <ServicesP>Acá esta la primera prueba</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={"./img/logo_192x192.png"} />
          <ServicesH2>Proyectos3</ServicesH2>
          <ServicesP>Acá esta la primera prueba</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={"./img/logo_192x192.png"} />
          <ServicesH2>Proyectos4</ServicesH2>
          <ServicesP>Acá esta la primera prueba</ServicesP>
        </ServicesCard>
      </ServiceWrapper>
    </ServiceContainer>
  );
};

export default Main;
