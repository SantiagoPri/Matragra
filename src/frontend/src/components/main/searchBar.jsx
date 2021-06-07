import { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import {
    SearchBarButton,
    SearchBarForm,
    SearchBarInput,
    SearchBarContainer,
  } from "./styled";

function SearchBar() {
    const [input, setInput] = useState("");
    const inputFocus = useRef();
  
    const onFormSubmit = (e) => {
      // When form submited, clear input, close the searchbar and do something with input
      e.preventDefault();
      setInput("");
      // After form submit, do what you want with the input value
      console.log(`Form was submited with input: ${input}`);
    };
  
    return (
      <SearchBarContainer>
        <SearchBarForm>
          <SearchBarButton type="submit">
            {" "}
            <FaSearch />
          </SearchBarButton>
          <SearchBarInput
            onChange={(e) => setInput(e.target.value)}
            ref={inputFocus}
            value={input}
            placeholder="Busca un proyecto"
          />
        </SearchBarForm>
      </SearchBarContainer>
    );
  }
  
  export default SearchBar;