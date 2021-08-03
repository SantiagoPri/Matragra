import { createContext, useState, useContext } from "react";
import { ApiContext } from "./ApiContext";
import { useMutation } from "react-query";
import { queryClient } from "../App";

export const ForumContext = createContext();

const ForumContextProvider = (props) => {
  const { apiCalls } = useContext(ApiContext);

  const [topics, setTopics] = useState([]);

  const [newForo, setNewForo] = useState({});
  const [currentForo, setCurrentForo] = useState({});
  const [currentForoName, setCurrentForoName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    if (name === "pahse") {

    }
    setNewForo({
      ...newForo,
      [name]: value,
    });
  };

  const startForum = (projectName) => {
    setNewForo({
      ...newForo,
      projectName,
      description: "",
      files: [],
    });
    setIsCreating(true);
  };

  const { mutate: createForum } = useMutation(apiCalls.createForum, {
    onSuccess: async (data, variables) => {
      const { forum } = variables;
      setCurrentForoName(forum.foroName);
      setIsCreating(false);
      await queryClient.refetchQueries(["getForum"], {
        active: true,
      });
    },
  });

  const { mutate: createAnswer } = useMutation(apiCalls.newAnswer, {
    onSuccess: async (data, variables) => {
      const { currentForoName } = variables;
      setCurrentForoName(currentForoName);
      setIsCreating(false);
      await queryClient.refetchQueries(["getForum"], {
        active: true,
      });
    },
  });

  return (
    <ForumContext.Provider
      value={{
        currentForoName,
        setCurrentForoName,
        topics,
        setTopics,
        handleModalChange,
        newForo,
        currentForo,
        setCurrentForo,
        startForum,
        createForum,
        isCreating,
        setIsCreating,
        answers,
        setAnswers,
        createAnswer,
      }}
    >
      {props.children}
    </ForumContext.Provider>
  );
};

export default ForumContextProvider;
