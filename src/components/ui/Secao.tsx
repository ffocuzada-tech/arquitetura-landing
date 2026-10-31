import type { ReactNode } from "react";
import Container from "./Container";
import Rotulo from "./Rotulo";

type SecaoProps = {
  id: string;
  escuro?: boolean;
  rotulo?: string;
  children?: ReactNode;
  className?: string;
};

export default function Secao({ id, escuro = false, rotulo, children, className = "" }: SecaoProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 py-20 md:py-32 ${escuro ? "text-nevoa" : "text-carvao"} ${className}`}
    >
      <Container>
        {rotulo && (
          <Rotulo className={`mb-6 block ${escuro ? "text-ambar" : "text-terra"}`}>{rotulo}</Rotulo>
        )}
        {children}
      </Container>
    </section>
  );
}
