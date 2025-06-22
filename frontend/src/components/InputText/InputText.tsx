import React from "react";

interface InputTextProps {
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const InputText: React.FC<InputTextProps> = ({
  label,
  placeholder,
  className = "",
  id,
  onChange,

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        {...props}
      />
    </div>
  );
};