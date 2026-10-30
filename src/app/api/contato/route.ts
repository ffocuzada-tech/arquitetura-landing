import { NextResponse } from "next/server";
import { enviarEmailContato } from "@/lib/email";
import { validarContato, type DadosContato } from "@/lib/validacao";

export async function POST(request: Request) {
  let corpo: Record<string, unknown>;
  try {
    corpo = await request.json();
  } catch {
    return NextResponse.json({ erro: "Não foi possível ler os dados enviados." }, { status: 400 });
  }

  if (typeof corpo.site === "string" && corpo.site.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const dados: DadosContato = {
    necessidade: typeof corpo.necessidade === "string" ? corpo.necessidade : "",
    local: typeof corpo.local === "string" ? corpo.local : "",
    tamanho: typeof corpo.tamanho === "string" ? corpo.tamanho : "",
    nome: typeof corpo.nome === "string" ? corpo.nome : "",
    whatsapp: typeof corpo.whatsapp === "string" ? corpo.whatsapp : "",
  };

  const erros = validarContato(dados);
  if (Object.keys(erros).length > 0) {
    return NextResponse.json({ erro: "Dados inválidos.", campos: erros }, { status: 400 });
  }

  try {
    await enviarEmailContato(dados);
  } catch {
    return NextResponse.json({ erro: "Não foi possível enviar o e-mail." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
