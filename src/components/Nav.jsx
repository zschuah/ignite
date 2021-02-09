import styled from "styled-components";
import { motion } from "framer-motion";
import logo from "../img/logo.svg";

import { fetchSearch } from "../actions/gamesAction";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { fadeIn } from "../animations";

const Nav = ({ setSearchField }) => {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState("");

  const inputHandler = (e) => {
    setTextInput(e.target.value);
  };
  const submitSearch = (e) => {
    e.preventDefault();
    setSearchField(textInput);

    dispatch(fetchSearch(textInput));
    setTextInput("");
  };
  const clearSearched = () => {
    dispatch({ type: "CLEAR_SEARCHED" });
  };

  return (
    <StyledNav variants={fadeIn} initial="hidden" animate="show">
      <StyledLogo onClick={clearSearched}>
        <img src={logo} alt="logo.svg" />
        <h1>Ignite</h1>
      </StyledLogo>
      <form onSubmit={submitSearch} className="search">
        <input value={textInput} onChange={inputHandler} type="text" />
        <button type="submit">Search</button>
      </form>
    </StyledNav>
  );
};

const StyledNav = styled(motion.nav)`
  padding: 3rem 5rem;
  text-align: center;
  input {
    width: 30%;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: none;
    margin-top: 1rem;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    font-weight: bold;
  }
  button {
    font-size: 1.5rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: rgba(255, 127, 80, 0.8);
    &:hover {
      background: rgba(255, 127, 80, 1);
    }
    color: white;
  }
`;

const StyledLogo = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 1rem;
  cursor: pointer;
  img {
    height: 2rem;
    width: 2rem;
  }
  h1 {
    font-size: 2rem;
  }
  &:hover {
    text-shadow: 2px 2px 2px coral;
  }
`;

export default Nav;
