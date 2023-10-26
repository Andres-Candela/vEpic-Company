import React, { useEffect, useState } from 'react';
import { FaPencil, FaTrashCan, FaRegEye } from "react-icons/fa6";
import useAnime from '../../Hooks/useAnime';
import { HTTP_METHODS, SEND_DATA_ANIME_BY_ID } from '../../api/apiRequests';
import "./styles/AnimeList.css";
import { useNavigate } from 'react-router-dom';

export default function AnimeList() {
  const navigate = useNavigate();

  const [generalAnimes, setGeneralAnimes] = useState([]);
  const [animeToEdit, setAnimeToEdit] = useState();
  const [isEdit, setIsEdit] = useState({ animeId: '', edit: false });

  const { animes } = useAnime();

  // handleSubmit: Está función se encarga, de mandar el anime que quiero agregar a mi lista de favoritos al backend, por medio de una petición POST al endpoint destinado para crear los animes. También esta misma función si es el caso de editar un registro, también lo hace. 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const animeObject = {
      name: e.target[0].value,
      description: e.target[1].value,
      date: e.target[2].value,
      url: e.target[3].value,
      image: e.target[4].value,
    }

    if (!isEdit.edit) {
      try {
        const response = await SEND_DATA_ANIME_BY_ID(null, HTTP_METHODS.POST, animeObject);

        const result = await response;
        console.log("Create anime success:", result);

      } catch (error) {
        throw new Error(error)
      }
    } else {
      try {
        const response = await SEND_DATA_ANIME_BY_ID(isEdit.animeId, HTTP_METHODS.PUT, animeObject);

        const result = await response;
        console.log("Edit anime success:", result);

        setIsEdit({ animeId: "", edit: false })
        setAnimeToEdit(null);
      } catch (error) {
        throw new Error(error)
      }
    }
  }

  // handleDeleteAnimeOfFavoritesList: Está función se encarga de eliminar el anime que yo quiera, de mi lista de favoritos. Está petición en el backend es de tipo DELETE. El endpoint recibe el id del anime que debe eliminar y lo elimina de la base de datos.
  const handleDeleteAnimeOfFavoritesList = async (animeId) => {
    try {
      const result = await SEND_DATA_ANIME_BY_ID(animeId, HTTP_METHODS.DELETE, null);
      console.log("Deleted:", result);

    } catch (error) {
      throw new Error(error)
    }
  }

  // handleEditInputsForm: Esta función se encarga de actualizar dos estados de react, para poder actualizar los inputs del form.
  const handleEditInputsForm = async (currentAnime) => {
    setIsEdit({ animeId: currentAnime.id, edit: true })
    setAnimeToEdit(currentAnime)
  }

  useEffect(() => {
    setGeneralAnimes(animes);
  }, [animes])

  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="mt-5 h-90 lg:overflow-hidden rounded bg-dark text-white p-0 lg:flex">
        <div className="w-4/6 box-border p-5">

          <h1 className="text-4xl">
            Crea tu lista de Animes
          </h1>

          <form id='form' onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="exampleFormControlInput1" class="form-label mt-4">
              Titulo del Anime:
            </label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              name='title'
              value={animeToEdit ? animeToEdit.name : ""}
              onChange={(e) => setAnimeToEdit({ name: e.target.value })}
              type="text"
              placeholder="Nombre del anime"
            ></input>

            <label htmlFor="exampleFormControlInput1" class="form-label mt-4">
              Descripción del Anime:
            </label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              name="description"
              value={animeToEdit ? animeToEdit.description : ""}
              onChange={(e) => setAnimeToEdit({ ...animeToEdit, description: e.target.value })}
              type="text"
              placeholder="description"
            ></input>

            <label htmlFor="exampleFormControlInput1" class="form-label mt-4">
              Fecha del Anime:
            </label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              name='animeDate'
              value={animeToEdit ? animeToEdit.date : ""}
              onChange={(e) => setAnimeToEdit({ ...animeToEdit, date: e.target.value })}
              type="date"
              placeholder="Fecha del Anime"
            ></input>

            <label htmlFor="exampleFormControlInput1" class="form-label mt-4">
              URL del Anime:
            </label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              name="url"
              value={animeToEdit ? animeToEdit.url : ""}
              onChange={(e) => setAnimeToEdit({ ...animeToEdit, url: e.target.value })}
              type="text"
              placeholder="url"
            ></input>

            <label htmlFor="exampleFormControlInput1" class="form-label mt-4">
              Imagen del Anime:
            </label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              name='animeImage'
              value={animeToEdit ? animeToEdit.imagen : ""}
              onChange={(e) => setAnimeToEdit({ ...animeToEdit, imagen: e.target.value })}
              type="file"
              placeholder="Imagen del anime"
            ></input>

            {!isEdit.edit && <button
              type='submit'
              className="btn btn-success mt-4 w-28">
              Agregar
            </button>}

            {isEdit.edit && <button
              type='submit'
              className="btn btn-secondary mt-4 w-28"
            >
              Editar
            </button>}

          </form>
        </div>


        <div className="bg-black w-full lg:w-4/6 text-white overflow-y-scroll">
          <h1 className="box-border p-5 text-5xl">
            Animes para ver
          </h1>
          <ol className="text-white  text-1xl p-4 box-border">
            {
              generalAnimes.map(({ id, name, description, date, image, url }) => {
                const currentAnime = { id, name, description, date, image, url };

                return <div className='bg-light text-black p-5 rounded mb-4'>
                  <div className='d-flex align-items-center justify-content-between'>
                    <h1 className='fs-3 fw-bold'>
                      {name}
                    </h1>
                    <div>
                      <button
                        className='btn me-2 text-white'
                        style={{ backgroundColor: "purple" }}
                      >
                        <a href={url} target='_blank' rel="noreferrer">
                          <FaRegEye />
                        </a>
                      </button>
                      <button
                        className='btn btn-warning me-2'
                        onClick={() => handleEditInputsForm(currentAnime)}
                      >
                        <FaPencil />
                      </button>
                      <button
                        className='btn btn-danger'
                        onClick={() => handleDeleteAnimeOfFavoritesList(id)}
                      >
                        <FaTrashCan />
                      </button>
                    </div>
                  </div>
                  <p className='mt-3'>{description}</p>
                </div>
              })
            }
          </ol>
        </div>
      </div>
    </div>
  );
}
