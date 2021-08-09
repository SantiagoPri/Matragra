import { useState, useContext } from "react";
import { ProjectContext } from "../../../contexts/ProjectContext";
import { useMutation } from "react-query";
import { ApiContext } from "../../../contexts/ApiContext";
import { queryClient } from "../../../App";

const useEvent = () => {
  const { name, setEventIsOpened } = useContext(ProjectContext);
  const { apiCalls } = useContext(ApiContext);

  const { mutate: createEvent, isLoading } = useMutation(apiCalls.createEvent, {
    onSuccess: async () => {
      await queryClient.refetchQueries(["getEvents"], {
        active: true,
      });
      setEventIsOpened(false);
    },
  });

  const [values, setValues] = useState({
    asunto: "",
    description: "",
    link: "",
    date: "",
    time: "",
    duration: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateErrors();
    if (Object.entries(errors).length) {
      return;
    }
    createEvent({ event: formatEvent(values, name) });
  };

  const validateErrors = () => {
    const { errors } = validatePreQuery(values);
    setErrors(errors);
  };

  return { handleChange, handleSubmit, values, errors, validateErrors, isLoading };
};

export default useEvent;

function validatePreQuery(values) {
  let errors = {};

  if (!values.asunto.trim()) {
    errors.asunto = "El asunto es requerido.";
  }
  if (!values.date) {
    errors.date = "La fecha es requerida.";
  }
  return { errors };
}

function formatEvent(values, projectName) {
  const dateParts = values.date.split("-");
  const date = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  return {
    projectName,
    eventName: values.asunto,
    subject: values.asunto,
    date,
    time: values.time,
    duration: values.duration,
    detail: {
      link: values.link,
      description: values.description,
    },
  };
}
