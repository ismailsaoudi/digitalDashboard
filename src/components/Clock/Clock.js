import React, { useState, useEffect } from 'react';
import "../../style.css";

function Clock() {
    const [time, setTime] = useState(new Date());
    const [day, setDay] = useState('');
    const [week, setWeek] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    useEffect(() => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      setDay(days[time.getDay()]);
    }, [time]);
  
    useEffect(() => {
      const firstDayOfYear = new Date(time.getFullYear(), 0, 1).getDay();
      const passedWeeks = Math.floor((((time - new Date(time.getFullYear(), 0, 1)) / 86400000) + firstDayOfYear) / 7);
      setWeek(passedWeeks);
    }, [time]);
  
    return (
      <div className="clock">
        <div className="Week">
          Week {week + 1}
        </div>
        <div className="Date">
        {day} {time.toLocaleDateString()}
        </div>
        
        <div className='Time'>
        {time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
      </div>
      </div>
    );
  }


export default Clock;

