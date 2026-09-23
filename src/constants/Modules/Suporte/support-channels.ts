export const SUPPORT_HOURS = {
  opensAt: "7h",
  closesAt: "22h",
  days: "todos os dias",
} as const;

export const SUPPORT_EMAIL = "ajuda@acolheraparecida.com.br";

export const SUPPORT_RESPONSE_TIME_LABEL = "Respondemos em até 2 horas";

export const CONTACT_MOCK_DELAY_IN_MS = 900;

export type SupportChannel = {
  id: string;
  title: string;
  description: string;
  isComingSoon: boolean;
};

export const SUPPORT_CHANNELS: SupportChannel[] = [
  {
    id: "email",
    title: "E-mail",
    description: `${SUPPORT_EMAIL}. ${SUPPORT_RESPONSE_TIME_LABEL} dentro do horário de atendimento.`,
    isComingSoon: false,
  },
  {
    id: "chat",
    title: "Chat na plataforma",
    description:
      "Atendimento em tempo real dentro da sua conta, para quem já está com a viagem marcada.",
    isComingSoon: true,
  },
];

export const NO_WHATSAPP_NOTICE =
  "Reserva, pagamento, alteração e cancelamento acontecem aqui na plataforma. Nenhuma etapa da reserva passa por WhatsApp e nenhuma hospedagem parceira vai pedir pagamento por fora.";
