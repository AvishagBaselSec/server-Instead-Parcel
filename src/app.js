import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { StrictMode, useState } from "react";
import { themeContext } from "./ThemeContext.js";
import { SearchParams } from "./SearchParams.js";
import { WrappedDetails } from "./Details.js";

//import Pet from "./pet";

const App = () => {
  const theme = useState("darkblue");
  return (
    <StrictMode>
      <themeContext.Provider value={theme}>
        <BrowserRouter>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<WrappedDetails />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </BrowserRouter>
      </themeContext.Provider>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
