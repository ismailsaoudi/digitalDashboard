import React, { useEffect, useState } from "react";
import Clock from '../Clock/Clock';
import WeekdayTables from "../Tables/Tables";
import Modal from 'react-modal';
import S5popUp from "../S5popUp/S5popUp";
import alertBreak from '../assets/alertBreak.mp3'
import "../../style.css";
import Alarm from "./alarm"

const alarmTimes = [
  '2023-01-31T09:00:00',
  '2023-01-31T12:15:00',
  '2023-01-31T14:10:00',
];

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '100%',
    height: '100%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    backgroundColor: 'black'
  },
  h2: {
    textAlign: 'center',
    fontSize: '10rem',
    color: '#FDC72E',
    margin: '4rem 0',
  },
  button: {
    display: 'block',
    margin: '2rem auto',
    fontSize: '2rem',
    backgroundColor: 'black',
    color: '#FDC72E',
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '1rem',
    cursor: 'pointer',
  }
};

function Home() {
  const [data, setData] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const [audio] = useState(new Audio(alertBreak)); // create an audio object with the sound file

  const openModal = () => {
    setIsOpen(true);
    audio.play(); // play the sound
    setTimeout(() => {
      setIsOpen(false);
    }, 900000);
  }


  useEffect(() => {
    const interval = setInterval(() => {
      setData(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  function getTimeTillNextPopup(hours, minutes) {
    let currentDate = new Date();
    let nextPopup = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hours, minutes, 0, 0) - currentDate;
    if (nextPopup < 0) {
      nextPopup += 86400000;
    }
    return nextPopup;
  }
  useEffect(() => {
    // Set timeout for the first popup
    setTimeout(() => {
      openModal();
    }, getTimeTillNextPopup(8, 45));
    // Set timeouts for the second  popup
    setTimeout(() => {
      openModal();
    }, getTimeTillNextPopup(11, 45));
    // Set timeouts for the third popup
    setTimeout(() => {
      openModal();
    }, getTimeTillNextPopup(14, 0));

  },
    [openModal]);


  const extractData = (data) => {
    setData(data);
  };


  return (
    <section>
      <Alarm alarmTimes={alarmTimes} />
      <S5popUp />
      <div>
        <Clock />
      </div>
      <div>
        <WeekdayTables extractData={data => extractData(data)} data={data} />
      </div>
      <Modal isOpen={isOpen} style={customStyles}>
        <h2 style={customStyles.h2}>BREAK TIME <p> &#9749; &#129386; </p> </h2>
        <button style={customStyles.button} onClick={() => setIsOpen(false)}>CLOSE</button>
      </Modal>
    </section>
  );
}
export default Home;

