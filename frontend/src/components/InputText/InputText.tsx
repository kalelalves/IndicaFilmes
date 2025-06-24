import * as React from 'react'

interface InputTextProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'onChange'
  > {
  label?: string
  placeholder?: string
  onChange?: (value: string) => void
  id?: string
  disabled?: boolean
  type?: React.HTMLInputTypeAttribute
}

export const InputText: React.FC<InputTextProps> = ({
  label,
  placeholder,
  className = '',
  id,
  onChange,
  disabled,
  type = 'text',
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
    border-[var(--color-bg-interactive)] 
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
    </div>
  )
}
