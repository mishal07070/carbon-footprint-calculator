import React from "react";
import Home from "./Home.js"
import Calculator from "./Calculator.js"
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Result from "./Result.js";

export default function App() {

  const initialFossilInstance = {
    'facilityName': '',
    'year': '',
    'month': '',
    'fuelType': '',
    'fuelUnit': '',
    'fuelAmount': '',
    'fuelNet': ''
  }
  const initialElectricityInstance = {
    'facilityName': '',
    'year': '',
    'month': '',
    'electricityType': '',
    'electricitySource': '',
    'electricityUnit': '',
    'electricityAmount': '',
    'electricityNet': ''
  }
  const initialWaterInstance = {
    'facilityName': '',
    'year': '',
    'month': '',
    'waterType': '',
    'waterDischargeSite': '',
    'waterUnit': '',
    'waterAmount': '',
    'waterNet': ''
  }
  const initialWasteInstance = {
    'facilityName': '',
    'year': '',
    'month': '',
    'wasteType': '',
    'wasteTreatmentType': '',
    'wasteUnit': '',
    'wasteAmount': '',
    'wasteNet': ''
  }
  const initialTravelInstance = {
    'facilityName': '',
    'year': '',
    'month': '',
    'travelType': '',
    'airFlightLength': '',
    'roadVehicleOwnership': '',
    'roadVehicleType': '',
    'roadFuelType': '',
    'travelDistance': '',
    'travelNet': ''
  }
  const initialOffsetInstance = {
    'facilityName': '',
    'year': '',
    'month': '',
    'offsetTrees': '',
    'offsetGrass': '',
    'offsetSoil': '',
    'offsetWater': '',
    'offsetNet': ''
  }
  const [fossilInstances, setFossilInstances] = useState([initialFossilInstance]);
  const [electricityInstances, setElectricityInstances] = useState([initialElectricityInstance]);
  const [waterInstances, setWaterInstances] = useState([initialWaterInstance]);
  const [wasteInstances, setWasteInstances] = useState([initialWasteInstance]);
  const [travelInstances, setTravelInstances] = useState([initialTravelInstance]);
  const [offsetInstances, setOffsetInstances] = useState([initialOffsetInstance]);
  const [result, setResult] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Home
        initialFossilInstance={initialFossilInstance}
        initialElectricityInstance={initialElectricityInstance}
        initialWaterInstance={initialWaterInstance}
        initialWasteInstance={initialWasteInstance}
        initialTravelInstance={initialTravelInstance}
        initialOffsetInstance={initialOffsetInstance}
        fossilInstances={fossilInstances} setFossilInstances={setFossilInstances}
        electricityInstances={electricityInstances} setElectricityInstances={setElectricityInstances}
        waterInstances={waterInstances} setWaterInstances={setWaterInstances}
        wasteInstances={wasteInstances} setWasteInstances={setWasteInstances}
        travelInstances={travelInstances} setTravelInstances={setTravelInstances}
        offsetInstances={offsetInstances} setOffsetInstances={setOffsetInstances}
        result={result} setResult={setResult} />}></Route>

      <Route path="/Calculator" element={<Calculator
        initialFossilInstance={initialFossilInstance}
        initialElectricityInstance={initialElectricityInstance}
        initialWaterInstance={initialWaterInstance}
        initialWasteInstance={initialWasteInstance}
        initialTravelInstance={initialTravelInstance}
        initialOffsetInstance={initialOffsetInstance}
        fossilInstances={fossilInstances} setFossilInstances={setFossilInstances}
        electricityInstances={electricityInstances} setElectricityInstances={setElectricityInstances}
        waterInstances={waterInstances} setWaterInstances={setWaterInstances}
        wasteInstances={wasteInstances} setWasteInstances={setWasteInstances}
        travelInstances={travelInstances} setTravelInstances={setTravelInstances}
        offsetInstances={offsetInstances} setOffsetInstances={setOffsetInstances} />}></Route>

      <Route path="/Result" element={<Result result={result} setResult={setResult}
        fossilInstances={fossilInstances}
        electricityInstances={electricityInstances}
        waterInstances={waterInstances}
        wasteInstances={wasteInstances}
        travelInstances={travelInstances}
        offsetInstances={offsetInstances} />}></Route>
    </Routes>
  );
}
