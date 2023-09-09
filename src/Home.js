import React from "react";
import carbonFootprint from "./carbonFootprint.png"
import { motion } from "framer-motion"
import Button from '@mui/joy/Button';
import { useNavigate } from "react-router-dom";

export default function App() {
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
          <h3>Calculate your Carbon Footprint by filling out a form</h3>
        </div>
          <Button onClick={transferToCalculator} id="getStarted">Get Started</Button>
      </div>
    </motion.div>
  );
}
