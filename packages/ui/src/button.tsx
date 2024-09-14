"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick:  ()=> void;
}

export const Button = ({ children, onClick  }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
    >
      {children}
    </button>
  );
};
