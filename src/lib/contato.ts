export const NUMERO_WHATSAPP = "";

export const MENSAGEM_AGENDAR_REUNIAO =
  "Olá, Estúdio Vazio! Vim pelo site e gostaria de agendar uma reunião sobre o meu terreno.";

export function linkWhatsapp(mensagem: string) {
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}

export function montarMensagemContato(dados: {
  nome: string;
  necessidade: string;
  local: string;
  tamanho: string;
}) {
  const localFrase = dados.local === "Outro" ? "outra cidade da região" : dados.local;
  return `Olá, Estúdio Vazio! Meu nome é ${dados.nome}. Tenho um terreno em ${localFrase} e quero ${dados.necessidade} para uma casa de ${dados.tamanho}. Gostaria de agendar uma reunião.`;
}

export function formatarWhatsapp(entrada: string) {
  const digitos = entrada.replace(/\D/g, "").slice(0, 11);
  if (!digitos) return "";

  const ddd = digitos.slice(0, 2);
  if (digitos.length <= 2) return `(${ddd}`;

  const resto = digitos.slice(2);
  const ehCelular = resto.startsWith("9");
  const numero = ehCelular ? resto.slice(1) : resto;
  const prefixo = ehCelular ? " 9" : "";

  if (numero.length === 0) return `(${ddd})${prefixo}`;
  if (numero.length <= 4) return `(${ddd})${prefixo} ${numero}`;
  return `(${ddd})${prefixo} ${numero.slice(0, 4)}-${numero.slice(4, 8)}`;
}
