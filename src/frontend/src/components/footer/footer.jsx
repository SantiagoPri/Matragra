import React from "react";
import { Container, Text, Link } from "./styled";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <Container>
      <footer className="footer">
        <Link href="https://github.com/SantiagoPri/Matragra/" target="_blank">
          <AiFillGithub />
        </Link>
        <p>
          {" "}
          <Link href="http://www.fuac.edu.co/" target="_blank">
            &copy; {new Date().getFullYear()} Copyright: fuac.edu.co{" "}
          </Link>
        </p>
        <p>
          <Text>
            {"Creditos: "}
            <Link
              href="https://www.linkedin.com/in/s-prieto/"
              target="_blank"
            >
              Santiago Prieto
            </Link>
            {" & "}
            <Link
              href="https://www.linkedin.com/in/jpmosquerac/"
              target="_blank"
            >
              Juan Pablo Mosquera
            </Link>
            {" | Asesor: Gustavo Rivera"}
          </Text>
        </p>
      </footer>
    </Container>
  );
};
export default Footer;
