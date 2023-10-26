import React, { useState } from 'react'
import "./styles/Login.css"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LOGIN } from '../../../api/apiRequests';

const Login = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await LOGIN(userName);
      console.log("Usr:", response)
      if(response[0].password == password){
         navigate("/homepage");
      }else{
        throw new Error("Invalid password")
      }
     
    } catch (error) {
      setIsValid(false);
      throw new Error("Invalid username or password")
    }
  }

  useEffect(() => {
    setIsValid(true)
  }, [userName, password])
  

  return (
    <div className='login-container d-flex justify-content-center align-items-center'>
      <div className='bg-dark rounded d-md-flex col-12 col-md-7' style={{ padding: "50px" }}>
        <div className='col-md-12 col-lg-6 pe-5'>
          <form onSubmit={handleSubmit}>
            <h1 className='text-white fw-bold mb-5 text-center fs-2 col-12'>
              ☯ vEpic Company
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

            <div className='pt-4 pb-4'>
              {!isValid && <div className="alert-login rounded text-white px-2" style={{ width: "fit-content" }}>
                ⊗ Usuario y/o contraseña incorrectos.
              </div>}
            </div>

            <div className='col-12'>
              <button
                className="btn col-12 btn-success mt-2"
                id="btn"
                type='submit'
              >
                Ingresar
              </button>
              <button
                className="btn col-12 btn-primary mt-3"
                type='button'
                id="btn"
                onClick={() => navigate("/register")}
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
        <div className='d-none d-lg-block col-6 overflow-hidden rounded anime-bg' />
      </div>
    </div>
  )
}

export default Login