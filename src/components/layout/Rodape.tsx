import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Rotulo from "@/components/ui/Rotulo";

export default function Rodape() {
  return (
    <footer className="bg-crepusculo text-nevoa">
      <Container className="py-16 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Image
              src="/images/logo/logo-horizontal-claro.svg"
              alt="Estúdio Vazio"
              width={770}
              height={145}
              className="h-7 w-auto"
            />
            <p className="mt-4 font-titulo text-lg">
              Casas de madeira e vidro para quem escolheu viver na serra capixaba.
            </p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <div>
              <Rotulo className="text-ambar">Contato</Rotulo>
              <ul className="mt-4 space-y-2">
                {/* Número do WhatsApp entra aqui quando o usuário criar (pendência) */}
                <li>WhatsApp</li>
                {/* E-mail do projeto entra aqui quando o usuário criar o Gmail (pendência) */}
                <li>E-mail</li>
              </ul>
            </div>

            <div>
              <Rotulo className="text-ambar">Escritório</Rotulo>
              <ul className="mt-4 space-y-2">
                <li>Vitória · ES</li>
                <li>Atendimento com hora marcada</li>
                <li>Seg. a sex., das 9h às 18h</li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-nevoa/20 pt-6 font-rotulo text-xs">
          © 2026 Estúdio Vazio · CAU A000000-0 ·{" "}
          <Link href="/politica-de-privacidade">Política de privacidade</Link>
        </p>
      </Container>
    </footer>
  );
}
