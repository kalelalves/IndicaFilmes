import { cva, cx, type VariantProps } from "class-variance-authority";

export const inputTextVariants = cva(
  `
    border-b border-solid border-gray-200 focus:border-pink-base
    bg-transparent outline-none
  `,
  {
    variants: {
      size: {
        md: "pb-2 px-2",
      },
      disabled: {
        true: "pointer-events-none",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  }
);

interface InputTextProps
  extends VariantProps<typeof inputTextVariants>,
    Omit<React.ComponentProps<"input">, "size" | "disabled" | "onChange"> {
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const InputText: React.FC<InputTextProps> = ({
  size,
  disabled,
  className,
  onChange,
  label,
  id,
  ...props
}) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s/g, '-')}`;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-violet-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cx(inputTextVariants({ size, disabled }), className)}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        {...props}
      />
    </div>
  );
};