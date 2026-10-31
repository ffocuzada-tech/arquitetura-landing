import type { Metadata } from "next";
import Secao from "@/components/ui/Secao";
import Rotulo from "@/components/ui/Rotulo";

export const metadata: Metadata = {
  title: "Política de privacidade · Estúdio Vazio",
};

export default function PoliticaDePrivacidade() {
  return (
    <Secao id="politica-de-privacidade" className="pt-32 md:pt-44">
      <div className="max-w-[680px]">
        <h1 className="font-titulo text-3xl font-light leading-tight text-carvao md:text-5xl">
          Política de privacidade
        </h1>
        <Rotulo className="mt-4 block text-terra">
          Última atualização: 30 de outubro de 2026
        </Rotulo>

        <div className="mt-12 flex flex-col gap-10 font-texto text-base text-carvao md:text-lg">
          <section>
            <h2 className="font-titulo text-2xl font-light text-carvao">Quem somos</h2>
            <p className="mt-3">
              O Estúdio Vazio é um escritório de arquitetura em Vitória (ES). Esta política
              explica como tratamos os dados que você nos envia por este site.
            </p>
          </section>

          <section>
            <h2 className="font-titulo text-2xl font-light text-carvao">
              Quais dados recebemos
            </h2>
            <p className="mt-3">
              Pelo formulário &quot;Conte sobre seu terreno&quot;: seu nome, seu número de
              WhatsApp e as respostas às três perguntas (o que você precisa, onde fica o terreno
              e o tamanho aproximado da casa). Não pedimos nenhum outro dado.
            </p>
          </section>

          <section>
            <h2 className="font-titulo text-2xl font-light text-carvao">Para que usamos</h2>
            <p className="mt-3">
              Só para responder ao seu contato e conversar sobre o seu projeto. Não enviamos
              propaganda e não vendemos nem compartilhamos seus dados para outros fins.
            </p>
          </section>

          <section>
            <h2 className="font-titulo text-2xl font-light text-carvao">
              Como os dados chegam até nós
            </h2>
            <p className="mt-3">
              Se você escolher &quot;Agendar reunião pelo WhatsApp&quot;, a mensagem é aberta no
              seu próprio WhatsApp e só é enviada se você quiser. Se escolher &quot;Prefiro que
              me liguem&quot;, os dados são enviados para o e-mail do escritório. O site não
              guarda nenhuma cópia.
            </p>
          </section>

          <section>
            <h2 className="font-titulo text-2xl font-light text-carvao">
              Quem mais tem acesso
            </h2>
            <p className="mt-3">
              Os dados passam apenas pelos serviços necessários para chegar até nós: o provedor
              de e-mail do escritório (Google) e a empresa que hospeda o site (Vercel). O
              WhatsApp é usado só quando você mesmo envia a mensagem.
            </p>
          </section>

          <section>
            <h2 className="font-titulo text-2xl font-light text-carvao">Por quanto tempo</h2>
            <p className="mt-3">
              Mantemos sua mensagem só enquanto durar a conversa sobre o seu projeto. Se não
              houver contratação, ela é apagada em até 12 meses.
            </p>
          </section>

          <section>
            <h2 className="font-titulo text-2xl font-light text-carvao">Cookies</h2>
            <p className="mt-3">
              Este site não usa cookies de rastreamento, de publicidade ou de estatísticas de
              visita. Por isso, não mostramos aviso de cookies.
            </p>
          </section>

          <section>
            <h2 className="font-titulo text-2xl font-light text-carvao">Seus direitos</h2>
            <p className="mt-3">
              Pela Lei Geral de Proteção de Dados (Lei 13.709/2018), você pode pedir a qualquer
              momento para saber quais dados temos sobre você, corrigi-los ou apagá-los. Basta
              escrever para{" "}
              <a
                href="mailto:estudiovazio.contato@gmail.com"
                className="text-madeira underline hover:text-carvao"
              >
                estudiovazio.contato@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </Secao>
  );
}
