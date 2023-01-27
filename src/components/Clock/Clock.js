import React, { useState, useEffect } from 'react';
import "../../style.css";
function Clock() {
    const [time, setTime] = useState(new Date());
    const [day, setDay] = useState('');
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    useEffect(() => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      setDay(days[time.getDay()]);
    }, [time]);
  
    return (
      <div className="clock">
        <div className="Date">
        {day} {time.toLocaleDateString()}
        </div>
        <div className='Time'>
         {time.toLocaleTimeString()}
      </div>
      </div>
    );
  }


export default Clock;
