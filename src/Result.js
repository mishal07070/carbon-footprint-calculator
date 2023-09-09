import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { motion } from "framer-motion"

export default function Result(props){
    console.log(props)
    console.log(props.fuelNet+props.electricityNet+props.waterNet);
    const componentWise={
        labels:['Fossil Fuels', 'Electricity', 'Water'],
        datasets:[
            {
                data:[props.fuelNet,props.electricityNet,props.waterNet],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                borderWidth: 1,
            },
        ],
    };
    const scopeWise={
        labels:['Scope 1', 'Scope 2', 'Scope 3'],
        datasets:[
            {
                data:[props.fuelNet,props.electricityNet,props.waterNet],
                backgroundColor: ['#FF8966', '#2A2B2A',"#E5446D"],
                hoverBackgroundColor: ['#FF8966', '#2A2B2A','#E5446D'],
                borderWidth: 1,
            }
        ]
    }
    const options={
        cutout : '70%',
    }

    return ( 
        <motion.div initial={{opacity:0}} animate={{ opacity:1 }} transition={{duration:0.8}} className='result'>
            <h1><b>Results</b></h1>
            <h2 style={{marginTop:"30px", textAlign:"center"}}>Your Carbon Footprint : {(props.fuelNet+props.electricityNet+props.waterNet).toFixed(2)} kgs of CO2</h2>
            <div className='charts'>
                <div className='chart'>
                    <Doughnut data={componentWise} options={options}/>
                </div>
                <div className='chart'>
                    <Doughnut data={scopeWise} options={options}/>
                </div>
            </div>
        </motion.div>
     );
}
 
