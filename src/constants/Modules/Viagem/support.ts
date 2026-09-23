export type SupportFaqEntry = {
  question: string;
  answer: string;
};

export const SUPPORT_RESPONSE_TIME_LABEL = "Respondemos em até 2 horas";
export const SUPPORT_HOURS_LABEL = "Todos os dias, das 7h às 23h";

export const SUPPORT_FAQ: SupportFaqEntry[] = [
  {
    question: "Preciso levar documento?",
    answer:
      "Sim. Todos os hóspedes apresentam documento com foto no check-in. Crianças podem usar certidão de nascimento.",
  },
  {
    question: "Posso chegar antes do horário de check-in?",
    answer:
      "A maioria das hospedagens guarda as malas sem custo. O quarto fica pronto no horário informado na sua reserva.",
  },
  {
    question: "Como funciona o reembolso se eu cancelar?",
    answer:
      "Dentro do prazo gratuito, devolvemos 100% no mesmo meio de pagamento em até 5 dias úteis. Fora do prazo, vale a política mostrada na reserva.",
  },
  {
    question: "Posso trocar o nome de um hóspede?",
    answer:
      "Pode. Envie uma mensagem aqui com o nome novo e a hospedagem é avisada na hora.",
  },
];

export const SUPPORT_SUBJECTS = [
  "Dúvida sobre a reserva",
  "Trocar nome de hóspede",
  "Chegada fora do horário",
  "Acessibilidade e necessidades especiais",
  "Pagamento e reembolso",
  "Outro assunto",
] as const;

export type SupportSubject = (typeof SUPPORT_SUBJECTS)[number];
