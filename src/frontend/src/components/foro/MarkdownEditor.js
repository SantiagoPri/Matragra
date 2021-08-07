import React, { useContext } from "react";
import { ApiContext } from "../../contexts/ApiContext";
import { ForumContext } from "../../contexts/ForoContext";
import { ProjectContext } from "../../contexts/ProjectContext";
import Editor from "rich-markdown-editor";

export const FixedEditor = ({ description }) => {
  return (
    <Editor className="container-editor" value={description} readOnly={true} />
  );
};

export const NewEditor = () => {
  const { apiCalls } = useContext(ApiContext);
  const { name } = useContext(ProjectContext);
  const { handleModalChange } = useContext(ForumContext);
  return (
    <Editor
      placeholder="Escriba su entrada"
      className="container-editor"
      onChange={(value) => {
        handleModalChange({
          target: { value: value(), name: "description" },
        });
      }}
      uploadImage={async (file) => {
        const fileUrl = await apiCalls.saveFile(file, name);
        return fileUrl.url;
      }}
    />
  );
};
