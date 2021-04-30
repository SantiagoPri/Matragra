import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { login } from "../../helpers/backend-api";

const useIngresar = () => {
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { data, refetch } = useQuery(
    ["logIn", values.userName, values.password],
    logIn,
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isThereError, errors1 } = validatePreQuery(values);
    if (isThereError) {
      setErrors(errors1);
      return;
    }
    refetch();
  };

  useEffect(() => {
    if (data) {
      if (data.status === "error") {
        setErrors({ userName: data.message, password: data.message });
      }
      if (data.status === "ok") {
        console.log(data.message);
        localStorage.setItem("jwt", data.message);
      }
    }
  }, [data]);

  return { handleChange, handleSubmit, values, errors };
};

export default useIngresar;

function validatePreQuery(values) {
  let errors1 = {};
  let isThereError = false;

  if (!values.userName.trim()) {
    errors1.userName = "Nombre de usuario es un campo requerido";
    isThereError = true;
  }

  if (!values.password) {
    errors1.password = "Contraseña es un campo requerido";
    isThereError = true;
  }

  return { isThereError, errors1 };
}

async function logIn(query) {
  const [key, userName, password] = query.queryKey;
  const result = await login({ userName, password });
  console.log("Resultado: ", result);
  return result.data;
}
