import React, { useState } from 'react';
import axios from 'axios';
import FlightSimulation from './FlightSimulation';

function App() {
    const [weather, setWeather] = useState(null);
    const [forces, setForces] = useState({ lift: 0, drag: 0 });

    const getWeather = async () => {
        const response = await axios.get('http://localhost:5000/weather?lat=37.7749&lon=-122.4194');
        setWeather(response.data);
    };

    const calculateForces = async () => {
        const response = await axios.post('http://localhost:5000/calculate', {
            CL: 1.2, CD: 0.3, rho: 1.225, velocity: 50, area: 30
        });
        setForces(response.data);
    };

    return (
        <div>
            <h1>Aerodynamic Weather Simulation</h1>
            <button onClick={getWeather}>Fetch Weather</button>
            <button onClick={calculateForces}>Calculate Forces</button>
            {weather && <p>Temperature: {weather.main.temp}K</p>}
            <p>Lift: {forces.lift} N</p>
            <p>Drag: {forces.drag} N</p>
            <FlightSimulation />
        </div>
    );
}

export default App;

