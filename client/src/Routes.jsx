import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AddPlant from "./components/plant/AddPlant";
import PlantProvider from "./context/plantProvider";
import Navbar from "./components/sticky/Navbar";

export default function App() {

  return (
    <>
    <PlantProvider>
    
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/AddPlant" element={<AddPlant />} />

     </Routes>
     </PlantProvider>
    </>
  )
}

