import type { ReactNode } from "react";
import Container from "./Container";
import Rotulo from "./Rotulo";

const estilosPorFundo = {
  nevoa: { fundo: "bg-nevoa", texto: "text-carvao", rotulo: "text-terra" },
  linho: { fundo: "bg-linho", texto: "text-carvao", rotulo: "text-terra" },
  crepusculo: { fundo: "bg-crepusculo", texto: "text-nevoa", rotulo: "text-ambar" },
} as const;

type SecaoProps = {
  id: string;
  fundo: keyof typeof estilosPorFundo;
  rotulo?: string;
  children?: ReactNode;
  className?: string;
};

export default function Secao({ id, fundo, rotulo, children, className = "" }: SecaoProps) {
  const estilo = estilosPorFundo[fundo];

  return (
    <section
      id={id}
      className={`${estilo.fundo} ${estilo.texto} scroll-mt-24 py-20 md:py-32 ${className}`}
    >
      <Container>
        {rotulo && <Rotulo className={`mb-6 block ${estilo.rotulo}`}>{rotulo}</Rotulo>}
        {children}
      </Container>
    </section>
  );
}
