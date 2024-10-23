import React from "react";
import { useForm, Controller } from "react-hook-form";
import { string, minValue, maxValue } from "valibot";

type PercentageInputProps = {
  name: string;
  control: any; // Control from react-hook-form
};

// Esquema de validación utilizando valibot v0.25.0
const percentageSchema = string();

const PercentageInput: React.FC<PercentageInputProps> = ({ name, control }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ];
    const char = e.key;
    const isNumber = /^[0-9]$/.test(char);
    const isAllowedKey = allowedKeys.includes(char);

    if (!isNumber && !isAllowedKey) {
      e.preventDefault();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    let { value } = e.target;

    // Permitir hasta dos decimales
    if (value.match(/^\d*(\.\d{0,2})?$/)) {
      if (parseFloat(value) <= 100) {
        onChange(value);
      }
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <input
          type="text"
          value={value}
          onBlur={onBlur}
          onChange={(e) => handleChange(e, onChange)}
          onKeyDown={handleKeyDown}
          inputMode="decimal"
          pattern="[0-9]*"
          maxLength={6} // "100.00"
          placeholder="0.00"
          className="border rounded p-2"
        />
      )}
    />
  );
};

const PercentageForm = () => {
  const { control, handleSubmit } = useForm<{ percentage: string }>({
    defaultValues: { percentage: "0.00" },
  });

  const onSubmit = (data: { percentage: string }) => {
    console.log(data);
  };

  function postProducto(idProducto: string) {
    const data = { product: idProducto, name: "pastafrola", cantidad: 2 };

    fetch("http://localhost:3000/api/carrito/" + idProducto, {
      method: "POST",

      body: JSON.stringify({
        data: data,
      }),
    }).then((response) => response.json());
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PercentageInput name="percentage" control={control} />
      <button className="mt-2 p-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
};

export default PercentageForm;
