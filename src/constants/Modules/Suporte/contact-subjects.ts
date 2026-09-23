export const CONTACT_SUBJECT_IDS = [
  "reserva",
  "pagamento",
  "cancelamento",
  "acessibilidade",
  "grupos",
  "parceria",
  "outro",
] as const;

export type ContactSubjectId = (typeof CONTACT_SUBJECT_IDS)[number];

export const CONTACT_SUBJECTS: Record<ContactSubjectId, string> = {
  reserva: "Dúvida sobre uma reserva",
  pagamento: "Pagamento ou comprovante",
  cancelamento: "Cancelamento ou alteração de datas",
  acessibilidade: "Acessibilidade",
  grupos: "Grupos, romarias e excursões",
  parceria: "Quero cadastrar minha hospedagem",
  outro: "Outro assunto",
};
