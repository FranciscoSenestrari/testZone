import React, { useEffect, useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import InputFile from "./InputFile";
import { DevTool } from "@hookform/devtools";

export default function Documentacion() {
  const methods = useForm({ mode: "onChange" });

  const documentos = [
    { nombre: "documento_1", required: true },
    { nombre: "documento_2", required: false },
    { nombre: "documento_3", required: true },
    { nombre: "documento_4", required: false },
  ];

  return (
    <FormProvider {...methods}>
      <FormularioInterno documentos={documentos} />
      <DevTool control={methods.control} /> {/* Para debuggear el formulario */}
    </FormProvider>
  );
}

const FormularioInterno: React.FC<{
  documentos: { nombre: string; required: boolean }[];
}> = ({ documentos }) => {
  const { handleSubmit, watch } = useFormContext();
  const [isValid, setIsValid] = useState(false);

  // Verificar si todos los documentos requeridos tienen un archivo cargado
  useEffect(() => {
    const archivosSubidos = watch();
    const allRequiredFilesUploaded = documentos
      .filter((doc) => doc.required)
      .every((doc) => archivosSubidos[doc.nombre] instanceof File);

    setIsValid(allRequiredFilesUploaded);
  }, [watch(), documentos]);

  const onSubmit = (data: any) => {
    console.log("Formulario enviado con archivos:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {documentos.map((documento) => (
        <div key={documento.nombre} className="mb-4">
          <label>{documento.nombre}</label>
          <InputFile name={documento.nombre} required={documento.required} />
        </div>
      ))}

      {/* Botón de enviar deshabilitado si faltan archivos requeridos */}
      <button
        type="submit"
        disabled={!isValid}
        className={`px-4 py-2 rounded-lg text-white ${
          isValid
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Enviar
      </button>
    </form>
  );
};
