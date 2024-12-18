import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import React, { useEffect } from 'react';
import Navbar from "./components/navbar/navbar";
import ProjectSelectionPage from "./pages/project-selection/ProjectSelectionPage";
import LoginPage from "./auth/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Protected from "./guards/protected";
import AuthRoute from "./auth/authRoute";
function App() {
  useEffect(() => {
    // Resize window to 90% of the screen (may be blocked by most browsers)
    window.resizeTo(window.screen.width * 0.9, window.screen.height * 0.9);
  }, []);
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>

        {/* <Navbar />  */}
        <Routes>
          {/* Add your routes here */}
          <Route path="/" element={<Protected />} >
            <Route path="/select-project" element={<ProjectSelectionPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
            <Route path="/auth/*" element={<AuthRoute />} />
        </Routes>

        
      </BrowserRouter>
    </div>
  );
}

export default App;
