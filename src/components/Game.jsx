import styled from "styled-components";
import { motion } from "framer-motion";

import { useDispatch } from "react-redux";
import { loadDetail } from "../actions/detailAction";

import { Link, useHistory } from "react-router-dom";

import { popup } from "../animations";

const Game = ({ name, released, image, id }) => {
  //Fix scrolling
  const history = useHistory();
  if (history.location.pathname === "/") {
    document.body.style.overflow = "auto";
  } else {
    document.body.style.overflow = "hidden";
  }

  const stringPathId = id.toString();

  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    //Dispatch a created Action
    dispatch(loadDetail(id));
  };

  return (
    <StyledGame
      variants={popup}
      initial="hidden"
      animate="show"
      layoutId={stringPathId}
      onClick={loadDetailHandler}
    >
      <Link to={`/game/${id}`}>
        <motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
        <p>{released}</p>
        <motion.img layoutId={`image ${stringPathId}`} src={image} alt={name} />
      </Link>
    </StyledGame>
  );
};

const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0 5px 20px black;
  text-align: center;
  border-radius: 1rem;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
  cursor: pointer;
  overflow: hidden;
`;

export default Game;
