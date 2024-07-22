import { useFormContext } from "react-hook-form";
import { PersonaType } from "../../schemas/person";
import { InputText } from "../InputText";

function Fieldsets() {
  const { register } = useFormContext<PersonaType>();
  return (
    <fieldset className="felx gap-4">
      <InputText
        type="text"
        className="w-fit drop-shadow-[0_0_2em_rgba(97, 218, 251, 0.667)]"
        placeholder="nombre"
        {...register("persona.nombre")}
      />
      <InputText
        type="text"
        className="w-fit"
        placeholder="apellido "
        {...register("persona.apellido")}
      />
      <InputText
        inputMode="numeric"
        className="w-fit"
        style={{ appearance: "none" }}
        {...register("persona.numero", {
          valueAsNumber: true,
          validate: (value) => value > 0,
        })}
      />
    </fieldset>
  );
}

export default Fieldsets;
