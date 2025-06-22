import React from "react";

interface TextInlineProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const TextInline: React.FC<TextInlineProps> = ({ children, className = "", ...props }) => {
  return (
    <span
      className={`text-base text-[var(--color-text-primary)] ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};