import reactLogo from "./assets/react.svg";
import "./App.css";
import Form from "./components/Formularios/Form";
import Contenedor from "./components/Contenedor";
import CheckBoxesContainer from "./components/InputsDocuments/CheckBoxesContainer";
import GoogleMap from "./components/Maps/GoogleMaps";
import { ToasterMessage } from "./components/ToasterMessage";
import { Toaster, ToastBar } from "react-hot-toast";
import { useState } from "react";
import PercentageForm from "./components/Formularios/Input";
import MapaProvincias from "./components/Maps/AnotherpMap";
import QR from "./components/QR";
function App() {
  const [value, setValue] = useState("");
  console.log(value);
  return (
    <div className="">
      <div className="flex justify-center items-center  ">
        <a target="_blank" className="-ml-10">
          <img src={reactLogo} className="logo react " alt="React logo" />
        </a>
        <div className="text-xl tiltle">Test Zone</div>
      </div>

      <Contenedor>
        QR
        <QR></QR>
      </Contenedor>
      <Contenedor>
        Formulario
        <Form />
      </Contenedor>
      <Contenedor>
        Documents
        <CheckBoxesContainer />
      </Contenedor>
      <Contenedor>
        Maps
        <GoogleMap />
      </Contenedor>
      <Contenedor>
        <ToasterMessage />
        <Toaster>
          {(t) => (
            <ToastBar
              toast={t}
              style={{
                ...t.style,
                animation: t.visible
                  ? "custom-enter 1s ease"
                  : "custom-exit 1s ease",
              }}
            />
          )}
        </Toaster>
        ;
      </Contenedor>
      <Contenedor>
        Input Porcentaje
        <PercentageForm></PercentageForm>
      </Contenedor>
      <Contenedor>
        AnotherMAp
        <MapaProvincias></MapaProvincias>
      </Contenedor>
    
    </div>
  );
}

export default App;
