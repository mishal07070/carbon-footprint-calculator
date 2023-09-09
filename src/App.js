import React from "react";
import Home from "./Home.js" 
import Calculator from "./Calculator.js"
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Result from "./Result.js";

export default function App() {
  const [fuelNet,setFuelNet]=useState();
  const [electricityNet,setElectricityNet]=useState();
  const [waterNet,setWaterNet]=useState();

  return (
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/Calculator" element={<Calculator setFuelNet={setFuelNet} setElectricityNet={setElectricityNet} setWaterNet={setWaterNet}/>}></Route>
        <Route path="/Result" element={<Result fuelNet={fuelNet} electricityNet={electricityNet} waterNet={waterNet}/>}></Route>
      </Routes>
  );
}
