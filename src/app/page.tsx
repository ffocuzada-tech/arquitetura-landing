import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Projetos from "@/components/sections/Projetos";
import PorQueNos from "@/components/sections/PorQueNos";
import Processo from "@/components/sections/Processo";
import Depoimentos from "@/components/sections/Depoimentos";
import Contato from "@/components/sections/Contato";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Projetos />
      <PorQueNos />
      <Processo />
      <Depoimentos />
      <Contato />
    </>
  );
}
