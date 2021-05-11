import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import matragraDocPath from "./../../helpers/docs/matragra.md";
import { Container } from "./styled";
import "github-markdown-css";

const MatragraDoc = () => {
  const [mdfile, setMdfile] = useState("");
  useEffect(() => {
    if (!mdfile) {
      fetch(matragraDocPath)
        .then((response) => response.text())
        .then((text) => {
          setMdfile(text);
        });
    }
  }, [mdfile]);
  return (
    <Container className="markdown-body">
      <ReactMarkdown remarkPlugins={[gfm]} children={mdfile} />
    </Container>
  );
};

export default MatragraDoc;
