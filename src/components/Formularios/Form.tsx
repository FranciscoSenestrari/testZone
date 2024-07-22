import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Fieldsets from "./Fieldsets";
import { personaFormSchema, PersonaType } from "../../schemas/person";
import { valibotResolver } from "@hookform/resolvers/valibot";
valibotResolver;
function Form() {
  const form = useForm<PersonaType>({
    resolver: valibotResolver(personaFormSchema),
    mode: "onChange",
  });
  console.log(form.formState.isValid);
  async function showdata() {
    console.log("enviado");
  }
  const [valid, setIsValid] = useState(false);
  useEffect(() => {
    setIsValid(form.formState.isValid);
  }, [form.formState.isValid]);
  console.log(valid);
  return (
    <FormProvider {...form}>
      <form onSubmit={showdata} className="">
        <Fieldsets />
        <div>Form Valid : {valid ? "si " : "no"} </div>
        <button disabled={!form.formState.isValid}>test</button>
      </form>
    </FormProvider>
  );
}

export default Form;
