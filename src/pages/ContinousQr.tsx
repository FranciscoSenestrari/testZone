import React from "react";
import { useLocation } from "react-router";
import Contenedor from "../components/Contenedor";
import reactLogo from "../assets/react.svg";

export default function ContinousQr() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const tipo = params.get("tipo");
  const timestamp = params.get("timestamp");
  console.log(timestamp);
  return (
    <div>
      <div className="flex justify-center items-center  ">
        <a target="_blank" className="-ml-10">
          <img src={reactLogo} className="logo react " alt="React logo" />
        </a>
        <div className="text-xl tiltle">Test Zone</div>
      </div>

      <Contenedor>
        Contenido
        <div>
          <h1>Página de Destino</h1>
          <p>ID: {id}</p>
          <p>Tipo: {tipo}</p>
        </div>
      </Contenedor>
    </div>
  )
}
