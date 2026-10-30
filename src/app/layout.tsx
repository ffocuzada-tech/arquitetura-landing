import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import Cabecalho from "@/components/layout/Cabecalho";
import Rodape from "@/components/layout/Rodape";
import Ceu from "@/components/layout/Ceu";
import ModoHtml from "@/components/layout/ModoHtml";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
});

const urlBase = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(urlBase),
  title: "Estúdio Vazio · Casas de madeira e vidro na serra capixaba",
  description:
    "Projetos de casas de madeira e vidro para quem tem terreno na região de Pedra Azul (ES). Da visita ao terreno à entrega das chaves.",
  openGraph: {
    title: "Estúdio Vazio · Casas de madeira e vidro na serra capixaba",
    description:
      "Projetos de casas de madeira e vidro para quem tem terreno na região de Pedra Azul (ES). Da visita ao terreno à entrega das chaves.",
    images: ["/images/hero/hero-poster.webp"],
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${newsreader.variable} ${hankenGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <ModoHtml />
        <Ceu />
        <Cabecalho />
        {children}
        <Rodape />
      </body>
    </html>
  );
}
