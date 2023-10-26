import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CREATE_USER } from '../../../api/apiRequests';
import "./styles/Register.css"

const Register = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [birthdate, setBirthDate] = useState();
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleCreateVEpicUser = async (newVEpicUsr) => {
    try {
      const newUser = await CREATE_USER(newVEpicUsr);
      console.log("Create user success: ", newUser);
      setSuccess(true);
      setTimeout(() => {
        navigate("/homepage");
      }, 3000)
    } catch (error) {
      throw new Error(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("username:", userName, "password:", password)

    const newVEpicUsr = {
      userName,
      password,
      birthdate
    }

    handleCreateVEpicUser( newVEpicUsr );

    // if (userName === "Candela" && password === "123") {
    //   navigate("/homepage")
    // } else {
    //   throw new Error("Invalid username or password")
    // }
  }


  return (
    <div className='login-container d-flex justify-content-center align-items-center'>
      <div className='bg-dark rounded d-md-flex col-12 col-md-7' style={{ padding: "50px" }}>
        <div className='col-md-12 col-lg-6 pe-5'>
          <form onSubmit={handleSubmit}>
            <h1 className='text-white fw-bold mb-5 text-center fs-2 col-12'>
              Registrarse
            </h1>
            <label className='mb-2'>Usuario:</label>
            <input
              type='text'
              className='input-group-text mb-4 w-100'
              onChange={(e) => setUserName(e.target.value)}
            />
            <label className='mb-2'>Contraseña:</label>
            <input
              type='password'
              className='input-group-text w-100'
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className='mb-2 mt-4'>Fecha de nacimiento</label>
            <input
              type='date'
              className='input-group-text w-100'
              onChange={(e) => setBirthDate(e.target.value)}
            />

            <div className='pt-4'>
              {success && <div className="alert-login alert-login-register rounded px-2" style={{ width: "fit-content" }}>
                ¡Usuario creado con exito!
              </div>}
            </div>

            <div className='col-12'>
              <button
                className="btn col-12 btn-success mt-4"
                id="btn"
                type='submit'
              >
                Registrarse
              </button>
              <button
                className="btn col-12 btn-danger mt-3"
                id="btn"
                type='submit'
                onClick={() => navigate("/")}
              >
                Atrás
              </button>
            </div>
          </form>
        </div>
        <div className='d-none d-lg-block col-6 overflow-hidden rounded anime-bg' />
      </div>
    </div>
  )
}

export default Register