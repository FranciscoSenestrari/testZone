import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Contenedor from '../components/Contenedor';
import reactLogo from "../assets/react.svg";

export default function ContinousQr() {
  const location = useLocation();
  const [isExpired, setIsExpired] = useState(false); // Estado para saber si el tiempo expiró

  // Extraer los parámetros de la URL
  const queryBase64 = location.search.substring(1); // Eliminar el "?" de la cadena
  const decodedQuery = atob(queryBase64);  // Decodificar la URL base64
  const params = new URLSearchParams(decodedQuery);
  const id = params.get("id");
  const tipo = params.get("tipo");
  const timestamp = params.get("timestamp");

  useEffect(() => {
    // Verificar si ha pasado más de un minuto desde el timestamp
    const currentTimestamp = Date.now(); // Tiempo actual en milisegundos
    const elapsedTime = currentTimestamp - parseInt(timestamp!, 10); // Diferencia en milisegundos

    if (elapsedTime > 60000) { // Si pasó más de 1 minuto (60000 ms)
      setIsExpired(true); // Establecer el estado a true si ha pasado más de un minuto
    }
  }, [timestamp]); // Ejecutar el efecto cuando cambie el timestamp

  return (
    <div>
      <div className="flex justify-center items-center">
        <a target="_blank" className="-ml-10">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <div className="text-xl tiltle">Test Zone</div>
      </div>

      <Contenedor>
        Contenido
        <div>
          <h1>Página de Destino</h1>
          <p>ID: {id}</p>
          <p>Tipo: {tipo}</p>
          <p>Timestamp: {timestamp}</p>

          {/* Mostrar un mensaje si ha pasado más de un minuto */}
          {isExpired && <p>¡El tiempo ha expirado!</p>}
        </div>
      </Contenedor>
    </div>
  );
}
