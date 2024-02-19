
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from '../src/pages/Login.jsx'
import Register from '../src/pages/Register.jsx'

export default function Routing() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage />} /> 
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
     </Routes>
    </>
  );
}

