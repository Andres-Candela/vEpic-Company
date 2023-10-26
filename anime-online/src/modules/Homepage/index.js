import React, { useState } from 'react'
import './styles/Homepage.css'
import '../../animations/HomePageanim.css'; 
import chica from '../../assets/images/chica.png'
import Card from '../../components/Card';
import useAnime from '../../Hooks/useAnime';

export default function Homepage(props) {
  const { animes } = useAnime();
  
  return (
    <>

      <div className="container-fluid rounded box-border h-100 pt-5">
        <div className="sm:flex flex-row px-5" id="container">
          <div className="rounded">
            <img
              src={chica}
              alt=""
              className="img-responsive w-full h-full	rounded"
            />
          </div>

          <div className="w-full bg-black rounded text-white box-border p-4 overflow-hidden">
            <h1
              className="text-4xl ml-4 mt-3 cursor-pointer hover:text-violet-400 font-medium lg:text-4xl"
              id='title_main'
            >
              ☯ vEpic Company
            </h1>

            <p className="mt-16 text-justify p-3 box-border lg:mt-24">
              <strong>'Anime world'</strong> es una página creada con el fin de
              que puedas disfrutar de tus animes favoritos de forma online, sin
              preocupaciones ni nada por el estilo. Cuenta con un gran diseño, que
              es de fácil consumo y su aspecto es muy agradable a la vista del
              usuario.
            </p>

            <div className="box-border p-3">
              <a className="float-right hover:text-violet-400 lg:mt-24" href="/">
                Ver más ➜
              </a>
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl text-white mt-4 mb-4 bg-dark box-border p-4 rounded font-medium">Animes en Lista</h1>

        <div className="container p-4 box-border bg-dark rounded text-center">
          <div className="box-border pl-20 sm:pl-48 md:pl-52 lg:pl-0 lg:flex lg:flex-row">
            {
              animes.map(({ name, description, date, image }) => (
                <Card 
                  name={name}     
                  imagen={image}      
                  year={date}
                />
              ))
            }
          </div>
        </div>
      </div>
    </>
    )
}