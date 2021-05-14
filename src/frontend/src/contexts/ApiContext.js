import { createContext, useState } from "react";

export const ApiContext = createContext();

const ApiContextProvider = (props) => {
  const [isLogged, setIsLogged] = useState(false);

  
  return (
    <ApiContext.Provider value={{ isLogged, setIsLogged }}>
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
