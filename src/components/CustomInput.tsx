import React, { ComponentProps } from "react";

function CustomInput({ type, ...props }: ComponentProps<"input">) {
  return <input type={type} {...props} />;
}

export default CustomInput;
