import { PropsWithChildren } from "react";

function Contenedor({ children }: PropsWithChildren) {
  return (
    <div className="w-full border-2 border-red-50 rounded-md p-4 m-4">
      {children}
    </div>
  );
}

export default Contenedor;
