import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { personaFormSchema, PersonaType } from "../../schemas/person.ts";
import DatosGenerales from "./DatosGenerales.tsx";

const PersonaForm: React.FC = () => {
  const methods = useForm<PersonaType>({
    resolver: valibotResolver(personaFormSchema),
  });

  const onSubmit = (data: PersonaType) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <DatosGenerales />
        <button type="submit">Enviar</button>
      </form>
    </FormProvider>
  );
};

export default PersonaForm;
