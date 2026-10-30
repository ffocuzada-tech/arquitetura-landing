export const VALORES_NECESSIDADE = ["projeto", "projeto e obra"] as const;

export const VALORES_LOCAL = [
  "Pedra Azul",
  "Domingos Martins",
  "Venda Nova do Imigrante",
  "Marechal Floriano",
  "Outro",
] as const;

export const VALORES_TAMANHO = ["até 100 m²", "100 a 200 m²", "mais de 200 m²"] as const;

export type DadosContato = {
  necessidade: string;
  local: string;
  tamanho: string;
  nome: string;
  whatsapp: string;
};

export type ErrosContato = Partial<Record<keyof DadosContato, string>>;

export function whatsappValido(entrada: string) {
  const digitos = entrada.replace(/\D/g, "").length;
  return digitos === 10 || digitos === 11;
}

export function validarContato(dados: DadosContato): ErrosContato {
  const erros: ErrosContato = {};

  if (!(VALORES_NECESSIDADE as readonly string[]).includes(dados.necessidade)) {
    erros.necessidade = "Escolha uma opção.";
  }
  if (!(VALORES_LOCAL as readonly string[]).includes(dados.local)) {
    erros.local = "Escolha uma opção.";
  }
  if (!(VALORES_TAMANHO as readonly string[]).includes(dados.tamanho)) {
    erros.tamanho = "Escolha uma opção.";
  }
  if (!dados.nome.trim()) {
    erros.nome = "Informe seu nome.";
  }
  if (!whatsappValido(dados.whatsapp)) {
    erros.whatsapp = "Informe um WhatsApp com DDD.";
  }

  return erros;
}
