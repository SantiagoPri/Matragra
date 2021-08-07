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
    console.log(name, ": ", value);
    if (name === "files") {
      newForo.files.push(value);
      // const updateForo ={newForo}
      // setNewForo((prevState) => {
      //   prevState.files.push(value);
      //   return prevState;
      // });
    } else {
      setNewForo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    console.log("newForo:", JSON.stringify(newForo));
    if (newForo.files) {
      console.log(newForo.files);
    }
  };

  const startForum = (projectName) => {
    setNewForo({
      ...newForo,
      projectName,
      description: "",
      files: [],
    });
    setIsCreating(false);
    setIsCreating(true);
  };

  const { mutate: createForum } = useMutation(apiCalls.createForum, {
    onSuccess: async (data, variables) => {
      if (data === "nothing to do here") {
        return;
      }
      const { foroName } = variables;
      setCurrentForoName(foroName);
      setIsCreating(false);
      await queryClient.refetchQueries(["getForumList"], {
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
