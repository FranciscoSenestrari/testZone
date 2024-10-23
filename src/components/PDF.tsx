import React, { useState, useRef } from "react";
import { BrowserPDF417Reader } from "@zxing/browser";

const PDF417ReaderComponent: React.FC = () => {
  const [base64, setBase64] = useState<string>("");
  const [decodedText, setDecodedText] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Función para manejar el archivo subido y convertirlo a base64
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result?.toString().split(",")[1] ?? "";
      setBase64(base64String);
      drawImageOnCanvas(base64String);
    };
    reader.readAsDataURL(file);
  };

  // Función para dibujar la imagen en el canvas
  const drawImageOnCanvas = (base64: string) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
      };
      img.src = "data:image/png;base64," + base64;
    }
  };

  // Nueva función para decodificar el PDF417
  const decodePDF417 = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const reader = new BrowserPDF417Reader();
      const result = await reader.decodeFromCanvas(canvas);
      if (result) {
        setDecodedText(result.getText());
      } else {
        setDecodedText("No se pudo decodificar el código PDF417");
      }
    } catch (error) {
      console.error("Error al decodificar:", error);
      setDecodedText("Error al decodificar el código PDF417");
    }
  };

  return (
    <div>
      <h1>Lector PDF417</h1>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      <canvas ref={canvasRef} />
      <button onClick={decodePDF417}>Decodificar PDF417</button>
      {decodedText && (
        <div>
          <h2>Información decodificada:</h2>
          <pre>{decodedText}</pre>
        </div>
      )}
    </div>
  );
};

export default PDF417ReaderComponent;
