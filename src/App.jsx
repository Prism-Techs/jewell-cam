import "./App.css";  
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Navbar from "./components/navbar/navbar"; // If you have a Navbar component to include
// import Header from "./components/common/header/header";
function App() {
  return (   
    <div className="App">
      <BrowserRouter>
        {/* <Navbar />  */}
        <Routes>
          {/* Add your routes here */}
          <Route path="/" element={<Dashboard />} />
          {/* Add more routes as needed */}
          <Route path="*" element={<Dashboard />} /> {/* Fallback route */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
