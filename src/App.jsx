import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import React, { useEffect } from 'react';
import Navbar from "./components/navbar/navbar";
// import ProjectSelectionPage from "./pages/project-selection/ProjectSelectionPage";
import LoginPage from "./auth/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Protected from "./guards/protected";
import AuthRoute from "./auth/authRoute";
import Loader from "./components/common/loader/loader";
import instance from "./services/token-interceptor";
import { useLoading } from "./services/loadingContext";

function App() {
   const { isloading, setLoading } = useLoading();
   // Create a counter outside of your interceptors
   let activeRequests = 0;
 
   const setLoadingState = () => {
     // If there are no active requests, set isLoading to false
     setLoading(activeRequests !== 0);
   };
 
   instance.interceptors.request.use(
     config => {
       activeRequests++; // Increment the counter when a request starts
       setLoadingState(); // Update loading state
       return config;
     },
     error => {
       setLoadingState(); // Update loading state in case of a request error
       return Promise.reject(error);
     }
   );
 
   instance.interceptors.response.use(
     response => {
       activeRequests--; // Decrement the counter when a request finishes
       setLoadingState(); // Update loading state
       return response;
     },
     error => {
       activeRequests--; // Decrement the counter in case of a response error
       setLoadingState(); // Update loading state
       return Promise.reject(error);
     }
   );  
  useEffect(() => {
    // Resize window to 90% of the screen (may be blocked by most browsers)
    window.resizeTo(window.screen.width * 0.9, window.screen.height * 0.9);
  }, []);
  return (
    <div className="App">
      <ToastContainer />
      {/* <Loader show={isloading} /> */}
      <BrowserRouter>

        {/* <Navbar />  */}
        <Routes>
          {/* Add your routes here */}
          <Route path="/" element={<Protected />} >
            {/* <Route path="/select-project" element={<ProjectSelectionPage />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />  
          </Route>
            <Route path="/auth/*" element={<AuthRoute />} />
            

        </Routes>

        
      </BrowserRouter>
    </div>
  );
}

export default App;
