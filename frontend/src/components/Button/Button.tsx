import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`
        px-5 py-3 rounded-lg font-semibold
        text-black bg-[var(--color-accent-cyan)]
        hover:bg-[var(--color-accent-pink)] hover:text-white
        transition duration-200 ease-in-out
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};