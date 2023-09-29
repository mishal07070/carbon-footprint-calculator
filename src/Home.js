import React from "react";
import { motion } from "framer-motion"
import Button from '@mui/joy/Button';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ExcelJS from 'exceljs';
import emissionFactors from './emissionFactors.json';
import { styled } from '@mui/joy';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from "react";
import iitklogo from "./iitklogo.png"
import ckclogo from "./ckclogo.png"

const VisuallyHiddenInput = styled('input')`clip: rect(0 0 0 0); clip-path: inset(50%); height: 1px; overflow: hidden; position: absolute; bottom: 0; left: 0; white-space: nowrap; width: 1px;`;

export default function Home(data) {
  async function processFossilSheet(workbook) {
    const fossil = workbook.getWorksheet('Fossil Fuel');
    const newFossilInstances = [];
    fossil.eachRow((row, rowNumber) => {
      if (rowNumber >= 8) {
        const newInstance = { ...data.initialFossilInstance };
        newInstance.facilityName = fossil.getCell(`B${rowNumber}`).value;
        newInstance.year = fossil.getCell(`C${rowNumber}`).value;
        newInstance.month = fossil.getCell(`D${rowNumber}`).value;
        newInstance.fuelType = fossil.getCell(`E${rowNumber}`).value;
        newInstance.fuelUnit = fossil.getCell(`F${rowNumber}`).value;
        newInstance.fuelAmount = fossil.getCell(`G${rowNumber}`).value;
        if (newInstance.fuelType === null || newInstance.fuelUnit === null || newInstance.fuelAmount === null) {
          throw new Error('Data is inconsistent with the template requirements.');
        }
        else {
          newInstance.fuelNet = (newInstance.fuelAmount * emissionFactors.fuels[newInstance.fuelType][newInstance.fuelUnit]);
        }
        newFossilInstances.push(newInstance);
      }
    });
    data.setFossilInstances([...data.fossilInstances, ...newFossilInstances]);
  }

  async function processElectricitySheet(workbook) {
    const electricity = workbook.getWorksheet('Electricity');
    const newElectricityInstances = [];
    electricity.eachRow((row, rowNumber) => {
      if (rowNumber >= 7) {
        const newInstance = { ...data.initialElectricityInstance };
        newInstance.facilityName = electricity.getCell(`B${rowNumber}`).value;
        newInstance.year = electricity.getCell(`C${rowNumber}`).value;
        newInstance.month = electricity.getCell(`D${rowNumber}`).value;
        newInstance.electricityType = electricity.getCell(`E${rowNumber}`).value;
        newInstance.electricitySource = electricity.getCell(`F${rowNumber}`).value;
        newInstance.electricityUnit = electricity.getCell(`G${rowNumber}`).value;
        newInstance.electricityAmount = electricity.getCell(`H${rowNumber}`).value;
        if (newInstance.electricityType === null || newInstance.electricitySource === null || (newInstance.electricityUnit === null) || newInstance.electricityAmount === null) {
          throw new Error('Data is inconsistent with the template requirements.');
        }
        else {
          newInstance.electricityNet = (newInstance.electricityAmount * parseFloat(emissionFactors.electricity[newInstance.electricityType]));
        }
        newElectricityInstances.push(newInstance);
      }
    });
    data.setElectricityInstances([...data.electricityInstances, ...newElectricityInstances]);
  }

  async function processWaterSheet(workbook) {
    const water = workbook.getWorksheet('Water');
    const newWaterInstances = [];
    water.eachRow((row, rowNumber) => {
      if (rowNumber >= 8) {
        const newInstance = { ...data.initialWaterInstance };
        newInstance.facilityName = water.getCell(`B${rowNumber}`).value;
        newInstance.year = water.getCell(`C${rowNumber}`).value;
        newInstance.month = water.getCell(`D${rowNumber}`).value;
        newInstance.waterType = water.getCell(`E${rowNumber}`).value;
        newInstance.waterDischargeSite = water.getCell(`F${rowNumber}`).value;
        newInstance.waterUnit = water.getCell(`G${rowNumber}`).value;
        newInstance.waterAmount = water.getCell(`H${rowNumber}`).value;
        if (newInstance.waterType === null || newInstance.waterDischargeSite === null || (newInstance.waterUnit === null) || newInstance.waterAmount === null) {
          throw new Error('Data is inconsistent with the template requirements.');
        }
        else {
          newInstance.waterNet = (newInstance.waterAmount * emissionFactors.water[newInstance.waterType][newInstance.waterUnit]);
        }
        newWaterInstances.push(newInstance);
      }
    });
    data.setWaterInstances([...data.waterInstances, ...newWaterInstances]);
  }

  async function processWasteSheet(workbook) {
    const waste = workbook.getWorksheet('Waste');
    const newWasteInstances = [];
    waste.eachRow((row, rowNumber) => {
      if (rowNumber >= 8) {
        const newInstance = { ...data.initialWasteInstance };
        newInstance.facilityName = waste.getCell(`B${rowNumber}`).value;
        newInstance.year = waste.getCell(`C${rowNumber}`).value;
        newInstance.month = waste.getCell(`D${rowNumber}`).value;
        newInstance.wasteType = waste.getCell(`E${rowNumber}`).value;
        newInstance.wasteTreatmentType = waste.getCell(`F${rowNumber}`).value;
        newInstance.wasteUnit = waste.getCell(`G${rowNumber}`).value;
        newInstance.wasteAmount = waste.getCell(`H${rowNumber}`).value;
        if (newInstance.wasteType === null || newInstance.wasteTreatmentType === null || (newInstance.wasteUnit === null) || newInstance.wasteAmount === null) {
          throw new Error('Data is inconsistent with the template requirements.');
        }
        else {
          newInstance.wasteNet = (newInstance.wasteAmount * emissionFactors.waste[newInstance.wasteTreatmentType][newInstance.wasteType][newInstance.wasteUnit]);
        }
        console.log(newInstance)
        newWasteInstances.push(newInstance);
      }
    });
    data.setWasteInstances([...data.wasteInstances, ...newWasteInstances]);
  }

  async function processTravelSheet(workbook) {
    const travel = workbook.getWorksheet('Travel');
    const newTravelInstances = [];
    travel.eachRow((row, rowNumber) => {
      if (rowNumber >= 8) {
        const newInstance = { ...data.initialTravelInstance };
        newInstance.facilityName = travel.getCell(`B${rowNumber}`).value;
        newInstance.year = travel.getCell(`C${rowNumber}`).value;
        newInstance.month = travel.getCell(`D${rowNumber}`).value;
        newInstance.travelType = travel.getCell(`E${rowNumber}`).value;
        newInstance.airFlightLength = travel.getCell(`F${rowNumber}`).value;
        newInstance.roadVehicleOwnership = travel.getCell(`G${rowNumber}`).value;
        newInstance.roadVehicleType = travel.getCell(`H${rowNumber}`).value;
        newInstance.roadFuelType = travel.getCell(`I${rowNumber}`).value;
        newInstance.travelDistance = travel.getCell(`J${rowNumber}`).value;

        if (newInstance.travelType === null || newInstance.travelDistance === null) throw new Error('Data is inconsistent with the template requirements.');
        else {
          if (newInstance.travelType === 'Airways') {
            if (newInstance.airFlightLength === null || newInstance.travelDistance === null) throw new Error('Data is inconsistent with the template requirements.');
            else {
              newInstance.travelNet = (newInstance.travelDistance * emissionFactors.travel[newInstance.travelType][newInstance.airFlightLength]);
            }
          }
          else if (newInstance.travelType === 'Roadways') {
            if (newInstance.roadVehicleOwnership === null || newInstance.roadVehicleType === null || (newInstance.roadVehicleOwnership === 'Personal' && newInstance.roadFuelType === '')) throw new Error('Data is inconsistent with the template requirements.');
            else {
              newInstance.travelNet = newInstance.roadVehicleOwnership === 'Personal' ? (newInstance.travelDistance * (newInstance.roadVehicleType !== 'Motorcycle' ? emissionFactors.travel[newInstance.travelType][newInstance.roadVehicleOwnership][newInstance.roadVehicleType][newInstance.roadFuelType] : emissionFactors.travel[newInstance.travelType][newInstance.roadVehicleOwnership][newInstance.roadVehicleType])) : (newInstance.travelDistance * emissionFactors.travel[newInstance.travelType][newInstance.roadVehicleOwnership][newInstance.roadVehicleType]);
            }
          }
        }
        newTravelInstances.push(newInstance);
        console.log(newInstance)
      }
    });
    data.setTravelInstances([...data.travelInstances, ...newTravelInstances]);
  }

  async function processOffsetSheet(workbook) {
    const offset = workbook.getWorksheet('Offset');
    const newOffsetInstances = [];
    offset.eachRow((row, rowNumber) => {
      if (rowNumber >= 8) {
        const newInstance = { ...data.initialOffsetInstance };
        newInstance.facilityName = offset.getCell(`B${rowNumber}`).value;
        newInstance.year = offset.getCell(`C${rowNumber}`).value;
        newInstance.month = offset.getCell(`D${rowNumber}`).value;
        newInstance.offsetTrees = offset.getCell(`E${rowNumber}`).value;
        newInstance.offsetSoil = offset.getCell(`F${rowNumber}`).value;
        newInstance.offsetGrass = offset.getCell(`G${rowNumber}`).value;
        newInstance.offsetWater = offset.getCell(`H${rowNumber}`).value;
        if (newInstance.offsetTrees === null || newInstance.offsetSoil === null || (newInstance.offsetGrass === null) || newInstance.offsetWater === null) {
          throw new Error('Data is inconsistent with the template requirements.');
        }
        else {
          newInstance.offsetNet = (newInstance.offsetTrees * emissionFactors.offset.Trees + newInstance.offsetGrass * emissionFactors.offset['Grass Area'] + newInstance.offsetSoil * emissionFactors.offset['Soil Area'] + newInstance.offsetWater * emissionFactors.offset['Water Body']);
        }
        newOffsetInstances.push(newInstance);
        console.log(newInstance);
      }
    });
    data.setOffsetInstances([...data.offsetInstances, ...newOffsetInstances]);
  }



  useEffect(() => {
    window.scrollTo(0, 0);
    data.setFossilInstances([]);
    data.setElectricityInstances([]);
    data.setWaterInstances([]);
    data.setWasteInstances([]);
    data.setTravelInstances([]);
    data.setOffsetInstances([]);
    data.setResult(0);
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const [processedFile, setProcessedFile] = useState(null);
  const [calculating, setCalculating] = useState(false);
  const [err, setErr] = useState(null);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setProcessedFile(null);
  };

  const handleProcessFile = async () => {
    setCalculating(true);
    if (selectedFile) {
      try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(selectedFile);

        await processFossilSheet(workbook);
        await processElectricitySheet(workbook);
        await processWaterSheet(workbook);
        await processWasteSheet(workbook);
        await processTravelSheet(workbook);
        await processOffsetSheet(workbook);;

        window.alert('Calculations Completed Sucessfully.');
        setErr(null);

      } catch (error) {
        console.error('Error processing the Excel file. ', error);
        window.alert('Error processing the Excel file. ' + error);
        setErr(1);
      }
      finally {
        setProcessedFile(1);
        setCalculating(false);
      }
    } else {
      alert('Please select an Excel file first.');
    }
  };

  function showResult(id) {
    navigate("/Result", { state: id });
    window.scrollTo(0, 0);
  }


  const navigate = useNavigate();

  function transferToCalculator() {
    navigate("/Calculator");
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="main">
      <div className="header">
        <div className="landingText">
          <h1><b>Calculate your Carbon Footprint</b></h1>
          <h3 id="homeText">Get to know your Carbon Footprint using our Calculator</h3>
        </div>
        <div className="logos">
          <img className="headerImg" src={ckclogo} alt="ckcLogo"></img>
          <img className="headerImg" src={iitklogo} alt="iitkLogo"></img>
        </div>
      </div>
      <div className="homeOptions">
        <div className="calculateByForm">
          <h2 style={{ textAlign: 'center' }}><b><FontAwesomeIcon icon={faPencil} />&nbsp;&nbsp;Fill out a Form</b></h2>
          <Button onClick={transferToCalculator} id="getStarted">Get Started</Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}><h2><b>OR</b></h2></div>
        <div className="calculateByUpload">
          <h2 style={{ textAlign: 'center' }}><b><FontAwesomeIcon icon={faFileExcel} />&nbsp;&nbsp;Upload an Excel Sheet</b></h2>
          {selectedFile ? <Button onChange={handleFileUpload} component="label" role={undefined} tabIndex={-1} id="getStarted"> Upload a different file <VisuallyHiddenInput type="file" /></Button>
            : <Button onChange={handleFileUpload} component="label" role={undefined} tabIndex={-1} id="getStarted"> Upload file <VisuallyHiddenInput type="file" /></Button>}
          {selectedFile && <p style={{ marginTop: '0px', marginBottom: "-15px" }}>Uploaded File: {selectedFile.name}</p>}
          {selectedFile && (!calculating ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Button id="getStarted" onClick={handleProcessFile}>Calculate</Button></motion.div> : <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Button id="getStarted" onClick={handleProcessFile}>Calculating...</Button></motion.div>)}
          {(processedFile && !err) && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Button onClick={() => showResult(2)} id="getStarted">Show Results</Button></motion.div>}
          <Button id="getStarted"><a id="homeDownloadLink" href="/template.xlsx" download>Download Input Excel Template</a></Button>
        </div>
      </div>
    </motion.div>
  );
}
