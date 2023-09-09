import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Input from '@mui/joy/Input';
import { faGasPump } from '@fortawesome/free-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faWater } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import AC from "./AC.png";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useState } from 'react';
import Button from '@mui/joy/Button';
import emissionFactors from './emissionFactors.json';
import { useNavigate } from 'react-router-dom';


export default function Calculator(data) {
  const navigate=useNavigate();
  function showResults(){
    navigate('/Result');
  }

  const [timePeriod,setTimePeriod]=useState('Yearly');
  const [month,setMonth]=useState();
  const [fuelType,setFuelType]=useState();
  const [combustion,setCombustion]=useState();
  const [vehicle,setVehicle]=useState();
  const [fuelUnit,setFuelUnit]=useState();
  const [fuelAmount,setFuelAmount]=useState();
  
  const [electricityType,setElectricityType]=useState();
  const [electricitySource,setElectricitySource]=useState();
  const [electricityUnit,setElectricityUnit]=useState();
  const [electricityAmount,setElectricityAmount]=useState();
  
  const [waterType,setWaterType]=useState();
  const [waterDischargeSite,setWaterDischargeSite]=useState();
  const [waterUnit,setWaterUnit]=useState();
  const [waterAmount,setWaterAmount]=useState();
  
  const [wasteType,setWasteType]=useState();
  const [wasteTreatmentType,setWasteTreatmentType]=useState();
  const [wasteUnit,setWasteUnit]=useState();
  const [wasteAmount,setWasteAmount]=useState();

  
  function handleTimePeriod(event){setTimePeriod(event.target.innerText);}
  function handleMonth(event){ setMonth(event.target.innerText);}
  function handleCombustion(event){ setCombustion(event.target.innerText); setFuelType(null);}
  function handleFuelType(event){setFuelType(event.target.innerText);}
  function handleVehicle(event){ setVehicle(event.target.innerText);}
  function handleFuelUnit(event){ setFuelUnit(event.target.innerText);}
  function handleFuelAmount(event){ setFuelAmount(event.target.value);}
  
  function handleElectricityType(event){setElectricityType(event.target.innerText);}
  function handleElectricitySource(event){setElectricitySource(event.target.innerText);}
  function handleElectricityUnit(event){ setElectricityUnit(event.target.innerText);}
  function handleElectricityAmount(event){ setElectricityAmount(event.target.value);}
  
  function handleWaterType(event){setWaterType(event.target.innerText);}
  function handleWaterDischargeSite(event){setWaterDischargeSite(event.target.value);}
  function handleWaterUnit(event){ setWaterUnit(event.target.innerText);}
  function handleWaterAmount(event){ setWaterAmount(event.target.value);}
  
  function handleWasteTreatmentType(event){setWasteTreatmentType(event.target.innerText);}
  function handleWasteType(event){ setWasteType(event.target.value);}
  function handleWasteUnit(event){ setWasteUnit(event.target.innerText);}
  function handleWasteAmount(event){ setWasteAmount(event.target.value);}
  
  function calculateFuel(){
    if(combustion===null||fuelType===null||(vehicle==null&fuelUnit==null)||fuelAmount==null) window.alert('Please fill all the fields.');
    else{
      window.alert('Saved Successfully.')
      data.setFuelNet(combustion==='Mobile Combustion'?fuelAmount*emissionFactors.fuels[fuelType][vehicle]:fuelAmount*emissionFactors.fuels[fuelType][fuelUnit]);
      console.log(combustion==='Mobile Combustion'?fuelAmount*emissionFactors.fuels[fuelType][vehicle]:fuelAmount*emissionFactors.fuels[fuelType][fuelUnit]);
    }
  }
  
  function calculateElectricity(){
    if(electricityType===null||electricitySource===null||electricityUnit==null||electricityAmount==null) window.alert('Please fill all the fields.');
    else{
      window.alert('Saved Successfully.')
      data.setElectricityNet(electricityAmount*emissionFactors.electricity[electricityType]);
      console.log(electricityAmount*emissionFactors.electricity[electricityType]);
    }
  }
  
  function calculateWater(){
    if(waterType===null||waterDischargeSite===null||waterUnit==null||waterAmount==null) window.alert('Please fill all the fields.');
    else{
      window.alert('Saved Successfully.')
      data.setWaterNet(waterAmount*emissionFactors.water[waterType][waterUnit]);
      console.log(waterAmount*emissionFactors.water[waterType][waterUnit]);
    }
  }



  return (
    <motion.div initial={{opacity:0}} animate={{ opacity:1 }} className="calculatorDiv">
      {/* <div className="time">
        <h2>Time Period: </h2>
      <Select className="Select" placeholder="Choose Time Period" onChange={handleTimePeriod}>
        <Option value="yearly">Yearly</Option>
        <Option value="monthly">Monthly</Option>
    </Select>
      {timePeriod==='Monthly'?<Select className="Select" id="monthSelect" placeholder="Choose Month" onChange={handleMonth}>
          <Option value="January">January</Option>
          <Option value="February">February</Option>
          <Option value="March">March</Option>
          <Option value="April">April</Option>
          <Option value="May">May</Option>
          <Option value="June">June</Option>
          <Option value="July">July</Option>
          <Option value="August">August</Option>
          <Option value="September">September</Option>
          <Option value="October">October</Option>
          <Option value="November">November</Option>
          <Option value="December">December</Option>
        </Select>:null}
      </div> */}
      <Tabs defaultValue="top">
      <TabList underlinePlacement="bottom">
        <div className="tabsDiv">
        <Tab className="tabContent" value="fossil" indicatorPlacement="bottom">
        <FontAwesomeIcon icon={faGasPump} />&nbsp;&nbsp;Fossil Fuel
        </Tab>
        <Tab className="tabContent" value="fugitive" indicatorPlacement="bottom">
          <img style={{width:"25px",marginBottom:"0px"}} alt="acIcon" src={AC}/>&nbsp;&nbsp;Fugitive
        </Tab>
        <Tab className="tabContent" value="electricity" indicatorPlacement="bottom">
        <FontAwesomeIcon icon={faBolt} />&nbsp;&nbsp;Electricity
        </Tab>
        <Tab className="tabContent" value="water" indicatorPlacement="bottom">
        <FontAwesomeIcon icon={faWater} />&nbsp;&nbsp; Water
        </Tab>
        <Tab className="tabContent" value="waste" indicatorPlacement="bottom">
        <FontAwesomeIcon icon={faTrash} />&nbsp;&nbsp; Waste
        </Tab>
    </div>
      </TabList>
      <TabPanel value="fossil">
        <motion.div initial={{opacity:0}} animate={{ opacity:1 }} className="formDiv">
            <form className="calcForm">
              <div className='inputs'>
                <h2>Combustion Type: </h2>
              <Select value={combustion} className="Select" placeholder="Choose Combustion Type" onChange={handleCombustion}>
                <Option value="Mobile Combustion">Mobile Combustion</Option>
                <Option value="Stationary Combustion">Stationary Combustion</Option>
              </Select>
                </div>
              <div className="inputs">
              <h2>Fuel Type: </h2>
              <Select value={fuelType} onChange={handleFuelType} className="Select" placeholder="Choose Fuel Type">
              {combustion?<Option value="CNG">CNG</Option>:null}
              {combustion?<Option value="Petrol/Gasoline">Petrol/Gasoline</Option>:null}
              {combustion?<Option value="Diesel">Diesel</Option>:null}
              {combustion==='Stationary Combustion'?<Option value="PNG">PNG</Option>:null}
              {combustion==='Stationary Combustion'?<Option value="LPG">LPG</Option>:null}
              </Select>
              </div>
                {combustion==='Mobile Combustion'? <div className='inputs'><h2>Vehicle Type: </h2> <Select value={vehicle} className="Select" placeholder="Choose Vehicle Type" onChange={handleVehicle}>
                  {fuelType==='CNG'||fuelType==='Diesel'||fuelType==='Petrol/Gasoline'?<Option value="Passenger Car">Passenger Car</Option>:null}
                  {fuelType==='CNG'||fuelType==='Diesel'||fuelType==='Petrol/Gasoline'?<Option value="Light Duty Trucks">Light Duty Trucks</Option>:null}
                  {fuelType==='Diesel'?<Option value="Heavy Duty Trucks">Heavy Duty Trucks</Option>:null}
                </Select></div>:<div className='inputs'><h2>Unit: </h2>
                <Select value={fuelUnit} onChange={handleFuelUnit}  className="Select" placeholder="Choose Unit">
                  <Option value="kg">kg</Option>
                  <Option value="tonne">tonne</Option>
                </Select>
                </div>
                }
                {combustion==='Mobile Combustion'? 
                <div className='inputs'><h2>Distance Travelled(Km): </h2><Input value={fuelAmount} onChange={handleFuelAmount} className="Select" placeholder='Enter Distance Travelled(Km)'/></div>
                :<div className='inputs'><h2>Amount Consumed: </h2><Input value={fuelAmount} onChange={handleFuelAmount} className="Select" placeholder='Enter Amount'/></div>}
            <Button onClick={calculateFuel} id="getStarted">Save</Button>
            </form>
        </motion.div>
      </TabPanel>
      
      
      <TabPanel value="fugitive">
      </TabPanel>
      
      
      <TabPanel value="electricity">
      <motion.div initial={{opacity:0}} animate={{ opacity:1 }} className="formDiv">
            <form className="calcForm">
              <div className="inputs">
              <h2>Electricity Type: </h2>
              <Select value={electricityType} onChange={handleElectricityType} className="Select" placeholder="Choose Electricity Type">
              <Option value="Non-Renewable">Non-Renewable</Option>
              <Option value="Renewable">Renewable</Option>
              </Select>
              </div>
              <div className='inputs'>
                <h2>Electricity Source: </h2>
              <Select value={electricitySource} className="Select" placeholder="Choose Electricity Source" onChange={handleElectricitySource}>
                <Option value="Purchased">Purchased</Option>
                <Option value="Self-Produced">Self-Produced</Option>
              </Select>
                </div>
              <div className='inputs'><h2>Unit: </h2>
                <Select value={electricityUnit} onChange={handleElectricityUnit}  className="Select" placeholder="Choose Unit">
                  <Option value="kWH">kWH</Option>
                </Select></div>
                <div className='inputs'><h2>Amount Consumed: </h2><Input value={electricityAmount} onChange={handleElectricityAmount} className="Select" placeholder='Enter Amount'/></div>
            <Button onClick={calculateElectricity} id="getStarted">Save</Button>
            </form>
        </motion.div>

      </TabPanel>
      
      <TabPanel value="water">
      <motion.div initial={{opacity:0}} animate={{ opacity:1 }} className="formDiv">
            <form className="calcForm">
              <div className="inputs">
              <h2>Water Type: </h2>
              <Select value={waterType} onChange={handleWaterType} className="Select" placeholder="Choose Water Type">
              <Option value="Supplied Water">Supplied Water</Option>
              <Option value="Treated Water">Treated Water</Option>
              </Select>
              </div>
              <div className='inputs'>
                <h2>Discharge Site: </h2>
                <Input value={waterDischargeSite} onChange={handleWaterDischargeSite} className="Select" placeholder='Enter Discharge Site'/>
                </div>
              <div className='inputs'><h2>Unit: </h2>
                <Select value={waterUnit} onChange={handleWaterUnit}  className="Select" placeholder="Choose Unit">
                  <Option value="cubic metre">cubic metre</Option>
                  <Option value="million litres">million litres</Option>
                </Select></div>
                <div className='inputs'><h2>Amount: </h2><Input value={waterAmount} onChange={handleWaterAmount} className="Select" placeholder='Enter Amount'/></div>
            <Button onClick={calculateWater} id="getStarted">Save</Button>
            </form>
        </motion.div>
      </TabPanel>
      
      <TabPanel value="waste">
      <motion.div initial={{opacity:0}} animate={{ opacity:1 }} className="formDiv">
            <form className="calcForm">
              <div className="inputs">
              <h2>Waste Treatment Type: </h2>
              <Select value={wasteTreatmentType} onChange={handleWasteTreatmentType} className="Select" placeholder="Choose Treatment Type">
              <Option value="Landfills">Landfills</Option>
              <Option value="Composting">Composting</Option>
              <Option value="Recycling">Recycling</Option>
              <Option value="Incineration">Incineration</Option>
              </Select>
              </div>
              <div className='inputs'>
                <h2>Waste Type: </h2>
                <Input value={wasteType} onChange={handleWasteType} className="Select" placeholder='Enter Waste Type'/>
                </div>
              <div className='inputs'><h2>Unit: </h2>
                <Select value={wasteUnit} onChange={handleWasteUnit}  className="Select" placeholder="Choose Unit">
                  <Option value="kg">kg</Option>
                  <Option value="tonne">tonne</Option>
                </Select></div>
                <div className='inputs'><h2>Amount: </h2><Input value={wasteAmount} onChange={handleWasteAmount} className="Select" placeholder='Enter Amount'/></div>
            <Button onClick={showResults} id="getStarted">Save and Show Result</Button>
            </form>
        </motion.div>
      </TabPanel>
    </Tabs>
    </motion.div>
  );
}
