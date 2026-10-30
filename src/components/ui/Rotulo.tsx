import type { ReactNode } from "react";

type RotuloProps = {
  children: ReactNode;
  className?: string;
};

export default function Rotulo({ children, className = "" }: RotuloProps) {
  return (
    <span className={`font-rotulo text-xs uppercase tracking-wide ${className}`}>
      {children}
    </span>
  );
}
