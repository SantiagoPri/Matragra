import { useState, useContext } from "react";
import { ApiContext } from "./../../contexts/ApiContext";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { login } from "../../helpers/api/backend-api";

const useIngresar = () => {
  const { setIsLogged, setJwt } = useContext(ApiContext);
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { data, refetch, isLoading } = useQuery(
    ["logIn", values.userName, values.password],
    logIn,
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (data) => {
        if (data.status === "error") {
          setErrors({ userName: data.message, password: data.message });
        }
        if (data.status === "ok") {
          localStorage.setItem("jwt", data.message);
          setIsLogged(true);
          setJwt(data.message);
          historyHook.push("/main");
        }
      },
    }
  );
  const historyHook = useHistory();

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

  return { handleChange, handleSubmit, values, errors, isLoading };
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
  return result.data;
}
