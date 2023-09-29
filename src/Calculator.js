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
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
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
import FacilityYearMonth from './FacilityYearMonth';

export default function Calculator(data) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    data.setFossilInstances([data.initialFossilInstance]);
    data.setElectricityInstances([data.initialElectricityInstance]);
    data.setWaterInstances([data.initialWaterInstance]);
    data.setWasteInstances([data.initialWasteInstance]);
    data.setTravelInstances([data.initialTravelInstance]);
    data.setOffsetInstances([data.initialOffsetInstance]);
    setLoading(false);
  }, []);

  const navigate = useNavigate();
  function showResults() {
    if (data.fossilInstances[data.fossilInstances.length - 1].fuelNet === '' || data.electricityInstances[data.electricityInstances.length - 1].electricityNet === '' || data.waterInstances[data.waterInstances.length - 1].waterNet === '' || data.wasteInstances[data.wasteInstances.length - 1].wasteNet === '' || data.travelInstances[data.travelInstances.length - 1].travelNet === '' || data.offsetInstances[data.offsetInstances.length - 1].offsetNet === '') {
      alert('Please ensure that you have saved your last instances in each tab before proceeding.');
      return;
    }
    else {
      navigate('/Result');
    }
  }

  function handleChange(array, setArray, value, index, field) {
    const updatedInstances = [...array];
    updatedInstances[index][field] = value;
    setArray(updatedInstances);
  };

  function handleInput(array, setArray, value, index, field) {
    const updatedInstances = [...array];
    updatedInstances[index][field] = value;
    setArray(updatedInstances);
  };

  const [activeTab, setActiveTab] = useState('Fossil Fuel');
  function changeTab(value) { setActiveTab(value); window.scrollTo(0, 0) };

  function calculateFuel(index) {
    const instance = data.fossilInstances[index];
    if (instance.fuelType === '' || (instance.vehicle === '' & instance.fuelUnit === '') || instance.fuelAmount === '') window.alert('Please fill out all the fields.');
    else {
      window.alert('Saved Successfully.')
      const updatedInstances = [...data.fossilInstances];
      updatedInstances[index]['fuelNet'] = (instance.fuelAmount * emissionFactors.fuels[instance.fuelType][instance.fuelUnit]);
      data.setFossilInstances(updatedInstances);
      console.log(data.fossilInstances);
    }
  }

  function calculateElectricity(index) {
    const instance = data.electricityInstances[index];
    if (instance.electricityType === '' || instance.electricitySource === '' || instance.electricityUnit === '' || instance.electricityAmount === '') window.alert('Please fill out all the fields.');
    else {
      window.alert('Saved Successfully.')
      const updatedInstances = [...data.electricityInstances];
      updatedInstances[index]['electricityNet'] = (instance.electricityAmount * emissionFactors.electricity[instance.electricityType]);
      data.setElectricityInstances(updatedInstances);
    }
  }

  function calculateWater(index) {
    const instance = data.waterInstances[index];
    if (instance.waterType === '' || instance.waterDischargeSite === '' || instance.waterUnit === '' || instance.waterAmount === '') window.alert('Please fill out all the fields.');
    else {
      window.alert('Saved Successfully.')
      const updatedInstances = [...data.waterInstances];
      updatedInstances[index]['waterNet'] = (instance.waterAmount * emissionFactors.water[instance.waterType][instance.waterUnit]);
      data.setWaterInstances(updatedInstances);
    }
  }

  function calculateWaste(index) {
    const instance = data.wasteInstances[index];
    if (instance.wasteType === '' || instance.wasteTreatmentType === '' || instance.wasteUnit === '' || instance.wasteAmount === '') window.alert('Please fill out all the fields.');
    else {
      window.alert('Saved Sucessfully.');
      const updatedInstances = [...data.wasteInstances];
      updatedInstances[index]['wasteNet'] = (instance.wasteAmount * emissionFactors.waste[instance.wasteTreatmentType][instance.wasteType][instance.wasteUnit]);
      data.setWasteInstances(updatedInstances);
      console.log(updatedInstances[index]['wasteNet']);
    }
  }
  function calculateOffset(index) {
    const instance = data.offsetInstances[index];
    if (instance.offsetTrees === '' || instance.offsetGrass === '' || instance.offsetSoil === '' || instance.offsetWater === '') window.alert('Please fill all the fields (Enter 0 if data not available).');
    else {
      window.alert('Saved Sucessfully.');
      const updatedInstances = [...data.offsetInstances];
      updatedInstances[index]['offsetNet'] = (instance.offsetTrees * emissionFactors.offset.Trees + instance.offsetGrass * emissionFactors.offset['Grass Area'] + instance.offsetSoil * emissionFactors.offset['Soil Area'] + instance.offsetWater * emissionFactors.offset['Water Body']);
      data.setOffsetInstances(updatedInstances);
    }
  }

  function calculateTravel(index) {
    const instance = data.travelInstances[index];
    if (instance.travelType === '' || instance.travelDistance === '') window.alert('Please fill out all the fields.');
    else {
      if (instance.travelType === 'Airways') {
        if (instance.airFlightLength === '' || instance.travelDistance === '') window.alert('Please fill out all the fields.')
        else {
          window.alert('Saved Sucessfully.');
          const updatedInstances = [...data.travelInstances];
          updatedInstances[index]['travelNet'] = (instance.travelDistance * emissionFactors.travel[instance.travelType][instance.airFlightLength]);
          data.setTravelInstances(updatedInstances);
        }
      }
      else if (instance.travelType === 'Roadways') {
        if (instance.roadVehicleOwnership === '' || instance.roadVehicleType === '' || (instance.roadVehicleOwnership === 'Personal' && instance.roadFuelType === '')) window.alert('Please fill out all the fields.')
        else {
          window.alert('Saved Sucessfully.');
          const updatedInstances = [...data.travelInstances];
          updatedInstances[index]['travelNet'] = instance.roadVehicleOwnership === 'Personal' ? (instance.travelDistance * (instance.roadVehicleType !== 'Motorcycle' ? emissionFactors.travel[instance.travelType][instance.roadVehicleOwnership][instance.roadVehicleType][instance.roadFuelType] : emissionFactors.travel[instance.travelType][instance.roadVehicleOwnership][instance.roadVehicleType])) : (instance.travelDistance * emissionFactors.travel[instance.travelType][instance.roadVehicleOwnership][instance.roadVehicleType]);
          data.setTravelInstances(updatedInstances);
          console.log(updatedInstances[index]['wasteNet']);
          console.log(updatedInstances[index]['travelNet'])
        }
      }
      else {
        window.alert('Saved Sucessfully.');
      }

    }
  }

  const lastFossilInstance = data.fossilInstances[data.fossilInstances.length - 1];
  const lastElectricityInstance = data.electricityInstances[data.electricityInstances.length - 1];
  const lastWaterInstance = data.waterInstances[data.waterInstances.length - 1];
  const lastWasteInstance = data.wasteInstances[data.wasteInstances.length - 1];
  const lastTravelInstance = data.travelInstances[data.travelInstances.length - 1];
  const lastOffsetInstance = data.offsetInstances[data.offsetInstances.length - 1];

  return (
    loading ? <div><h1>Please Wait..</h1></div> :
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="calculatorDiv">
        <Tabs value={activeTab} onChange={(event, value) => { changeTab(value) }} >
          <TabList underlinePlacement="bottom">
            <div className="tabsDiv">
              <Tab disabled className="tabContent" value="Fossil Fuel" indicatorPlacement="bottom">
                <FontAwesomeIcon icon={faGasPump} />&nbsp;&nbsp;Fossil Fuel
              </Tab>
              <Tab disabled className="tabContent" value="Fugitive" indicatorPlacement="bottom">
                <img style={{ width: "25px", marginBottom: "0px" }} alt="acIcon" src={AC} />&nbsp;&nbsp;Fugitive
              </Tab>
              <Tab disabled className="tabContent" value="Electricity" indicatorPlacement="bottom">
                <FontAwesomeIcon icon={faBolt} />&nbsp;&nbsp;Electricity
              </Tab>
              <Tab disabled className="tabContent" value="Water" indicatorPlacement="bottom">
                <FontAwesomeIcon icon={faWater} />&nbsp;&nbsp; Water
              </Tab>
              <Tab disabled className="tabContent" value="Waste" indicatorPlacement="bottom">
                <FontAwesomeIcon icon={faTrash} />&nbsp;&nbsp; Waste
              </Tab>
              <Tab disabled className="tabContent" value="Travel" indicatorPlacement="bottom">
                <FontAwesomeIcon icon={faPlaneDeparture} />&nbsp;&nbsp; Travel
              </Tab>
              <Tab disabled className="tabContent" value="Offset" indicatorPlacement="bottom">
                <FontAwesomeIcon icon={faLeaf} />&nbsp;&nbsp; Offset
              </Tab>
            </div>

          </TabList>
          <TabPanel value="Fossil Fuel">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="formDiv">
              <form className="calcForm">
                <FacilityYearMonth lastInstance={lastFossilInstance} array={data.fossilInstances} setArray={data.setFossilInstances}></FacilityYearMonth>
                <div className="inputs">
                  <h3>Fuel Type: </h3>
                  <Select required value={lastFossilInstance.fuelType ? lastFossilInstance.fuelType : null} placeholder="Choose Fuel Type" onChange={(event, value) => { handleChange(data.fossilInstances, data.setFossilInstances, value, data.fossilInstances.length - 1, 'fuelType') }} className="Select">
                    <Option value="CNG">CNG</Option>
                    <Option value="Petrol/Gasoline">Petrol/Gasoline</Option>
                    <Option value="Diesel">Diesel</Option>
                    <Option value="PNG">PNG</Option>
                    <Option value="LPG">LPG</Option>
                  </Select>
                </div>

                <div className='inputs'><h3>Unit: </h3>
                  <Select required value={lastFossilInstance.fuelUnit ? lastFossilInstance.fuelUnit : null} onChange={(event, value) => { handleChange(data.fossilInstances, data.setFossilInstances, value, data.fossilInstances.length - 1, 'fuelUnit') }} className="Select" placeholder="Choose Unit">
                    <Option value="kg">kg</Option>
                    <Option value="tonne">tonne</Option>
                    {lastFossilInstance.fuelType === 'Diesel' || lastFossilInstance.fuelType === 'Petrol/Gasoline' ? <Option value="litre">litre</Option> : null}
                    {lastFossilInstance.fuelType === 'CNG' || lastFossilInstance.fuelType === 'PNG' ? <Option value="cubic metre">cubic metre</Option> : null}
                  </Select>
                </div>
                <div className='inputs'><h3>Amount Consumed: </h3>
                  <Input required type="number" value={lastFossilInstance.fuelAmount ? lastFossilInstance.fuelAmount : ''} onChange={(event) => { handleInput(data.fossilInstances, data.setFossilInstances, event.target.value, data.fossilInstances.length - 1, 'fuelAmount') }} className="Select" placeholder='Enter Amount' />
                </div>
              </form>
              <div id="submitDiv">
                <Button style={{ marginTop: '30px' }} onClick={() => calculateFuel(data.fossilInstances.length - 1)} id="getStarted">Save</Button>
                {lastFossilInstance.fuelNet !== '' ? <Button onClick={() => { data.setFossilInstances([...data.fossilInstances, data.initialFossilInstance]); window.scrollTo(0, 0) }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Add Another Instance</Button> : null}
                <Button onClick={() => { changeTab('Fugitive') }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Go to Next Tab</Button>
              </div>
            </motion.div>
          </TabPanel>

          <TabPanel value="Fugitive">
            <div id="submitDiv">
              <Button onClick={() => { changeTab('Fossil Fuel') }} style={{ marginTop: '30px' }} id="getStarted">Go to Previous Tab</Button>
              <Button style={{ marginTop: '30px' }} onClick={() => calculateFuel(data.fossilInstances.length - 1)} id="getStarted">Save</Button>
              {/* {lastInstance.fuelNet!==''?<Button onClick={() => {data.setFossilInstances([...data.fossilInstances, data.initialFossilInstance]);window.scrollTo(0,0)}} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Add Another Instance</Button>:null} */}
              <Button onClick={() => { changeTab('Electricity') }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Go to Next Tab</Button>
            </div>

          </TabPanel>

          <TabPanel value="Electricity">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="formDiv">
              <form className="calcForm">
                <FacilityYearMonth lastInstance={lastElectricityInstance} array={data.electricityInstances} setArray={data.setElectricityInstances}></FacilityYearMonth>
                <div className="inputs">
                  <h3>Electricity Type: </h3>
                  <Select value={lastElectricityInstance.electricityType ? lastElectricityInstance.electricityType : null} onChange={(event, value) => { handleChange(data.electricityInstances, data.setElectricityInstances, value, data.electricityInstances.length - 1, 'electricityType') }} className="Select" placeholder="Choose Electricity Type">
                    <Option value="Non-Renewable">Non-Renewable</Option>
                    <Option value="Renewable">Renewable</Option>
                  </Select>
                </div>
                <div className='inputs'>
                  <h3>Electricity Source: </h3>
                  <Select value={lastElectricityInstance.electricitySource ? lastElectricityInstance.electricitySource : null} className="Select" placeholder="Choose Electricity Source" onChange={(event, value) => { handleChange(data.electricityInstances, data.setElectricityInstances, value, data.electricityInstances.length - 1, 'electricitySource') }}>
                    <Option value="Purchased">Purchased</Option>
                    <Option value="Self-Produced">Self-Produced</Option>
                  </Select>
                </div>
                <div className='inputs'><h3>Unit: </h3>
                  <Select value={lastElectricityInstance.electricityUnit ? lastElectricityInstance.electricityUnit : null} onChange={(event, value) => { handleChange(data.electricityInstances, data.setElectricityInstances, value, data.electricityInstances.length - 1, 'electricityUnit') }} className="Select" placeholder="Choose Unit">
                    <Option value="kWH">kWH</Option>
                  </Select></div>
                <div className='inputs'><h3>Amount Consumed: </h3><Input type="number" value={lastElectricityInstance.electricityAmount ? lastElectricityInstance.electricityAmount : ''} onChange={(event) => { handleChange(data.electricityInstances, data.setElectricityInstances, event.target.value, data.electricityInstances.length - 1, 'electricityAmount') }} className="Select" placeholder='Enter Amount' /></div>
              </form>
              <div id="submitDiv">
                <Button onClick={() => { changeTab('Fugitive') }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Go to Previous Tab</Button>
                <Button style={{ marginTop: '30px' }} onClick={() => { calculateElectricity(data.electricityInstances.length - 1) }} id="getStarted">Save</Button>
                {lastElectricityInstance.electricityNet !== '' ? <Button onClick={() => { data.setElectricityInstances([...data.electricityInstances, data.initialElectricityInstance]); window.scrollTo(0, 0) }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Add Another Instance</Button> : null}
                <Button onClick={() => { changeTab('Water') }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Go to Next Tab</Button>
              </div>
            </motion.div>
          </TabPanel>

          <TabPanel value="Water">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="formDiv">
              <form className="calcForm">
                <FacilityYearMonth lastInstance={lastWaterInstance} array={data.waterInstances} setArray={data.setWaterInstances}></FacilityYearMonth>
                <div className="inputs">
                  <h3>Water Type: </h3>
                  <Select value={lastWaterInstance.waterType ? lastWaterInstance.waterType : null} onChange={(event, value) => { handleChange(data.waterInstances, data.setWaterInstances, value, data.waterInstances.length - 1, 'waterType') }} className="Select" placeholder="Choose Water Type">
                    <Option value="Supplied Water">Supplied Water</Option>
                    <Option value="Treated Water">Treated Water</Option>
                  </Select>
                </div>
                <div className='inputs'>
                  <h3>Discharge Site: </h3>
                  <Input value={lastWaterInstance.waterDischargeSite ? lastWaterInstance.waterDischargeSite : ''} onChange={(event) => { handleInput(data.waterInstances, data.setWaterInstances, event.target.value, data.waterInstances.length - 1, 'waterDischargeSite') }} className="Select" placeholder='Enter Discharge Site' />
                </div>
                <div className='inputs'><h3>Unit: </h3>
                  <Select value={lastWaterInstance.waterUnit ? lastWaterInstance.waterUnit : null} onChange={(event, value) => { handleChange(data.waterInstances, data.setWaterInstances, value, data.waterInstances.length - 1, 'waterUnit') }} className="Select" placeholder="Choose Unit">
                    <Option value="cubic metre">cubic metre</Option>
                    <Option value="million litres">million litres</Option>
                  </Select></div>
                <div className='inputs'><h3>Amount: </h3><Input type="number" value={lastWaterInstance.waterAmount ? lastWaterInstance.waterAmount : ''} onChange={(event) => { handleInput(data.waterInstances, data.setWaterInstances, event.target.value, data.waterInstances.length - 1, 'waterAmount') }} className="Select" placeholder='Enter Amount' /></div>
              </form>
              <div id="submitDiv">
                <Button onClick={() => { changeTab('Electricity') }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Go to Previous Tab</Button>
                <Button style={{ marginTop: '30px' }} onClick={() => calculateWater(data.waterInstances.length - 1)} id="getStarted">Save</Button>
                {lastWaterInstance.waterNet !== '' ? <Button onClick={() => { data.setWaterInstances([...data.waterInstances, data.initialWaterInstance]); window.scrollTo(0, 0) }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Add Another Instance</Button> : null}
                <Button onClick={() => { changeTab('Waste') }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Go to Next Tab</Button>
              </div>
            </motion.div>
          </TabPanel>

          <TabPanel value="Waste">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="formDiv">
              <form className="calcForm">
                <FacilityYearMonth lastInstance={lastWasteInstance} array={data.wasteInstances} setArray={data.setWasteInstances}></FacilityYearMonth>
                <div className='inputs'>
                  <h3>Waste Type: </h3>
                  <Select value={lastWasteInstance.wasteType ? lastWasteInstance.wasteType : null} onChange={(event, value) => { handleChange(data.wasteInstances, data.setWasteInstances, value, data.wasteInstances.length - 1, 'wasteType') }} className="Select" placeholder="Choose Waste Type">
                    <Option value="Household Residue">Household Residue</Option>
                    <Option value="Food and Drink Waste">Food and Drink Waste</Option>
                    <Option value="Garden Waste">Garden Waste</Option>
                    <Option value="Commercial and Industrial Waste">Commercial and Industrial Waste</Option>
                  </Select>
                </div>
                <div className="inputs">
                  <h3>Treatment Type: </h3>
                  <Select value={lastWasteInstance.wasteTreatmentType ? lastWasteInstance.wasteTreatmentType : null} onChange={(event, value) => { handleChange(data.wasteInstances, data.setWasteInstances, value, data.wasteInstances.length - 1, 'wasteTreatmentType') }} className="Select" placeholder="Choose Treatment Type">
                    <Option value="Landfills">Landfills</Option>
                    {lastWasteInstance.wasteType === 'Food and Drink Waste' || lastWasteInstance.wasteType === 'Garden Waste' ? <Option value="Composting">Composting</Option> : null}
                    <Option value="Combustion">Combustion</Option>
                    <Option value="Recycling">Recycling</Option>
                  </Select>
                </div>
                <div className='inputs'><h3>Unit: </h3>
                  <Select value={lastWasteInstance.wasteUnit ? lastWasteInstance.wasteUnit : null} onChange={(event, value) => { handleChange(data.wasteInstances, data.setWasteInstances, value, data.wasteInstances.length - 1, 'wasteUnit') }} className="Select" placeholder="Choose Unit">
                    <Option value="kg">kg</Option>
                    <Option value="tonne">tonne</Option>
                  </Select></div>
                <div className='inputs'><h3>Amount: </h3><Input type="number" value={lastWasteInstance.wasteAmount ? lastWasteInstance.wasteAmount : ''} onChange={(event) => { handleInput(data.wasteInstances, data.setWasteInstances, event.target.value, data.wasteInstances.length - 1, 'wasteAmount') }} className="Select" placeholder='Enter Amount' /></div>
              </form>
              <div id="submitDiv">
                <Button onClick={() => { changeTab('Water') }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Go to Previous Tab</Button>
                <Button style={{ marginTop: '30px' }} onClick={() => calculateWaste(data.wasteInstances.length - 1)} id="getStarted">Save</Button>
                {lastWasteInstance.wasteNet !== '' ? <Button onClick={() => { data.setWasteInstances([...data.wasteInstances, data.initialWasteInstance]); window.scrollTo(0, 0) }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Add Another Instance</Button> : null}
                <Button onClick={() => { changeTab('Travel') }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Go to Next Tab</Button>
              </div>
            </motion.div>
          </TabPanel>

          <TabPanel value="Travel">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="formDiv">
              <form className="calcForm">
                <FacilityYearMonth lastInstance={lastTravelInstance} array={data.travelInstances} setArray={data.setTravelInstances}></FacilityYearMonth>
                <div className='inputs'>
                  <h3>Mode of Transport: </h3>
                  <Select value={lastTravelInstance.travelType ? lastTravelInstance.travelType : null} onChange={(event, value) => { handleChange(data.travelInstances, data.setTravelInstances, value, data.travelInstances.length - 1, 'travelType') }} className="Select" placeholder="Choose Mode of Transport">
                    <Option value="Airways">Airways</Option>
                    <Option value="Roadways">Roadways</Option>
                    <Option value="Railways">Railways</Option>
                  </Select>
                </div>
                {lastTravelInstance.travelType === 'Airways' ?
                  <div className='inputs'>
                    <h3>Flight Length: </h3>
                    <Select value={lastTravelInstance.airFlightLength ? lastTravelInstance.airFlightLength : null} onChange={(event, value) => { handleChange(data.travelInstances, data.setTravelInstances, value, data.travelInstances.length - 1, 'airFlightLength') }} className="Select" placeholder="Choose Flight Length">
                      <Option value="Domestic">Domestic</Option>
                      <Option value="Short Haul">Short Haul</Option>
                      <Option value="Long Haul">Long Haul</Option>
                      <Option value="International">International</Option>
                    </Select>
                  </div>
                  : null}
                {lastTravelInstance.travelType === 'Roadways' ?
                  <div className='inputs'>
                    <h3>Vehicle Ownership: </h3>
                    <Select value={lastTravelInstance.roadVehicleOwnership ? lastTravelInstance.roadVehicleOwnership : null} onChange={(event, value) => { handleChange(data.travelInstances, data.setTravelInstances, value, data.travelInstances.length - 1, 'roadVehicleOwnership') }} className="Select" placeholder="Choose Vehicle Ownership">
                      <Option value="Personal">Personal</Option>
                      <Option value="Public">Public</Option>
                    </Select>
                  </div>
                  : null}
                {lastTravelInstance.travelType === 'Roadways' && lastTravelInstance.roadVehicleOwnership === 'Personal' ?
                  <div className='inputs'>
                    <h3>Vehicle Type: </h3>
                    <Select value={lastTravelInstance.roadVehicleType ? lastTravelInstance.roadVehicleType : null} onChange={(event, value) => { handleChange(data.travelInstances, data.setTravelInstances, value, data.travelInstances.length - 1, 'roadVehicleType') }} className="Select" placeholder="Choose Vehicle Type">
                      <Option value="Small Sized Car">Small Sized Car</Option>
                      <Option value="Medium Sized Car">Medium Sized Car</Option>
                      <Option value="Large Sized Car">Large Sized Car</Option>
                      <Option value="Motorcycle">Motorcycle</Option>
                    </Select>
                  </div>
                  : null}
                {lastTravelInstance.travelType === 'Roadways' && lastTravelInstance.roadVehicleOwnership === 'Public' ?
                  <div className='inputs'>
                    <h3>Vehicle Type: </h3>
                    <Select value={lastTravelInstance.roadVehicleType ? lastTravelInstance.roadVehicleType : null} onChange={(event, value) => { handleChange(data.travelInstances, data.setTravelInstances, value, data.travelInstances.length - 1, 'roadVehicleType') }} className="Select" placeholder="Choose Vehicle Type">
                      <Option value="Bus">Bus</Option>
                      <Option value="Taxi">Taxi</Option>
                    </Select>
                  </div> : null}{
                  lastTravelInstance.travelType === 'Roadways' && lastTravelInstance.roadVehicleOwnership === 'Personal' && lastTravelInstance.roadVehicleType !== 'Motorcycle' ?
                    <div className='inputs'>
                      <h3>Fuel Type: </h3>
                      <Select value={lastTravelInstance.roadFuelType ? lastTravelInstance.roadFuelType : null} onChange={(event, value) => { handleChange(data.travelInstances, data.setTravelInstances, value, data.travelInstances.length - 1, 'roadFuelType') }} className="Select" placeholder="Choose Fuel Type">
                        {lastTravelInstance.roadVehicleType !== 'Small Sized Car' ? <Option value="CNG">CNG</Option> : null}
                        <Option value="Petrol/Gasoline">Petrol/Gasoline</Option>
                        <Option value="Diesel">Diesel</Option>
                        <Option value="Electric">Electric</Option>
                      </Select>
                    </div> : null
                }
                <div className="inputs">
                  <h3>Distance Travelled(KM) : </h3>
                  <Input type="number" value={lastTravelInstance.travelDistance ? lastTravelInstance.travelDistance : ''} onChange={(event) => { handleInput(data.travelInstances, data.setTravelInstances, event.target.value, data.travelInstances.length - 1, 'travelDistance') }} className="Select" placeholder='Enter Approximate Distance' />
                </div>
              </form>
              <div id="submitDiv">
                <Button onClick={() => { changeTab('Waste') }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Go to Previous Tab</Button>
                <Button style={{ marginTop: '30px' }} onClick={() => calculateTravel(data.travelInstances.length - 1)} id="getStarted">Save</Button>
                {lastTravelInstance.travelNet !== '' ? <Button onClick={() => { data.setTravelInstances([...data.travelInstances, data.initialTravelInstance]); window.scrollTo(0, 0) }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Add Another Instance</Button> : null}
                <Button onClick={() => { changeTab('Offset') }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Go to Next Tab</Button>
              </div>
            </motion.div>
          </TabPanel>

          <TabPanel value="Offset">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="formDiv">
              <form className="calcForm">
                <FacilityYearMonth lastInstance={lastOffsetInstance} array={data.offsetInstances} setArray={data.setOffsetInstances}></FacilityYearMonth>
                <div className='inputs'>
                  <h3>Number of Trees in the Facility: </h3>
                  <Input type="number" value={lastOffsetInstance.offsetTrees ? lastOffsetInstance.offsetTrees : ''} onChange={(event) => { handleInput(data.offsetInstances, data.setOffsetInstances, event.target.value, data.offsetInstances.length - 1, 'offsetTrees') }} className="Select" placeholder='Enter Approximate Number' />
                </div>
                <div className="inputs">
                  <h3>Area Covered Under Soil : </h3>
                  <Input type="number" value={lastOffsetInstance.offsetSoil ? lastOffsetInstance.offsetSoil : ''} onChange={(event) => { handleInput(data.offsetInstances, data.setOffsetInstances, event.target.value, data.offsetInstances.length - 1, 'offsetSoil') }} className="Select" placeholder='Enter Approximate Area' />
                </div>
                <div className="inputs">
                  <h3>Area Covered Under Grass : </h3>
                  <Input type="number" value={lastOffsetInstance.offsetGrass ? lastOffsetInstance.offsetGrass : ''} onChange={(event) => { handleInput(data.offsetInstances, data.setOffsetInstances, event.target.value, data.offsetInstances.length - 1, 'offsetGrass') }} className="Select" placeholder='Enter Approximate Area' />
                </div>
                <div className="inputs">
                  <h3>Area Covered Under Water : </h3>
                  <Input type="number" value={lastOffsetInstance.offsetWater ? lastOffsetInstance.offsetWater : ''} onChange={(event) => { handleInput(data.offsetInstances, data.setOffsetInstances, event.target.value, data.offsetInstances.length - 1, 'offsetWater') }} className="Select" placeholder='Enter Approximate Area' />
                </div>
              </form>
              <div id="submitDiv">
                <Button onClick={() => { changeTab('Travel') }} style={{ marginTop: '30px' }} id="getStarted">Go to Previous Tab</Button>
                <Button style={{ marginTop: '30px' }} onClick={() => calculateOffset(data.offsetInstances.length - 1)} id="getStarted">Save</Button>
                {lastOffsetInstance.offsetNet !== '' ? <Button onClick={() => { data.setOffsetInstances([...data.offsetInstances, data.initialOffsetInstance]); window.scrollTo(0, 0) }} style={{ margin: '0', marginTop: '30px' }} id="getStarted">Add Another Instance</Button> : null}
                <Button style={{ marginTop: '30px' }} onClick={showResults} id="getStarted">Finalise and Show Results</Button>
              </div>
            </motion.div>
          </TabPanel>
        </Tabs>
      </motion.div>
  );
}
