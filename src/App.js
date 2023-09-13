import React from "react";
import Home from "./Home.js" 
import Calculator from "./Calculator.js"
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Result from "./Result.js";

export default function App() {
  
  const [fossilInstances, setFossilInstances] = useState([]);
  const [electricityInstances, setElectricityInstances] = useState([]);
  const [waterInstances, setWaterInstances] = useState([]);
  const initialInstance={
    'facilityName':'',
    'year': '',
    'month': '',
    'fuelType': '',
    'combustion': '',
    'vehicle': '',
    'fuelUnit': '',
    'fuelAmount': '',
    'fuelNet':'',
    'electricityType': '',
    'electricitySource': '',
    'electricityUnit': '',
    'electricityAmount': '',
    'electricityNet':'',
    'waterType': '',
    'waterDischargeSite': '',
    'waterUnit': '',
    'waterAmount': '',
    'waterNet':''
  }
  const [formInstances, setFormInstances] = useState([initialInstance]);
  const [result,setResult]=useState(0);
            
  return (
      <Routes>
        <Route path="/" element={<Home setFormInstances={setFormInstances} initialInstance={initialInstance} fossilInstances={fossilInstances} setFossilInstances={setFossilInstances} electricityInstances={electricityInstances} 
        setElectricityInstances={setElectricityInstances} waterInstances={waterInstances} setWaterInstances={setWaterInstances} result={result} setResult={setResult} />}></Route>
        <Route path="/Calculator" element={<Calculator initialInstance={initialInstance} formInstances={formInstances} setFormInstances={setFormInstances}/>}></Route>
        <Route path="/Result" element={<Result formInstances={formInstances} result={result} setResult={setResult} fossilInstances={fossilInstances} electricityInstances={electricityInstances} waterInstances={waterInstances}/>}></Route>
      </Routes>
  );
}
