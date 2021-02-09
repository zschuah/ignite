import styled from "styled-components";
import { motion } from "framer-motion";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";

import starEmpty from "../img/star-empty.png";
import starFull from "../img/star-full.png";

const GameDetail = ({ pathId }) => {
  const { screen, game, isLoading } = useSelector((state) => state.detail);

  const history = useHistory();

  const exitDetailHandler = (e) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      history.push("/");
    }
  };

  //Get stars
  const getStars = () => {
    const stars = [];
    const rating = Math.round(game.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img alt="star" key={i} src={starFull} />);
      } else {
        stars.push(<img alt="star" key={i} src={starEmpty} />);
      }
    }
    return stars;
  };

  //Get platform images
  const getPlatform = (platform) => {
    if (platform.includes("PlayStation")) {
      return playstation;
    } else if (platform.includes("Xbox")) {
      return xbox;
    } else if (platform === "PC") {
      return steam;
    } else if (platform === "Nintendo Switch") {
      return nintendo;
    } else if (platform.includes("OS")) {
      return apple;
    } else {
      return gamepad;
    }
  };

  return (
    <div>
      {!isLoading && (
        <StyledCardShadow className="shadow" onClick={exitDetailHandler}>
          <StyledDetail layoutId={pathId}>
            <StyledStats>
              <div className="rating">
                <motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
                <p>Rating: {game.rating}</p>
                {getStars()}
              </div>

              <StyledInfo>
                <h3>Platforms</h3>
                <StyledPlatforms>
                  {game.platforms?.map((data) => (
                    <img
                      key={data.platform.id}
                      src={getPlatform(data.platform.name)}
                      alt={data.platform.name}
                      title={data.platform.name}
                    />
                  ))}
                </StyledPlatforms>
              </StyledInfo>
            </StyledStats>

            <StyledMedia>
              <motion.img
                layoutId={`image ${pathId}`}
                src={game.background_image}
                alt="game.background_image"
              />
            </StyledMedia>

            <StyledDescription>
              <p>{game.description_raw}</p>
            </StyledDescription>

            <div className="gallery">
              {screen.results?.map((screen) => (
                <img src={screen.image} key={screen.id} alt="screen_image" />
              ))}
            </div>
          </StyledDetail>
        </StyledCardShadow>
      )}
    </div>
  );
};

const StyledCardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 127, 80, 0.8);
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 127, 80, 1);
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const StyledDetail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  img {
    width: 100%;
  }
`;

const StyledStats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
`;
const StyledInfo = styled(motion.div)`
  text-align: center;
`;
const StyledPlatforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
  }
`;

const StyledMedia = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
  }
`;

const StyledDescription = styled(motion.div)`
  margin: 5rem 0;
`;

export default GameDetail;
