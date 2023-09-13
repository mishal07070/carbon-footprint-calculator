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
import { useEffect } from 'react';


export default function Calculator(data) {
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  const navigate=useNavigate();
  function showResults(id){
    if(data.formInstances[data.formInstances.length-1].facilityName===''||(data.formInstances[data.formInstances.length-1].year===''&&data.formInstances[data.formInstances.length-1].month==='')){
      window.alert('Please fill the required fields.');
    }
    else if(data.formInstances[data.formInstances.length-1].year<2000||data.formInstances[data.formInstances.length-1].year>2030){
      window.alert('Please enter a valid year between 2000 and 2030');
    }
    else{
      navigate('/Result',{state:id});
      window.scrollTo(0, 0);
    }
  }
  
  function addInstance(){
    if(data.formInstances[data.formInstances.length-1].facilityName===''||(data.formInstances[data.formInstances.length-1].year===''&&data.formInstances[data.formInstances.length-1].month==='')){
      window.alert('Please fill the required fields.');
    }
    else if(data.formInstances[data.formInstances.length-1].year<2000||data.formInstances[data.formInstances.length-1].year>2030){
      window.alert('Please enter a valid year between 2000 and 2030');
    }
    else{
      const userConfirmed = window.confirm("Are you sure you want to add a new Instance? You won't be able to modify the current instance afterwards.");
      if (!userConfirmed) {
        return;
      }
      data.setFormInstances([...data.formInstances, data.initialInstance]);
      changeTab('Fossil Fuel')
      window.scrollTo(0, 0);
    }
    };
  function handleChange(value, index, field){
      const updatedInstances = [...data.formInstances];
      updatedInstances[index][field] = value;
      data.setFormInstances(updatedInstances);
    };
      
  function handleInput(value, index, field){
      const updatedInstances = [...data.formInstances];
      updatedInstances[index][field] = value;
      data.setFormInstances(updatedInstances);
    };
     
  const [activeTab,setActiveTab]=useState('Fossil Fuel');
  function changeTab(value){ setActiveTab(value) };

  function calculateFuel(index){
    const instance=data.formInstances[index];
    if(instance.combustion===''||instance.fuelType===''||(instance.vehicle===''&instance.fuelUnit==='')||instance.fuelAmount==='') window.alert('Please fill all the fields.');
    else{
      window.alert('Saved Successfully.')
      const updatedInstances = [...data.formInstances];
      updatedInstances[index]['fuelNet'] = (instance.combustion==='Mobile Combustion'?instance.fuelAmount*emissionFactors.fuels[instance.fuelType][instance.vehicle]:instance.fuelAmount*emissionFactors.fuels[instance.fuelType][instance.fuelUnit]);
      data.setFormInstances(updatedInstances);
      changeTab('Fugitive');
    }
  }
  
  function calculateElectricity(index){
    const instance=data.formInstances[index];
    if(instance.electricityType===''||instance.electricitySource===''||instance.electricityUnit===''||instance.electricityAmount==='') window.alert('Please fill all the fields.');
    else{
      window.alert('Saved Successfully.')
      const updatedInstances = [...data.formInstances];
      updatedInstances[index]['electricityNet'] = (instance.electricityAmount*emissionFactors.electricity[instance.electricityType]);
      data.setFormInstances(updatedInstances);
      changeTab('Water');
    }
  }
  
  function calculateWater(index){
    const instance=data.formInstances[index];
    if(instance.waterType===''||instance.waterDischargeSite===''||instance.waterUnit===''||instance.waterAmount==='') window.alert('Please fill all the fields.');
    else{
      window.alert('Saved Successfully.')
      const updatedInstances = [...data.formInstances];
      updatedInstances[index]['waterNet'] = (instance.waterAmount*emissionFactors.water[instance.waterType][instance.waterUnit]);
      data.setFormInstances(updatedInstances);
      changeTab('Waste');
    }
  }
  

  const lastInstance=data.formInstances[data.formInstances.length-1];
  return (
    <motion.div initial={{opacity:0}} animate={{ opacity:1 }} className="calculatorDiv">
      <div className="time">
        <div className='inputs'>
          <h3>Facility Name<p style={{display:'inline',color:'red'}}>*</p></h3>
          <Select className="Select" value={lastInstance.facilityName?lastInstance.facilityName:null} placeholder="Enter Facility Name"onChange={(event,value)=>{handleChange(value,data.formInstances.length-1,'facilityName')}}>
            <Option value="Academic Area">Academic Area</Option>
            <Option value="Halls of Residence">Halls of Residence</Option>
            <Option value="Housing Areas">Housing Areas</Option>
            <Option value="Others">Others</Option>
            </Select>
        <div className='inputs'>
          <h3>Year<p style={{display:'inline',color:'red'}}>*</p></h3>
        <Input type="number" value={lastInstance.year?lastInstance.year:''} onChange={(event)=>{handleInput(event.target.value,data.formInstances.length-1,'year')}} className="Select" placeholder='Enter Year'/>
        <h3>Month<p style={{display:'inline',color:'red'}}>*</p></h3>
        <Select value={lastInstance.month?lastInstance.month:null} className="Select" id="monthSelect" placeholder="Choose Month" onChange={(event,value)=>{handleChange(value,data.formInstances.length-1,'month')}}>
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
          </Select>
        </div>
        </div>
      </div>
      <Tabs value={activeTab} onChange={(event, value) => { changeTab(value)}} >
      <TabList underlinePlacement="bottom">
        <div className="tabsDiv">
        <Tab className="tabContent" value="Fossil Fuel" indicatorPlacement="bottom">
        <FontAwesomeIcon icon={faGasPump} />&nbsp;&nbsp;Fossil Fuel
        </Tab>
        <Tab className="tabContent" value="Fugitive" indicatorPlacement="bottom">
          <img style={{width:"25px",marginBottom:"0px"}} alt="acIcon" src={AC}/>&nbsp;&nbsp;Fugitive
        </Tab>
        <Tab className="tabContent" value="Electricity" indicatorPlacement="bottom">
        <FontAwesomeIcon icon={faBolt} />&nbsp;&nbsp;Electricity
        </Tab>
        <Tab className="tabContent" value="Water" indicatorPlacement="bottom">
        <FontAwesomeIcon icon={faWater} />&nbsp;&nbsp; Water
        </Tab>
        <Tab className="tabContent" value="Waste" indicatorPlacement="bottom">
        <FontAwesomeIcon icon={faTrash} />&nbsp;&nbsp; Waste
        </Tab>
    </div>
       
      </TabList>
      <TabPanel value="Fossil Fuel">
        <motion.div initial={{opacity:0}} animate={{ opacity:1 }} className="formDiv">
            <form className="calcForm">
              <div className='inputs'>
                <h3>Combustion Type: </h3>
              <Select value={lastInstance.combustion?lastInstance.combustion:null} className="Select" placeholder="Choose Combustion Type" onChange={(event,value)=>{handleChange(value, data.formInstances.length-1,'combustion')}}>
                <Option value="Mobile Combustion">Mobile Combustion</Option>
                <Option value="Stationary Combustion">Stationary Combustion</Option>
              </Select>
                </div>
              <div className="inputs">
              <h3>Fuel Type: </h3>
              <Select value={lastInstance.fuelType?lastInstance.fuelType:null} placeholder="Choose Fuel Type" onChange={(event,value)=>{handleChange(value, data.formInstances.length-1,'fuelType')}} className="Select">
              {lastInstance.combustion?<Option value="CNG">CNG</Option>:null}
              {lastInstance.combustion?<Option value="Petrol/Gasoline">Petrol/Gasoline</Option>:null}
              {lastInstance.combustion?<Option value="Diesel">Diesel</Option>:null}
              {lastInstance.combustion==='Stationary Combustion'?<Option value="PNG">PNG</Option>:null}
              {lastInstance.combustion==='Stationary Combustion'?<Option value="LPG">LPG</Option>:null}
              </Select>
              </div>
                {lastInstance.combustion==='Mobile Combustion'? <div className='inputs'><h3>Vehicle Type: </h3> <Select value={lastInstance.vehicle?lastInstance.vehicle:null} className="Select" placeholder="Choose Vehicle Type" onChange={(event,value)=>{handleChange(value,data.formInstances.length-1,'vehicle')}}>
                  {lastInstance.fuelType==='CNG'||lastInstance.fuelType==='Diesel'||lastInstance.fuelType==='Petrol/Gasoline'?<Option value="Passenger Car">Passenger Car</Option>:null}
                  {lastInstance.fuelType==='CNG'||lastInstance.fuelType==='Diesel'||lastInstance.fuelType==='Petrol/Gasoline'?<Option value="Light Duty Trucks">Light Duty Trucks</Option>:null}
                  {lastInstance.fuelType==='Diesel'?<Option value="Heavy Duty Trucks">Heavy Duty Trucks</Option>:null}
                </Select></div>:<div className='inputs'><h3>Unit: </h3>
                <Select value={lastInstance.fuelUnit?lastInstance.fuelUnit:null} onChange={(event,value)=>{handleChange(value,data.formInstances.length-1,'fuelUnit')}}  className="Select" placeholder="Choose Unit">
                  <Option value="kg">kg</Option>
                  <Option value="tonne">tonne</Option>
                  {lastInstance.fuelType==='Diesel'||lastInstance.fuelType==='Petrol/Gasoline'?<Option value="litre">litre</Option>:null}
                  {lastInstance.fuelType==='CNG'||lastInstance.fuelType==='PNG'?<Option value="cubic metre">cubic metre</Option>:null}
                </Select>
                </div>
                }
                {lastInstance.combustion==='Mobile Combustion'? 
                <div className='inputs'><h3>Distance Travelled(Km): </h3><Input type="number" value={lastInstance.fuelAmount?lastInstance.fuelAmount:''} onChange={(event)=>{handleInput(event.target.value,data.formInstances.length-1,'fuelAmount')}} className="Select" placeholder='Enter Distance Travelled(Km)'/></div>
                :<div className='inputs'><h3>Amount Consumed: </h3><Input type="number" value={lastInstance.fuelAmount?lastInstance.fuelAmount:''} onChange={(event)=>{handleInput(event.target.value,data.formInstances.length-1,'fuelAmount')}} className="Select" placeholder='Enter Amount'/></div>}
            </form>
            <Button style={{marginTop:'60px'}}onClick={()=>calculateFuel(data.formInstances.length-1)} id="getStarted">Save and Next</Button>
        </motion.div>
      </TabPanel>
      
      
      <TabPanel value="Fugitive">
      </TabPanel>
      
      
      <TabPanel value="Electricity">
      <motion.div initial={{opacity:0}} animate={{ opacity:1 }} className="formDiv">
            <form className="calcForm">
              <div className="inputs">
              <h3>Electricity Type: </h3>
              <Select value={lastInstance.electricityType?lastInstance.electricityType:null} onChange={(event,value)=>{handleChange(value, data.formInstances.length-1,'electricityType')}} className="Select" placeholder="Choose Electricity Type">
              <Option value="Non-Renewable">Non-Renewable</Option>
              <Option value="Renewable">Renewable</Option>
              </Select>
              </div>
              <div className='inputs'>
                <h3>Electricity Source: </h3>
              <Select value={lastInstance.electricitySource?lastInstance.electricitySource:null} className="Select" placeholder="Choose Electricity Source" onChange={(event,value)=>{handleChange(value, data.formInstances.length-1,'electricitySource')}}>
                <Option value="Purchased">Purchased</Option>
                <Option value="Self-Produced">Self-Produced</Option>
              </Select>
                </div>
              <div className='inputs'><h3>Unit: </h3>
                <Select value={lastInstance.electricityUnit?lastInstance.electricityUnit:null} onChange={(event,value)=>{handleChange(value, data.formInstances.length-1,'electricityUnit')}}  className="Select" placeholder="Choose Unit">
                  <Option value="kWH">kWH</Option>
                </Select></div>
                <div className='inputs'><h3>Amount Consumed: </h3><Input type="number" value={lastInstance.electricityAmount?lastInstance.electricityAmount:''} onChange={(event)=>{handleChange(event.target.value, data.formInstances.length-1,'electricityAmount')}} className="Select" placeholder='Enter Amount'/></div>
            </form>
            <Button style={{marginTop:'60px'}} onClick={()=>calculateElectricity(data.formInstances.length-1)} id="getStarted">Save and Next</Button>
        </motion.div>

      </TabPanel>
      
      <TabPanel value="Water">
      <motion.div initial={{opacity:0}} animate={{ opacity:1 }} className="formDiv">
            <form className="calcForm">
              <div className="inputs">
              <h3>Water Type: </h3>
              <Select value={lastInstance.waterType?lastInstance.waterType:null} onChange={(event,value)=>{handleChange(value, data.formInstances.length-1,'waterType')}} className="Select" placeholder="Choose Water Type">
              <Option value="Supplied Water">Supplied Water</Option>
              <Option value="Treated Water">Treated Water</Option>
              </Select>
              </div>
              <div className='inputs'>
                <h3>Discharge Site: </h3>
                <Input value={lastInstance.waterDischargeSite?lastInstance.waterDischargeSite:''} onChange={(event)=>{handleChange(event.target.value, data.formInstances.length-1,'waterDischargeSite')}} className="Select" placeholder='Enter Discharge Site'/>
                </div>
              <div className='inputs'><h3>Unit: </h3>
                <Select value={lastInstance.waterUnit?lastInstance.waterUnit:null} onChange={(event,value)=>{handleChange(value, data.formInstances.length-1,'waterUnit')}}  className="Select" placeholder="Choose Unit">
                  <Option value="cubic metre">cubic metre</Option>
                  <Option value="million litres">million litres</Option>
                </Select></div>
                <div className='inputs'><h3>Amount: </h3><Input type="number" value={lastInstance.waterAmount?lastInstance.waterAmount:''} onChange={(event)=>{handleInput(event.target.value, data.formInstances.length-1,'waterAmount')}} className="Select" placeholder='Enter Amount'/></div>
            </form>
            <Button style={{marginTop:'60px'}} onClick={()=>calculateWater(data.formInstances.length-1)} id="getStarted">Save and Next</Button>
        </motion.div>
      </TabPanel>
      
      <TabPanel value="Waste">
      <motion.div initial={{opacity:0}} animate={{ opacity:1 }} className="formDiv">
            <form className="calcForm">
              <div className="inputs">
              <h3>Treatment Type: </h3>
              <Select value={lastInstance.wasteTreatmentType?lastInstance.wasteTreatmentType:null} onChange={(event,value)=>{handleChange(value, data.formInstances.length-1,'wasteTreatmentType')}} className="Select" placeholder="Choose Treatment Type">
              <Option value="Landfills">Landfills</Option>
              <Option value="Composting">Composting</Option>
              <Option value="Recycling">Recycling</Option>
              <Option value="Incineration">Incineration</Option>
              </Select>
              </div>
              <div className='inputs'>
                <h3>Waste Type: </h3>
                <Input value={lastInstance.wasteType?lastInstance.wasteType:''} onChange={(event,value)=>{handleChange(value, data.formInstances.length-1,'wasteType')}} className="Select" placeholder='Enter Waste Type'/>
                </div>
              <div className='inputs'><h3>Unit: </h3>
                <Select value={lastInstance.wasteUnit?lastInstance.wasteUnit:null} onChange={(event,value)=>{handleChange(value, data.formInstances.length-1,'wasteUnit')}}  className="Select" placeholder="Choose Unit">
                  <Option value="kg">kg</Option>
                  <Option value="tonne">tonne</Option>
                </Select></div>
                <div className='inputs'><h3>Amount: </h3><Input type="number" value={lastInstance.wasteAmount?lastInstance.wasteAmount:''} onChange={(event)=>{handleInput(event.target.value, data.formInstances.length-1,'wasteAmount')}} className="Select" placeholder='Enter Amount'/></div>
            </form>
            <Button style={{marginTop:'60px'}} id="getStarted">Save</Button>
            <div id="submitDiv">
              <Button onClick={addInstance} style={{margin:'0',marginTop:'30px'}} id="getStarted">Add Another Instance</Button>
              <Button style={{margin:'0',marginTop:'30px'}} onClick={()=>showResults(1)} id="getStarted">Finalise and Show Results</Button>
            </div>
        </motion.div>
      </TabPanel>
    </Tabs>
    </motion.div>
  );
}
