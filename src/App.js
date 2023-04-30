//React
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Notification manager
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

//Pages
import Quiz from "./pages/quiz/index";
import Play from "./pages/play/index";

//Context
import GlobalProvider from "./context/globalState";

function App() {
  return (
    <GlobalProvider>
      <NotificationContainer />
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
