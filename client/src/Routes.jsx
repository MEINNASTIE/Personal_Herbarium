import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AddPlant from "./components/plant/AddPlant";
import Login from '../src/pages/Login.jsx';

import Register from '../src/pages/Register.jsx'
import PlantItem from "./components/plant/Plant.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import UserPlantsPage from "./pages/UserPlantsPage.jsx";
import ForgorPage from "./pages/ForgorPage.jsx";
import UpdateProfilePage from "./pages/UpdateProfile.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";

export default function Routing() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage />} /> 
      <Route path="/AddPlant" element={<AddPlant />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/forgotpassword" element={<ForgorPage/>} />
      <Route path="/changePassword/:token" element={<ChangePassword/>} />
      <Route path="/plant/:plantId" element={<PlantItem />} />
      <Route path="/herbarium" element={<UsersPage/>} />
      <Route path="/plants/user/:userId" element={<UserPlantsPage/>} />
      <Route path="/profilePage" element={<UpdateProfilePage />} />
    </Routes> 
    </>
  );
}

