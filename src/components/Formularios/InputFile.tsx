import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

interface InputFileProps {
  name: string;
  required?: boolean;
}

const InputFile: React.FC<InputFileProps> = ({ name, required }) => {
  const { register, setValue, watch } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(watch(name) || null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFileName(file ? file.name : null);
    setValue(name, file); // Guarda el archivo en RHF
  };

  return (
    <div className="flex flex-col items-start gap-2">
      {/* Input oculto pero registrado en RHF */}
      <input
        type="file"
        {...register(name, { required })}
        ref={(el) => {
          register(name, { required }).ref(el);
          fileInputRef.current = el; // ✅ Ahora se asigna correctamente
        }}
        className="hidden"
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Subir Archivo
      </button>
      {fileName && <p className="text-sm text-gray-600">Archivo: {fileName}</p>}
    </div>
  );
};

export default InputFile;
