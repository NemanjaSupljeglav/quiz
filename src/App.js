//React
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Pages
import Quiz from "./pages/quiz/index";
import Play from "./pages/play/index";

//Context
import GlobalProvider from "./context/globalState";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Quiz />} />
          <Route path="/play/:id" element={<Play />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
