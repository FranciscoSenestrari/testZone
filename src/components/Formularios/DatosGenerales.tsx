import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { InputText } from "../InputText";
const DatosGenerales: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div>
        <label>Nombre</label>
        <Controller
          name="persona.nombre"
          control={control}
          render={({ field }) => (
            <InputText {...field} placeholder="Ingrese su nombre" />
          )}
        />
      </div>
      <div>
        <label>Apellido</label>
        <Controller
          name="persona.apellido"
          control={control}
          render={({ field }) => (
            <InputText {...field} placeholder="Ingrese su apellido" />
          )}
        />
      </div>
      <div>
        <label>Número</label>
        <Controller
          name="persona.numero"
          control={control}
          render={({ field }) => (
            <InputText
              {...field}
              type="number"
              placeholder="Ingrese un número"
            />
          )}
        />
      </div>
    </>
  );
};

export default DatosGenerales;
