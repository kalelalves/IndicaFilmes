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
  ...props
}) => {
  return (
    <input
      className={cx(inputTextVariants({ size, disabled }), className)}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      {...props}
    />
  );
};
