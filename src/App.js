import GlobalStyles from "./components/GlobalStyles";
import Home from "./pages/Home";
import Nav from "./components/Nav";

import { Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [searchField, setSearchField] = useState("");

  return (
    <div className="App">
      <GlobalStyles />
      <Nav setSearchField={setSearchField} />
      <Route path={["/game/:id", "/"]}>
        <Home searchField={searchField} />
      </Route>
    </div>
  );
}

export default App;
