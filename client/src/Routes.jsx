import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AddPlant from "./components/plant/AddPlant";
import Login from '../src/pages/Login.jsx'
import Register from '../src/pages/Register.jsx'
import PlantItem from "./components/plant/Plant.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import UserPlantsPage from "./pages/UserPlantsPage.jsx";
import Navbar from "./components/sticky/Navbar.jsx"
import Footer from "./components/sticky/Footer.jsx";

export default function Routing() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Homepage />} /> 
      <Route path="/AddPlant" element={<AddPlant />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/plant/:plantId" element={<PlantItem />} />
      <Route path="/herbarium" element={<UsersPage/>} />
      <Route path="/plants/user/:userId" element={<UserPlantsPage/>} />
    </Routes> 
     <Footer/>
    </>
  );
}

