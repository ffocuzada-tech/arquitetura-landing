import nodemailer from "nodemailer";
import type { DadosContato } from "@/lib/validacao";

export async function enviarEmailContato(dados: DadosContato) {
  const usuario = process.env.GMAIL_USUARIO;
  const senha = process.env.GMAIL_SENHA_APP;
  const destino = process.env.EMAIL_DESTINO;

  if (!usuario || !senha || !destino) {
    throw new Error("Variáveis de e-mail do projeto não configuradas.");
  }

  const transportador = nodemailer.createTransport({
    service: "gmail",
    auth: { user: usuario, pass: senha },
  });

  const digitosWhatsapp = dados.whatsapp.replace(/\D/g, "");

  await transportador.sendMail({
    from: usuario,
    to: destino,
    replyTo: usuario,
    subject: `Novo contato pelo site: ${dados.nome}`,
    text: [
      `O que precisa: ${dados.necessidade}`,
      `Onde fica o terreno: ${dados.local}`,
      `Tamanho da casa: ${dados.tamanho}`,
      `Nome: ${dados.nome}`,
      `WhatsApp: ${dados.whatsapp}`,
      "",
      `Responder pelo WhatsApp: https://wa.me/55${digitosWhatsapp}`,
    ].join("\n"),
  });
}
