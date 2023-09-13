import React from "react";
import carbonFootprint from "./carbonFootprint.png"
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

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function Home(data){
  useEffect(() => {
    window.scrollTo(0,0);
    data.setElectricityInstances([]);
    data.setFossilInstances([]);
    data.setWaterInstances([]);
    data.setResult(0);
    data.setFormInstances([data.initialInstance]);
  },[]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [processedFile, setProcessedFile] = useState(null);
  const [calculating, setCalculating] = useState(false);
  const [err,setErr]=useState(null);
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
        const fossil = workbook.getWorksheet(1);
        const electricity = workbook.getWorksheet(3);
        const water = workbook.getWorksheet(4);

        const newFossilInstances = []; 
        const newElectricityInstances = []; 
        const newWaterInstances = []; 
        fossil.eachRow((row, rowNumber) => {
          if(rowNumber>=8){
            const newInstance = {
              'facilityName':'',
              'year': '',
              'month': '',
              'fuelType': '',
              'combustion': '',
              'vehicle': '',
              'fuelUnit': '',
              'fuelAmount': '',
              'fuelNet':'',
              };
            newInstance.facilityName = fossil.getCell(`B${rowNumber}`).value;
            newInstance.year = fossil.getCell(`C${rowNumber}`).value;
            newInstance.month = fossil.getCell(`D${rowNumber}`).value;
            newInstance.combustion = fossil.getCell(`E${rowNumber}`).value;
            newInstance.fuelType = fossil.getCell(`F${rowNumber}`).value;
            newInstance.vehicle = fossil.getCell(`H${rowNumber}`).value;
            newInstance.fuelUnit = fossil.getCell(`I${rowNumber}`).value;
            newInstance.fuelAmount = fossil.getCell(`J${rowNumber}`).value;
            if(newInstance.combustion===null||newInstance.fuelType===null||(newInstance.vehicle===null&&newInstance.fuelUnit===null)||newInstance.fuelAmount===null){
              throw new Error('Data is inconsistent with the template requirements.');
            }
            else{
              newInstance.fuelNet=(newInstance.combustion==='Mobile Combustion'?newInstance.fuelAmount*emissionFactors.fuels[newInstance.fuelType][newInstance.vehicle]:newInstance.fuelAmount*emissionFactors.fuels[newInstance.fuelType][newInstance.fuelUnit]);
            }
            newFossilInstances.push(newInstance); 
          }
        });
        electricity.eachRow((row, rowNumber) => {
          if(rowNumber>=7){
            const newInstance = {
              'facilityName':'',
              'year': '',
              'month': '',
              'electricityType': '',
              'electricitySource': '',
              'electricityUnit': '',
              'electricityAmount': '',
              'electricityNet':''
            };
            newInstance.facilityName = electricity.getCell(`B${rowNumber}`).value;
            newInstance.year = electricity.getCell(`C${rowNumber}`).value;
            newInstance.month = electricity.getCell(`D${rowNumber}`).value;
            newInstance.electricityType = electricity.getCell(`E${rowNumber}`).value;
            newInstance.electricitySource = electricity.getCell(`F${rowNumber}`).value;
            newInstance.electricityUnit = electricity.getCell(`G${rowNumber}`).value;
            newInstance.electricityAmount = electricity.getCell(`H${rowNumber}`).value;
            if(newInstance.electricityType===null||newInstance.electricitySource===null||(newInstance.electricityUnit===null)||newInstance.electricityAmount===null){
              throw new Error('Data is inconsistent with the template requirements.');
            }
            else{
              newInstance.electricityNet=(newInstance.electricityAmount*parseFloat(emissionFactors.electricity[newInstance.electricityType]));
            }
            newElectricityInstances.push(newInstance); 
          }
        });

        water.eachRow((row, rowNumber) => {
          if(rowNumber>=8){
            const newInstance = {
              'facilityName':'',
              'year': '',
              'month': '',
              'waterType': '',
              'waterDischargeSite': '',
              'waterUnit': '',
              'waterAmount': '',
              'waterNet':''
            };
            newInstance.facilityName = water.getCell(`B${rowNumber}`).value;
            newInstance.year = water.getCell(`C${rowNumber}`).value;
            newInstance.month = water.getCell(`D${rowNumber}`).value;
            newInstance.waterType = water.getCell(`E${rowNumber}`).value;
            newInstance.waterDischargeSite = water.getCell(`F${rowNumber}`).value;
            newInstance.waterUnit = water.getCell(`G${rowNumber}`).value;
            newInstance.waterAmount = water.getCell(`H${rowNumber}`).value;
            if(newInstance.waterType===null||newInstance.waterDischargeSite===null||(newInstance.waterUnit===null)||newInstance.waterAmount===null){
              throw new Error('Data is inconsistent with the template requirements.');
            }
            else{
              newInstance.waterNet=(newInstance.waterAmount*emissionFactors.water[newInstance.waterType][newInstance.waterUnit]);
            }
            newWaterInstances.push(newInstance); 
          }
        });
        data.setFossilInstances([...data.fossilInstances, ...newFossilInstances]);
        data.setElectricityInstances([...data.electricityInstances, ...newElectricityInstances]);
        data.setWaterInstances([...data.waterInstances, ...newWaterInstances]);
        window.alert('Calculations Completed Sucessfully.');
        setErr(null);

      } catch (error) {
        console.error('Error processing the Excel file. ', error);
        window.alert('Error processing the Excel file. '+ error);
        setErr(1);
      }
    } else {
      alert('Please select an Excel file first.');
    }
    setProcessedFile(1);
    setCalculating(false);
  };

  function showResult(id){
    navigate("/Result",{state:id});
  }


  const navigate=useNavigate();
  
  function transferToCalculator(){
    navigate("/Calculator");
  }
  
  return (
    <motion.div initial={{opacity:0}} animate={{ opacity:1 }} transition={{duration:0.8}}className="main">
      <div className="header">
        <img className="headerImg" src={carbonFootprint} alt="carbonFootprint"></img>
        <div className="landingText">
          <h1><b>Carbon Footprint Calculator</b></h1>
          <h3 id="homeText">Seamlessly calculate your Carbon Footprint</h3>
        </div>
        </div>
        <div className="homeOptions">
          <div className="calculateByForm">
            <h2 style={{textAlign:'center'}}><b><FontAwesomeIcon icon={faPencil} />&nbsp;&nbsp;Fill out a Form</b></h2>
            <Button onClick={transferToCalculator} id="getStarted">Get Started</Button>
          </div>
          <div style={{display:'flex',alignItems:'center'}}><h2><b>OR</b></h2></div>
          {/* <div className="vl"></div> */}
        <div className="calculateByUpload">
            <h2 style={{textAlign:'center'}}><b><FontAwesomeIcon icon={faFileExcel} />&nbsp;&nbsp;Upload an Excel Sheet</b></h2>
          {selectedFile?<Button onChange={handleFileUpload} component="label" role={undefined} tabIndex={-1} id="getStarted"> Upload a different file <VisuallyHiddenInput type="file" /></Button>
          :<Button onChange={handleFileUpload} component="label" role={undefined} tabIndex={-1} id="getStarted"> Upload file <VisuallyHiddenInput type="file" /></Button>}
          {selectedFile && <p style={{marginTop:'0px',marginBottom:"-15px"}}>Uploaded File: {selectedFile.name}</p>}
          {selectedFile&&(!calculating? <motion.div initial={{opacity:0}} animate={{ opacity:1 }}><Button id="getStarted" onClick={handleProcessFile}>Calculate</Button></motion.div>:<motion.div initial={{opacity:0}} animate={{ opacity:1 }}><Button id="getStarted" onClick={handleProcessFile}>Calculating...</Button></motion.div>)}
          {(processedFile&&!err)&&<motion.div initial={{opacity:0}} animate={{ opacity:1 }}><Button onClick={()=>showResult(2)} id="getStarted">Show Results</Button></motion.div>}
          <Button onClick={()=>{
          }} id="getStarted"><a id="homeDownloadLink" href="/template.xlsx" download>Download Input Excel Template</a></Button>
          </div>
        </div>
    </motion.div>
  );
}
