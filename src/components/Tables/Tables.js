import React from "react";
import "../../style.css";

import { useState, useEffect } from "react";
const WEEKDAY_ROWS = ['R', 'D', 'U'];
export const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];




const Table = ({ weekday, planned = {}, actual = {}, handleChange }) => {

    return (
        <div className={`table-${weekday.toLowerCase()}`}>
            <h4 className="days">{weekday}</h4>
            <table>
                <thead >
                    <tr className="Menu">
                        <th>Machine</th>
                        <th>Planned</th>
                        <th>Actual</th>
                        <th>%</th>
                    </tr>
                </thead>
                <tbody >
                    {WEEKDAY_ROWS.map(row => (
                        <tr key={row}>
                            <td className="RDU">{row}</td>
                            <td className="boxSize">
                                <input
                                    className="Input"
                                    type="number"
                                    value={planned[row] || ''}
                                    onChange={e => handleChange(weekday, row, 'planned', e.target.value)}
                                />
                            </td>
                            <td className="boxSize">
                                <input
                                    className="Input"
                                    type="number"
                                    value={actual[row] || ''}
                                    onChange={e => handleChange(weekday, row, 'actual', e.target.value)}
                                />
                            </td>
                            <td className="Progress" style={
                                (actual[row] / planned[row]) * 100 >= 0 && (actual[row] / planned[row]) * 100 < 61 ? { backgroundColor: 'red' } :
                                    (actual[row] / planned[row]) * 100 >= 61 && (actual[row] / planned[row]) * 100 < 96 ? { backgroundColor: 'yellow' } :
                                        (actual[row] / planned[row]) * 100 >= 100 ? { backgroundColor: 'green' } :
                                            { backgroundColor: 'white' }
                            }>
                                {(!actual[row] || !planned[row]) ? "" : ((actual[row] / planned[row]) * 100).toFixed(0) + "%"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};



const WeeklyTables = ({ extractData, data }) => {
    const [localData, setLocalData] = useState(data);


    useEffect(() => {
        const dataFromLocalStorage = localStorage.getItem('data');
        if (dataFromLocalStorage) {
            setLocalData(JSON.parse(dataFromLocalStorage));
        }
    }, []);


    const handleSave = () => {
        localStorage.setItem('data', JSON.stringify(localData));
    };
    const handleChange = (weekday, row, field, value) => {
        let newData = { ...localData };
        if (!newData[weekday]) {
            newData[weekday] = { planned: {}, actual: {} };
        }
        newData[weekday][field][row] = value;
        setLocalData(newData);
        extractData(newData);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div>
            <div className="Tables" id="printable">
                {WEEKDAYS.map((weekday) => (
                    <div key={weekday}>
                        <Table
                            key={weekday}
                            weekday={weekday}
                            planned={localData[weekday] ? localData[weekday].planned : {}}
                            actual={localData[weekday] ? localData[weekday].actual : {}}
                            handleChange={handleChange}
                        />
                    </div>
                ))}
                <div className="buttons">
                    <button className="success" onClick={handleSave}>Save</button>
                    <button className="print" onClick={handlePrint}>Print</button>
                </div>
            </div>
        </div>
    );
};
export default WeeklyTables;






