import React, { useState } from 'react'
import AnimeResultsId from '../../components/AnimeResultsId';
import akame from '../../assets/images/akame.jpg'
import '../../animations/AnimeSearchanims.css';
import { GET_ANIME_DATA_BY_ID } from '../../api/apiRequests';

export default function AnimeSearch() {

  const [animeName, setAnimeName]  = useState();
  const [anime, setAnime] = useState();
  const [display, setDisplay] = useState('d-none');

  // getAnimeData: Está función, se encarga de enviar al endpoint de tipo GET el id del anime que yo quiero buscar, en el backend, con este id se busca en la base de datos el anime, y el endpoint me lo devuelve para asi yo mostrarlo en el front.
  const getAnimeData = async () => {
    const data = await GET_ANIME_DATA_BY_ID(animeName);
    setAnime(data)
    setDisplay('d-block');
  }

  const getAnimeId = (event) => {
    setAnimeName(event.target.value)
  }
  console.log(anime);
  return (
    <div style={{ height: "100vh" }}>
      <div className="container bg-dark mt-5 rounded text-white p-0 overflow-hidden box-border lg:flex h-50">
        <div className="p-5 box-border lg:flex flex-column lg:w-4/6">
          <h1 className="text-5xl box-border" id='title_main'>
            Busca anime
          </h1>
          <input
            type="text"
            className="form-control mt-5"
            id="idanime"
            placeholder="Anime"
            onChange={(e)=>{setAnimeName(e.target.value)}}
          />
          <button
            id="btn"
            type="button"
            className="btn btn-success w-40 mt-5"
            onClick={getAnimeData}
          >
            Buscar anime
          </button>
        </div>

        <div className="bg-black h-full lg:w-4/6">
          <img src={akame} alt="" className="h-full w-full"></img>
        </div>
      </div>

      <div className={display}>
        <div className="container bg-dark box-border p-3 text-white mt-5 text-4xl rounded">
          <h1>Resultados de la búsqueda:</h1>
        </div>
          <AnimeResultsId 
            anime={anime !== undefined ? anime[0].name : null} 
            imagen={anime !== undefined ? anime[0].image : null} 
            synopsis={anime !== undefined ? anime[0].description : null} 
          />
        </div>
    </div>
    
  );
}