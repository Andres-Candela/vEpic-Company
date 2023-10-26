import { useEffect, useState } from "react"
import { GET_ANIMES_DATA } from "../api/apiRequests";

export default function useAnime() {

    const [animes, setAnimes] = useState([
        {
            "id": 2,
            "name": "Cardcaptor Sakura",
            "date": 1996,
            "description": "Sakura Kinomoto (Kinomoto Sakura) es un personaje de ficción, la heroína de la serie de CLAMP de anime y manga Cardcaptor Sakura. Ella es muy popular en Japón como un personaje anime. Además, ganó el premio del Torneo Anime Saimoe por primera vez en el año 2001.",
            "image": "/img/sakura.jpeg"
        }
    ]);

    // useEffect PARA OBTENER DATOS DE LA API
    useEffect(() => {
        getData();
    }, [animes]);

    // Obtener datos de la API del backend. 
    // ENDPOINT: "/api/animes" me trae todos los animes que hay en la DB
    const getData = async () => {
        const animes = await GET_ANIMES_DATA()
        setAnimes(animes);
    };

    return {
        animes
    };
}
