import {
  maxLength,
  maxValue,
  minLength,
  minValue,
  number,
  object,
  optional,
  Output,
  regex,
  string,
  toLowerCase,
} from "valibot";
export const personaFormSchema = object({
  persona: object({
    nombre: optional(
      string([
        minLength(4, "Minimo de caracteres (4)"),
        maxLength(36, "Máximo de caracteres superado"),
        toLowerCase(),
        regex(/^[a-z ,.'-]+$/i, "Su nombre debe contener solo letras."),
      ])
    ),
    apellido: optional(
      string([
        minLength(2, "Minimo de caracteres (2)"),
        maxLength(36, "Máximo de caracteres superado"),
        toLowerCase(),
        regex(/^[a-z ,.'-]+$/i, "Su apellido debe contener solo letras."),
      ])
    ),
    numero: number(),
  }),
});

export type PersonaType = Output<typeof personaFormSchema>;
