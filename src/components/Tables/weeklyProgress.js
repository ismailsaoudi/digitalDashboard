import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import weeklyTables from "./Tables";

function WeekProgress() {
    const [showModal, setShowModal] = useState(false);

    const plannedValues = weeklyTables.map(
        (day) => day.Monday + day.Tuesday + day.Wednesday + day.Thursday + day.Friday
    );
    const actualValues = weeklyTables.map(
        (day) => day.ActualMonday + day.ActualTuesday + day.ActualWednesday + day.ActualThursday + day.ActualFriday
    );
    const percentage = plannedValues.map(
        (planned, index) => (actualValues[index] / planned) * 100
    );

    useEffect(() => {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();

        if (currentHour === 11 && currentMinute === 57) {
            setShowModal(true);
        }
    }, []);

    return (
        <div>
            <Modal show={showModal} closeModal={() => setShowModal(false)}>
                <table>
                    <thead>
                        <tr>
                            <th>Planned</th>
                            <th>Actual</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plannedValues.map((planned, index) => (
                            <tr key={index}>
                                <td>{planned}</td>
                                <td>{actualValues[index]}</td>
                                <td>{percentage[index]}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal>
        </div>
    );
}

export default WeekProgress;