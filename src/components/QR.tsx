import React, { useEffect, useState } from 'react'
import {QRCodeCanvas} from 'qrcode.react';

export default function QR() {
    const [timestamp, setTimestamp] = useState(Date.now());

    // URL base sin parámetros específicos
    const baseURL = "http://192.168.100.49:3000/destino";
   
    // Configura los parámetros, incluyendo el timestamp
    const params = new URLSearchParams({
      id: "12345",
      tipo: "temporal",
      timestamp: timestamp.toString(),
    });
function isTokenValid(tokenTimestamp:any) {
  const currentTime = Date.now();
  const timeElapsed = currentTime - tokenTimestamp;

  // 1 minuto en milisegundos = 60,000 ms
  const oneMinute = 60 * 1000;

  return timeElapsed <= oneMinute;
}

// Ejemplo de uso
const tokenTimestamp = Date.now(); // Marca el momento de creación del token
setTimeout(() => {
  console.log(isTokenValid(tokenTimestamp)); // Verifica si el token sigue siendo válido
}, 500); // Cambia este valor
    
    console.log(btoa(params.toString()))
    // Genera la URL completa con los parámetros
    const qrURL = `${baseURL}?${params.toString()}`;
  
    // Actualiza el timestamp cada minuto para cambiar el QR
    useEffect(() => {
      const interval = setInterval(() => {
        setTimestamp(Date.now());
      }, 60 * 1000); // 1 minuto
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div>
        <QRCodeCanvas value={qrURL} />
        <p>Escanea el QR. Se actualiza cada minuto.</p>
      </div>
    );
  
  };
  