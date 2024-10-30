import React, { useEffect, useState } from 'react'
import {QRCodeCanvas} from 'qrcode.react';

export default function QR() {
    const [timestamp, setTimestamp] = useState(Date.now());

    // URL base sin parámetros específicos
    const baseURL = " http://x.x.x.x:3000/destino";
  
    // Configura los parámetros, incluyendo el timestamp
    const params = new URLSearchParams({
      id: "12345",
      tipo: "temporal",
      timestamp: timestamp.toString(),
    });
  
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
  