import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AddPlant from "./components/plant/AddPlant";
import Login from '../src/pages/Login.jsx'
import Register from '../src/pages/Register.jsx'
import { TestLoginPage } from './pages/TestLoginPage.jsx';
import { RegisterTestPage } from './pages/RegisterTestPage.jsx';

export default function Routing() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage />} /> 
      <Route path="/AddPlant" element={<AddPlant />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path='/testlogin' element={<TestLoginPage/>} />
      <Route path='/testregister' element={<RegisterTestPage/>} />
     </Routes>
    </>
  );
}

