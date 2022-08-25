import React, { useState, useEffect, useRef } from 'react'
import './App.css';
import LineChart from './LineChart';

function App() {
  const[data, setData] = useState([]) 

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
        .then(response => response.json())
        .then(data => setData(data.data))
  }, [])

  const width = 800;
  const height = 600;
  const padding = 40; 
  const widthOfBar = width / data.length;

  return (
    <div className="main">
      <LineChart
        padding={padding}
        width={width}
        height={height}
        data={data}
        widthOfBar={widthOfBar}
        />
    </div>
  );
}

export default App;
