import reactLogo from "./assets/react.svg";
import "./App.css";
import Form from "./components/Formularios/Form";
import Contenedor from "./components/Contenedor";
import CheckBoxesContainer from "./components/InputsDocuments/CheckBoxesContainer";
import GoogleMap from "./components/Maps/GoogleMaps";

function App() {
  return (
    <div className="">
      <div className="flex justify-center items-center  ">
        <a target="_blank" className="-ml-10">
          <img src={reactLogo} className="logo react " alt="React logo" />
        </a>
        <div className="text-xl tiltle">Test Zone</div>
      </div>

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
    </div>
  );
}

export default App;
