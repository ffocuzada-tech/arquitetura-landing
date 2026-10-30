export const NUMERO_WHATSAPP = "";

export const MENSAGEM_AGENDAR_REUNIAO =
  "Olá, Estúdio Vazio! Vim pelo site e gostaria de agendar uma reunião sobre o meu terreno.";

export function linkWhatsapp(mensagem: string) {
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}
