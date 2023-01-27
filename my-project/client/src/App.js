import React, { useEffect, useState } from "react";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {load ? <div className="loading">Loading...</div> : 
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      }
    </BrowserRouter>
  );
}

export default App;



