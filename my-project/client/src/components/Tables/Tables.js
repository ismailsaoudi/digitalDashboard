import React from "react";
import "../Home/Home.css";
import { useState, useEffect } from "react";

const WEEKDAY_ROWS = ['R', 'D', 'U'];
export const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const Table = ({ weekday, planned = {}, actual = {}, handleChange }) => {
    return (

        <div >
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
                            <td >
                                <input
                                    className="Input"
                                    type="number"
                                    value={planned[row] || ''}
                                    onChange={e => handleChange(weekday, row, 'planned', e.target.value)}
                                />
                            </td>
                            <td>
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

    const printWeeklyProgress = () => {
        let weeklyPlannedR = 0;
        let weeklyPlannedD = 0;
        let weeklyPlannedU = 0;
        let weeklyActualR = 0;
        let weeklyActualD = 0;
        let weeklyActualU = 0;
        WEEKDAYS.forEach((weekday) => {
            weeklyPlannedR += localData[weekday] ? localData[weekday].planned.R : 0;
            weeklyPlannedD += localData[weekday] ? localData[weekday].planned.D : 0;
            weeklyPlannedU += localData[weekday] ? localData[weekday].planned.U : 0;
            weeklyActualR += localData[weekday] ? localData[weekday].actual.R : 0;
            weeklyActualD += localData[weekday] ? localData[weekday].actual.D : 0;
            weeklyActualU += localData[weekday] ? localData[weekday].actual.U : 0;
        });
        const weeklyProgressR = ((weeklyActualR / weeklyPlannedR) * 100).toFixed(0);
        const weeklyProgressD = ((weeklyActualD / weeklyPlannedD) * 100).toFixed(0);
        const weeklyProgressU = ((weeklyActualU / weeklyPlannedU) * 100).toFixed(0);
        console.log(`Weekly Progress R: ${weeklyProgressR}%, Weekly Progress D: ${weeklyProgressD}%, Weekly Progress U: ${weeklyProgressU}%`);
    };
    


    return (
        <div>
            <div>
                <div className="Tables" >
                    {WEEKDAYS.map((weekday, index) => (
                        <div
                            key={weekday}
                            style={{
                                gridRow: Math.floor(index / 3) + 1,
                                gridColumn: (index % 3) + 1
                            }}
                        >
                            <Table
                                key={weekday}
                                weekday={weekday}
                                planned={localData[weekday] ? localData[weekday].planned : {}}
                                actual={localData[weekday] ? localData[weekday].actual : {}}
                                handleChange={handleChange}
                            />
                        </div>
                    ))}
                </div>
                <div>
                <button className="success" onClick={handleSave}>Save</button>
                <button onClick={printWeeklyProgress}>Print Weekly Progress</button>
                </div>
            </div>
        </div>
    );
};

export default WeeklyTables;





