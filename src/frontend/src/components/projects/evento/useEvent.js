import { useState } from "react";

const useEvent = () =>
{
    const [values, setValues] = useState({
        id: "",
        asunto: "",
        description: "",
        link: "",
        date: "",
        time: "",
        duration: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) =>
    {
        console.log(e.target);
        console.log(e.target.name, e.target.value);
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        validateErrors();
    };


    const validateErrors = () =>
    {
        const { errors } = validatePreQuery(values);
        setErrors(errors);
    }

    return { handleChange, handleSubmit, values, errors, validateErrors };
};

export default useEvent;




const validatePreQuery = (values) =>
{
  let errors = {};

  if (!values.asunto.trim())
  {
    errors.asunto = "El asunto es requerido.";
  }
  if (!values.date)
  {
    errors.date = "La fecha es requerida.";
  }
  return { errors };
}