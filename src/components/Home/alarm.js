import React from 'react';
import Modal from 'react-modal';
import alertBreak from '../assets/alertBreak.mp3'

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
        fontSize: '8rem',
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
    },
    p: {

        textAlign: 'center',
        fontSize: '9rem',
        color: '#FDC72E',
        margin: '4rem 0',
    }
};

class Alarm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { S5modalOpen: false };
        this.S5openModal = this.S5openModal.bind(this);
        this.S5closeModal = this.S5closeModal.bind(this);
    }

    S5openModal() {
        this.setState({ S5modalOpen: true });
        const S5sound = new Audio(alertBreak);
        S5sound.volume = 1; // set the volume to full
        S5sound.play();
    }

    S5closeModal() {
        this.setState({ S5modalOpen: false });
    }

    componentDidMount() {
        const Alramnow = new Date();
        const alarmTimes =
            [
                { hour: 9, minute: 0 },
                { hour: 12, minute: 15 },
                { hour: 14, minute: 15 }
            ];

        alarmTimes.forEach(alarmTime => {
            const alarmDate = new Date();
            alarmDate.setHours(alarmTime.hour);
            alarmDate.setMinutes(alarmTime.minute);
            alarmDate.setSeconds(0);
            if (Alramnow.getHours() > alarmTime.hour || (Alramnow.getHours() === alarmTime.hour && Alramnow.getMinutes() > alarmTime.minute)) {
                alarmDate.setDate(Alramnow.getDate() + 1);
            }
            setTimeout(() => {
                this.S5openModal();
            }, alarmDate.getTime() - Alramnow.getTime());
        });
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.S5modalOpen}
                    onRequestClose={this.S5closeModal}
                    style={customStyles}
                >
                    <h2 style={customStyles.h2}> LET'S GET BACK TO WORK </h2>
                    <p style={customStyles.p}> &#9889; </p>
                    <button onClick={this.S5closeModal} style={customStyles.button}>
                        Close
                    </button>
                </Modal>
            </div>
        );
    }
}

export default Alarm;