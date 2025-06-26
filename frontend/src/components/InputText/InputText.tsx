import * as React from 'react'

interface InputTextProps {
  label: string
  placeholder?: string
  value: string
  id?: string
  disabled?: boolean
  onChange: (value: string) => void
  type?: string
  error?: boolean
  errorMessage?: string
  className?: string
}

export const InputText: React.FC<InputTextProps> = ({
  label,
  placeholder,
  className = '',
  id,
  onChange,
  disabled,
  type = 'text',
  error,
  errorMessage,
  ...props
}) => {
  const inputId =
    id ||
    `input-${label?.toLowerCase().replace(/\s/g, '-') || crypto.randomUUID()}`

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium mb-2 text-[var(--color-text-secondary)]"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={`
          border border-solid
          ${error ? 'border-red-500' : 'border-[var(--color-bg-interactive)]'}
          focus:border-[var(--color-accent-pink)]
          bg-[var(--color-bg-secondary)]
          outline-none
          px-4 py-3 rounded-md
          text-[var(--color-text-base)]
          placeholder-[var(--color-text-tertiary)]
          transition-colors
          ${disabled ? 'opacity-50 pointer-events-none' : ''}
          ${className}
        `}
        {...props}
      />
      {error && errorMessage && (
        <span className="text-sm text-red-500 mt-1">{errorMessage}</span>
      )}
    </div>
  )
}