import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [var1, setVar1] = useState('124');
  const [var2, setVar2] = useState('6567');
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [toggleText, setToggleText] = useState('Know More');

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateEstimates();
    }, 20000);

    return () => clearInterval(intervalId);
  }, []);

  const updateEstimates = () => {
    axios.get('http://127.0.0.1:5000/update_estimate')
      .then(response => {
        const { var1, var2 } = response.data;
        setVar1(var1);
        setVar2(var2);
      })
      .catch(error => {
        console.error('Error updating estimates:', error);
      });
  };

  const toggleAccordion = () => {
    setAccordionOpen(prevState => !prevState);
    setToggleText(prevText => prevText === 'Know More' ? 'Know Less' : 'Know More');
  };

  return (
    <div>
      <div className="navbar">
        <h2>Auto Update Content</h2>
      </div>
      <div className="container">
        <div className="content">
          Hi, I am {var1}. I know {var2}.
        </div>
        <div className="accordion">
          <button className="accordion-btn" onClick={toggleAccordion}>
            {toggleText}
          </button>
          <div className={`accordion-content ${accordionOpen ? 'show' : ''}`}>
            <p>This content is auto-updating without requiring manual refresh. The frontend sends a request to the backend every 20 seconds to fetch the latest data.</p>
            <p>The flask backend responds with updated values. These values are then displayed in the UI.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;