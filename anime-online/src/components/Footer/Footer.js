import React, { useState } from 'react'
import { DELETE_USER } from '../../api/apiRequests';
import ConfirmationModal from './components/Modal';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  }

  const handleDeleteAccount = async (usrName) => {
    try {
      const response = await DELETE_USER(usrName);
      console.log("Deleted user:", response)
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 3000)
    } catch (error) {
      throw new Error(error);
    }
  }


  return (
    <>
      <footer className="bg-dark mt-5 rounded d-flex align-items-center justify-content-between p-4">
        <h5 className="text-white text-base text-center box-border">
          <strong className='me-1'>Design By:</strong> Andres Candela
        </h5>
        <h5 className="text-white text-base text-center box-border">
          <strong>Proyecto final SENA - 2023</strong>
        </h5>
        <h5 className="text-white text-base text-center box-border " onClick={() => setIsOpen(true)}>
          <strong className='me-1 cursor-pointer hover:text-violet-400'>Eliminar cuenta</strong>
        </h5>
      </footer>

      <ConfirmationModal 
        isOpen={isOpen} 
        closeModal={closeModal} 
        deleteAccount={handleDeleteAccount}
        successDelete={success}
      />
    </>
  );
}
