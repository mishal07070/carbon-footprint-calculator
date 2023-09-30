import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { motion } from "framer-motion"

export default function Result(props) {
    const monthMapping = {
        'January': 1,
        'February': 2,
        'March': 3,
        'April': 4,
        'May': 5,
        'June': 6,
        'July': 7,
        'August': 8,
        'September': 9,
        'October': 10,
        'November': 11,
        'December': 12,
    }
    const fossilInstances = props.fossilInstances;
    const electricityInstances = props.electricityInstances;
    const waterInstances = props.waterInstances;
    const wasteInstances = props.wasteInstances;
    const travelInstances = props.travelInstances;
    const offsetInstances = props.offsetInstances;

    const componentWise = {
        labels: ['Fossil Fuels', 'Electricity', 'Water', 'Waste', 'Travel'],
        datasets: [
            {
                data: [0, 0, 0, 0, 0],
                backgroundColor: ['#FFE45E', '#345995', '#03CEA4', "#FB4D3D", "#CA1551"],
                hoverBackgroundColor: ['#FFE45E', '#345995', '#03CEA4', "#FB4D3D", "#CA1551"],
                borderWidth: 1,
            },
        ],
    };
    const scopeWise = {
        labels: ['Scope 1', 'Scope 2', 'Scope 3'],
        datasets: [
            {
                data: [0, 0, 0],
                backgroundColor: ['#B8C5D6', '#7FC8F8', "#2F4858"],
                hoverBackgroundColor: ['#B8C5D6', '#7FC8F8', '#2F4858'],
                borderWidth: 1,
            }
        ]
    }
    const monthWise = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Total Emission in Kgs of CO2',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                borderColor: 'rgba(116, 23, 222, 1)',
                backgroundColor: 'rgba(116, 23, 222, 0.3)'
            },
        ],
    };
    const facilityWise = {
        labels: [],
        datasets: [
            {
                label: 'Total Emission in Kgs of CO2',
                data: [],
                backgroundColor: 'rgba(226, 204, 0,0.5)',
                borderColor: 'rgba(190, 171, 2)',
                borderWidth: 3,
            }
        ]
    }

    let totalEmission = 0;
    let totalOffset = 0;


    fossilInstances.forEach((fossilInstance) => {
        if (fossilInstance.fuelNet !== '' || fossilInstance.fuelNet !== null) {

            totalEmission = parseFloat(totalEmission) + parseFloat(fossilInstance.fuelNet);

            componentWise.datasets[0].data[0] += fossilInstance.fuelNet;
            scopeWise.datasets[0].data[0] += fossilInstance.fuelNet;

            if (fossilInstance.month !== null) {
                monthWise.datasets[0].data[monthMapping[fossilInstance.month] - 1] += parseFloat(fossilInstance.fuelNet);
            }

            const idx = facilityWise.labels.indexOf(fossilInstance.facilityName);
            if (idx === -1) {
                facilityWise.labels.push(fossilInstance.facilityName);
                facilityWise.datasets[0].data.push(parseFloat(fossilInstance.fuelNet));
            }
            else {
                facilityWise.datasets[0].data[idx] += parseFloat(fossilInstance.fuelNet);
            }
        }
    });

    electricityInstances.forEach((electricityInstance) => {
        if (electricityInstance.electricityNet !== '' && electricityInstance.electricityNet !== null) {
            totalEmission = parseFloat(totalEmission) + parseFloat(electricityInstance.electricityNet);

            componentWise.datasets[0].data[1] += electricityInstance.electricityNet;
            scopeWise.datasets[0].data[1] += electricityInstance.electricityNet;

            if (electricityInstance.month !== null) {
                monthWise.datasets[0].data[monthMapping[electricityInstance.month] - 1] += parseFloat(electricityInstance.electricityNet);
            }

            const idx = facilityWise.labels.indexOf(electricityInstance.facilityName);
            if (idx === -1) {
                facilityWise.labels.push(electricityInstance.facilityName);
                facilityWise.datasets[0].data.push(parseFloat(electricityInstance.electricityNet));
            }
            else {
                facilityWise.datasets[0].data[idx] += parseFloat(electricityInstance.electricityNet);
            }
        }
    });

    waterInstances.forEach((waterInstance) => {
        if (waterInstance.waterNet !== '' || waterInstance.waterNet !== null) {
            totalEmission = parseFloat(totalEmission) + parseFloat(waterInstance.waterNet);

            componentWise.datasets[0].data[2] += waterInstance.waterNet;
            scopeWise.datasets[0].data[2] += waterInstance.waterNet;

            if (waterInstance.month !== null) {
                monthWise.datasets[0].data[monthMapping[waterInstance.month] - 1] += parseFloat(waterInstance.waterNet);
            }

            const idx = facilityWise.labels.indexOf(waterInstance.facilityName);

            if (idx === -1) {
                facilityWise.labels.push(waterInstance.facilityName);
                facilityWise.datasets[0].data.push(parseFloat(waterInstance.waterNet));
            }
            else {
                facilityWise.datasets[0].data[idx] += parseFloat(waterInstance.waterNet);
            }
        }
    });

    wasteInstances.forEach((wasteInstance) => {
        if (wasteInstance.wasteNet !== '' || wasteInstance.wasteNet !== null) {
            totalEmission = parseFloat(totalEmission) + parseFloat(wasteInstance.wasteNet);

            componentWise.datasets[0].data[3] += wasteInstance.wasteNet;
            scopeWise.datasets[0].data[2] += wasteInstance.wasteNet;

            if (wasteInstance.month !== null) {
                monthWise.datasets[0].data[monthMapping[wasteInstance.month] - 1] += parseFloat(wasteInstance.wasteNet);
            }

            const idx = facilityWise.labels.indexOf(wasteInstance.facilityName);

            if (idx === -1) {
                facilityWise.labels.push(wasteInstance.facilityName);
                facilityWise.datasets[0].data.push(parseFloat(wasteInstance.wasteNet));
            }
            else {
                facilityWise.datasets[0].data[idx] += parseFloat(wasteInstance.wasteNet);
            }
        }
    });

    travelInstances.forEach((travelInstance) => {
        if (travelInstance.travelNet !== '' || travelInstance.travelNet !== null) {
            totalEmission = parseFloat(totalEmission) + parseFloat(travelInstance.travelNet);

            componentWise.datasets[0].data[4] += travelInstance.travelNet;
            scopeWise.datasets[0].data[2] += travelInstance.travelNet;

            if (travelInstance.month !== null) {
                monthWise.datasets[0].data[monthMapping[travelInstance.month] - 1] += parseFloat(travelInstance.travelNet);
            }

            const idx = facilityWise.labels.indexOf(travelInstance.facilityName);

            if (idx === -1) {
                facilityWise.labels.push(travelInstance.facilityName);
                facilityWise.datasets[0].data.push(parseFloat(travelInstance.travelNet));
            }
            else {
                facilityWise.datasets[0].data[idx] += parseFloat(travelInstance.travelNet);
            }
        }
    });

    offsetInstances.forEach((offsetInstance) => {
        if (offsetInstance.offsetNet !== '' || offsetInstance.offsetNet !== null) {
            totalOffset = parseFloat(totalOffset) + parseFloat(offsetInstance.offsetNet);
        }
    });

    totalEmission = Number(parseFloat(totalEmission).toFixed(2));
    totalOffset = Number(parseFloat(totalOffset).toFixed(2));

    if (totalEmission === 'NaN') {
        return (
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginTop: '35vh' }}>Oops! it appears that you did not fill the form correctly. Please go back and fill the form again.</motion.h1>
        )
    }
    props.setResult(1);
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className='result'>
            <h1><b>Results</b></h1>
            <h2 style={{ marginTop: "30px", textAlign: "center" }}>Total Carbon Emission :<b> {totalEmission} </b>Kgs of CO2</h2>
            <h2 style={{ marginTop: "30px", textAlign: "center" }}>Total Offset Due to Absorption of CO2 :<b> {-totalOffset} </b>Kgs of CO2</h2>
            <h2 style={{ marginTop: "30px", textAlign: "center" }}>Net Carbon Footprint : <b>{((totalEmission + totalOffset).toFixed(2))} </b>Kgs of CO2</h2>
            <div className='charts'>
                <div className='pieChart'>
                    <h3 style={{ textAlign: "center" }}>Component-wise distribution</h3>
                    <Doughnut data={componentWise}  />
                </div>
                <div className='pieChart'>
                    <h3 style={{ textAlign: "center" }}>Scope-wise distribution</h3>
                    <Doughnut data={scopeWise}/>
                </div>
                <div className='bar'>
                    <h3 style={{ textAlign: "center" }}>Month-wise distribution</h3>
                    <Line id="bar" data={monthWise} options={{ scales: { y: { beginAtZero: true } } }} />
                </div>
                <div className='bar'>
                    <h3 style={{ textAlign: "center" }}>Facility-wise distribution</h3>
                    <Bar id="bar" data={facilityWise} options={{ scales: { y: { beginAtZero: true } } }} />
                </div>
            </div>
        </motion.div>
    );
}

