import React from "react";

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ children, className = "", ...props }) => {
  return (
    <span
      className={`text-base text-[var(--color-text-primary)] ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};