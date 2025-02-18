import { useState, useEffect } from "react";
import "driver.js/dist/driver.css";

interface TyC {
  name: string;
  tycs: string[];
}

const tyc = {
  name: "",
  tycs: ["Archivo 1", "Archivo 2", "Archivo 3 ", "Archivo 4", "Archivo 5"],
};

export default function CheckBoxesContainer() {
  const [document, setDocuments] = useState<TyC | undefined>();
  const [checkboxes, setCheckboxes] = useState<boolean[]>([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDocuments(tyc);
      setCheckboxes(new Array(tyc.tycs.length).fill(false));
    }, 2500);
  }, [document]);

  useEffect(() => {
    setIsValid(checkboxes.every((checked) => checked));
  }, [checkboxes]);

  const handleChecked = (index: number) => {
    setCheckboxes((prev) => {
      const newCheckboxes = [...prev];
      newCheckboxes[index] = !newCheckboxes[index];
      return newCheckboxes;
    });
  };

  return (
    <div className="ckb">
      {document?.tycs.map((item, index) => (
        <div className="flex gap-4" key={index}>
          <input
            className="ckb-checkbox"
            type="checkbox"
            checked={checkboxes[index]}
            onChange={() => handleChecked(index)}
          />
          {item}
        </div>
      ))}
      <button
        onClick={() => {
          console.log("Valido:", checkboxes);
        }}
      >
        Verificar que sea valido
      </button>
      {isValid ? "Valido" : "Invalid"}
    </div>
  );
}
