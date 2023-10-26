import React, { useState } from 'react'
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)" // Fondo del modal (negro semitransparente)
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    borderRadius: '50px',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'black',
    padding: '50px'
  },
};

const ConfirmationModal = ({ isOpen, closeModal, deleteAccount, successDelete }) => {
  const [input, setInputValue] = useState();

  Modal.setAppElement("#root")

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
    >
      <h1 className='text-white fs-2 fw-bold mb-5'>Confirme el usuario</h1>
      <input
        type='text'
        className='input-group-text mb-4 w-100'
        onChange={(e) => setInputValue(e.target.value)}
      />

      {successDelete && <div className="alert-login alert-login-register rounded px-2" style={{ width: "fit-content" }}>
        ¡Usuario eliminado con exito!
      </div>}

      <div className='d-flex justify-content-between mt-5'>
        <button className='btn btn-danger' onClick={() => closeModal()}>Cancelar</button>
        <button className='btn text-white' style={{ backgroundColor: "purple" }} onClick={() => deleteAccount(input)}>Eliminar</button>
      </div>
    </Modal>
  )
}

export default ConfirmationModal