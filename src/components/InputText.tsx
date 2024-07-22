import type { ComponentProps } from "react";
import { forwardRef } from "react";

import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const inputStyle = cva(
  "rounded-md border  py-2 px-4 outline-none transition-all duration-150",
  {
    variants: {
      intent: {
        idle: "border-macro-gray",
      },
      // States
      inputError: {
        true: "border-macro-red",
      },
      inputValid: {
        true: "border-macro-lightblue",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      intent: "idle",
      fullWidth: true,
    },
  }
);

type InputMacroProps = VariantProps<typeof inputStyle> &
  ComponentProps<"input">;

export const InputText = forwardRef<HTMLInputElement, InputMacroProps>(
  ({ className, intent, inputError, inputValid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={twMerge(
          inputStyle({ className, intent, inputError, inputValid })
        )}
      />
    );
  }
);
