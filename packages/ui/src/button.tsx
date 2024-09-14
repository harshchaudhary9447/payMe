"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: ()=> Promise<void>
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
