
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AddPlant from "./components/plant/AddPlant";
import PlantProvider from "./context/plantProvider";
import Navbar from "./components/sticky/Navbar";

import {Route, Routes } from 'react-router-dom'

import Login from '../src/pages/Login.jsx'
import Register from '../src/pages/Register.jsx'


export default function App() {

  return (
    <>
    <PlantProvider>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/AddPlant" element={<AddPlant />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
     </Routes> 
     </PlantProvider>
    </>
  );
}

