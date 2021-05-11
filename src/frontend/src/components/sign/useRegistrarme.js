import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { createUser } from "../../helpers/api/backend-api";

const useRegistrarme = () => {
  const [values, setValues] = useState({
    userName: "",
    roleName: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const historyHook = useHistory();
  const { mutate } = useMutation(register, {
    onSuccess: (data) => {
      if (data.status === "error") {
        setErrors({ userName: data.message });
      }
      if (data.status === "ok") {
        historyHook.push("/ingresar");
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isThereError, errors } = validatePreQuery(values);
    if (isThereError) {
      setErrors(errors);
      return;
    }
    mutate(values);
  };

  return { handleChange, handleSubmit, values, errors };
};

export default useRegistrarme;

function validatePreQuery(values) {
  let errors = {};
  let isThereError = false;

  if (!values.userName.trim()) {
    errors.userName = "Nombre de usuario requerido";
    isThereError = true;
  }
  if (!values.roleName) {
    errors.roleName = "Tipo de usuario es requerido";
  }

  if (!values.email) {
    errors.email = "Email es requerido";
    isThereError = true;
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email es invalido";
    isThereError = true;
  }
  if (!values.password) {
    errors.password = "Contraseña es requerida";
    isThereError = true;
  } else if (values.password.length < 6) {
    errors.password = "Contraseña debe tener 6 caracteres o más";
    isThereError = true;
  }

  if (!values.password2) {
    errors.password2 = "Contraseña es requerida";
    isThereError = true;
  } else if (values.password2 !== values.password) {
    errors.password2 = "Contraseñas deben ser iguales";
    isThereError = true;
  }
  return { isThereError, errors };
}

async function register(query) {
  await createUser();
  const result = await createUser(query);
  return result.data;
}
