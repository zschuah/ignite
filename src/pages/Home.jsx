import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
import { loadDetail } from "../actions/detailAction";

import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

import Game from "../components/Game";
import GameDetail from "../components/GameDetail";

import { fadeIn } from "../animations";

const Home = ({ searchField }) => {
  //Get that data back
  //state.games is found in index.js of reducers
  const { popular, newGames, upcoming, searched } = useSelector(
    (state) => state.games
  );

  //Get the current location
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];

  //FETCH GAMES
  const dispatch = useDispatch();

  useEffect(() => {
    //Dispatch a created Action
    // dispatch(loadGames());

    dispatch(loadGames()).then(() => {
      if (pathId) {
        dispatch(loadDetail(pathId));
      }
    });
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <StyledGameList variants={fadeIn} initial="hidden" animate="show">
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence>
          {pathId && <GameDetail pathId={pathId} />}
        </AnimatePresence>

        {searched.length > 0 && (
          <div className="searched">
            <h2>
              Searched Games:{" "}
              <span style={{ color: "coral" }}>{searchField}</span>
            </h2>
            <StyledGames>
              {searched.map((game) => (
                <Game
                  key={game.id}
                  name={game.name}
                  released={game.released}
                  id={game.id}
                  image={game.background_image}
                />
              ))}
            </StyledGames>
          </div>
        )}

        <h2>Upcoming Games</h2>
        <StyledGames>
          {upcoming.map((game) => (
            <Game
              key={game.id}
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
            />
          ))}
        </StyledGames>

        <h2>Popular Games</h2>
        <StyledGames>
          {popular.map((game) => (
            <Game
              key={game.id}
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
            />
          ))}
        </StyledGames>

        <h2>New Games</h2>
        <StyledGames>
          {newGames.map((game) => (
            <Game
              key={game.id}
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
            />
          ))}
        </StyledGames>
      </AnimateSharedLayout>

      <div style={{ marginTop: "100px" }}></div>
    </StyledGameList>
  );
};

const StyledGameList = styled(motion.div)`
  padding: 0 5rem;
  h2 {
    padding: 5rem 0;
  }
`;

const StyledGames = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 2rem;
`;

export default Home;
