import React from "react";
import "./App.css";
import MenuItemForm from './components/MenuItemForm';
import { Routes, Route } from "react-router-dom";

function App() {
  // const marginStyle = {
  //   marginTop: "10vh",
  // };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MenuItemForm />} />
      </Routes>
    </div>
  );
}

export default App;
