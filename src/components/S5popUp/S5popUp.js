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
    fontSize: '6rem',
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
    fontSize: '8rem',
    color: '#FDC72E',
    margin: '4rem 0',
  }
};


class S5popUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { S5modalOpen: false };
    this.S5openModal = this.S5openModal.bind(this);
    this.S5closeModal = this.S5closeModal.bind(this);
  }

  S5openModal() {
    this.setState({ S5modalOpen: true });
    const S5sound = new Audio(alertBreak);
    S5sound.play();
  }

  S5closeModal() {
    this.setState({ S5modalOpen: false });
  }

  componentDidMount() {
    setInterval(() => {
        const S5now = new Date();
        if (S5now.getHours() === 12 && S5now.getMinutes() === 9 && S5now.getSeconds() === 0) {
            this.S5openModal();
            setTimeout(() => {
                this.S5closeModal();
            }, 900000);
        }
    }, 60000);
  }

  render() {
    return (
      <div>
<button onClick={this.S5openModal}  style={customStyles.button}>open</button>

        <Modal 
          isOpen={this.state.S5modalOpen}
          onRequestClose={this.S5closeModal} 
          style={customStyles}>
        <h2 style={customStyles.h2}> THANK YOU FOR YOUR HARD WORK  </h2>
        <h2 style={customStyles.h2}> S5 TIME !  </h2>
        <p style={customStyles.p}> ♻ </p>
        <button onClick={this.S5closeModal}  style={customStyles.button}>Close</button>
      </Modal>
      </div>
    );
  }
}

export default S5popUp;