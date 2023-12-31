import moment from "moment";

//Taken from https://rawg.io/@zhun_song/apikey and login using Facebook
const apiKey = "7bb3fe5b2fd849d3b65ac1cfc7072a89";

//Base URL
const base_url = "https://api.rawg.io/api/";

//Getting the date
const currentDate = moment().format("YYYY-MM-DD");
const lastYear = moment().subtract(1, "years").format("YYYY-MM-DD");
const nextYear = moment().add(1, "years").format("YYYY-MM-DD");

//URLs
const upcoming_games = `games?key=${apiKey}&dates=${currentDate},${nextYear}&ordering=-added&page_size=10`;
const popular_games = `games?key=${apiKey}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const new_games = `games?key=${apiKey}&dates=${lastYear},${currentDate}&ordering=-released&page_size=10`;

export const upcomingGamesURL = () => `${base_url}${upcoming_games}`;
export const popularGamesURL = () => `${base_url}${popular_games}`;
export const newGamesURL = () => `${base_url}${new_games}`;

export const gameDetailsURL = (game_id) =>
  `${base_url}games/${game_id}.json?&key=${apiKey}`;
export const gameScreenshotURL = (game_id) =>
  `${base_url}games/${game_id}/screenshots?&.json?&key=${apiKey}`;

//Searched game
export const searchGameURL = (game_name) =>
  `${base_url}games?key=${apiKey}&search=${game_name}&page_size=9`;
