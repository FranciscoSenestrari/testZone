import reactLogo from "./assets/react.svg";
import "./App.css";
import Form from "./components/Formularios/Form";
import Contenedor from "./components/Contenedor";

function App() {
  return (
    <div>
      <div className="flex justify-center items-center -mt-40">
        <a target="_blank" className="-ml-10">
          <img src={reactLogo} className="logo react " alt="React logo" />
        </a>
        <div className="text-xl tiltle">Test Zone</div>
      </div>

      <Contenedor>
        Formulario
        <Form />
      </Contenedor>
    </div>
  );
}

export default App;
