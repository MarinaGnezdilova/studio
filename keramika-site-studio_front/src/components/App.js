import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "./Main";
import "./main.scss";
import Login from "./Login";
import Admin from "./Admin";
import Register from "./Register";
import NotFound from "./NotFound";

function App() {
    return (
        <>
        <Routes>
                <Route path="/" element={<Main/>}></Route>
                <Route path="*" element={<NotFound />}></Route>
                <Route path="/signin" element={<Login/>}></Route>
                <Route path="/admin" element={<Admin/>}></Route>
                <Route path="/signup" element={<Register/>}></Route>
            </Routes>
        </>
    );
  }
  
  export default App;