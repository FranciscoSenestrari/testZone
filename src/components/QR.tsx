import React, { useEffect, useState } from 'react'
import {QRCodeCanvas} from 'qrcode.react';

export default function QR() {
    const [token, setToken] = useState('');
    const expirationTime = 6000; // 1 minuto
  
    // Función para generar un token temporal
    const generateToken = () => {
      return `${Date.now()}-${Math.random().toString(36).substring(2)}`;
    };
  
    // Actualiza el token (y el QR) cada intervalo
    useEffect(() => {
      const updateToken = () => setToken(generateToken());
      updateToken();
  
      const interval = setInterval(updateToken, expirationTime);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div>
        <QRCodeCanvas value={token} />
        <p>QR expira cada {expirationTime / 1000} segundos</p>
      </div>
    );
  };
  