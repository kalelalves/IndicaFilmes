import React from "react";

interface InputTextProps {
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  id?: string;
  className?: string;
  disabled?: boolean;
  type?: string;
}

export const InputText: React.FC<InputTextProps> = ({
  label,
  placeholder,
  className = "",
  id,
  onChange,
  disabled,
  type = "text",
  ...props
}) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s/g, '-') || crypto.randomUUID()}`;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--color-text-secondary)]"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={`
          border-b border-solid 
          border-[var(--color-bg-interactive)] 
          focus:border-[var(--color-accent-pink)] 
          bg-transparent outline-none 
          pb-2 px-2 transition-colors
          text-[var(--color-text-primary)]
          placeholder-[var(--color-text-tertiary)]
          ${disabled ? "opacity-50 pointer-events-none" : ""}
          ${className}
        `}
        {...props}
      />
    </div>
  );
};
