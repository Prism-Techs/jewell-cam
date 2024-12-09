import "./App.css";  
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import React, { useEffect } from 'react';
import Navbar from "./components/navbar/navbar"; 
import ProjectSelectionPage from "./pages/project-selection/ProjectSelectionPage";
// import Header from "./components/common/header/header";
function App() {
  useEffect(() => {
    // Resize window to 90% of the screen (may be blocked by most browsers)
    window.resizeTo(window.screen.width * 0.9, window.screen.height * 0.9);
  }, []);
  return (   
    <div className="App">
      <BrowserRouter>
        {/* <Navbar />  */}
        <Routes>
          {/* Add your routes here */}
          <Route path="/" element={<ProjectSelectionPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add more routes as needed */}
          <Route path="*" element={<Dashboard />} /> {/* Fallback route */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
