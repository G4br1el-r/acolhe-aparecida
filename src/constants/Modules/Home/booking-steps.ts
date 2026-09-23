export type BookingStepDetail = {
  label: string;
  value: string;
};

export type BookingStep = {
  id: string;
  order: string;
  title: string;
  summary: string;
  imageUrl: string;
  imageAlt: string;
  imageCaption: string;
  details: BookingStepDetail[];
};

export const BOOKING_STEPS: BookingStep[] = [
  {
    id: "voce-ja-sabe-o-destino",
    order: "01",
    title: "O destino já é Aparecida",
    summary:
      "Você não perde tempo dizendo para onde vai. Começa escolhendo as datas, quantas pessoas e o que a sua viagem precisa ter.",
    imageUrl:
      "https://images.unsplash.com/photo-1636483022318-19f623b66075?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    imageAlt: "Família caminhando junta em direção à hospedagem",
    imageCaption:
      "A busca já começa dentro de Aparecida, com as distâncias medidas a partir do Santuário.",
    details: [
      { label: "Você informa", value: "Check-in, check-out e quem vai" },
      {
        label: "Já vem pronto",
        value: "Distância até o Santuário de cada opção",
      },
      {
        label: "Filtros úteis",
        value: "Acessibilidade, grupos, vans e romarias",
      },
    ],
  },
  {
    id: "voce-reserva-aqui",
    order: "02",
    title: "Você reserva aqui",
    summary:
      "Pagamento por PIX ou cartão parcelado, dentro da plataforma. Sem depósito na conta de ninguém e sem fechar por WhatsApp.",
    imageUrl:
      "https://images.unsplash.com/photo-1599050751795-6cdaafbc2319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    imageAlt: "Pessoa concluindo um pagamento pelo celular",
    imageCaption:
      "O valor sai da sua conta direto para a plataforma, nunca para um intermediário.",
    details: [
      { label: "Formas de pagamento", value: "PIX ou cartão em até 12x" },
      {
        label: "Cobrado na reserva",
        value: "Valor integral ou primeira parcela",
      },
      { label: "Confirmação", value: "Imediata, por e-mail e na sua conta" },
    ],
  },
  {
    id: "a-hospedagem-e-visitada",
    order: "03",
    title: "A hospedagem é visitada antes",
    summary:
      "Cada parceiro é visitado e fotografado pela nossa equipe antes de entrar na plataforma. As fotos que você vê são as do lugar onde você vai dormir.",
    imageUrl:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    imageAlt: "Quarto de hospedagem parceira fotografado pela equipe",
    imageCaption:
      "Nenhuma hospedagem entra na plataforma sem uma visita presencial da nossa equipe.",
    details: [
      {
        label: "Conferimos",
        value: "Entrada, banheiro e circulação acessível",
      },
      { label: "Conferimos", value: "Vagas de carro, van e ônibus" },
      { label: "Conferimos", value: "Café da manhã e horário da recepção" },
    ],
  },
  {
    id: "sua-viagem-fica-organizada",
    order: "04",
    title: "Sua viagem fica organizada num lugar só",
    summary:
      "Depois de reservar, tudo o que você precisa fica na área Minha Viagem: comprovante, endereço, horários e o contato da hospedagem.",
    imageUrl:
      "https://images.unsplash.com/photo-1571867424488-4565932edb41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    imageAlt: "Viajante consultando os detalhes da reserva no celular",
    imageCaption:
      "O comprovante e os horários ficam acessíveis mesmo depois de você chegar em Aparecida.",
    details: [
      { label: "Fica salvo", value: "Comprovante e recibo da reserva" },
      { label: "Fica salvo", value: "Endereço, check-in e check-out" },
      { label: "Fica salvo", value: "Contato direto da hospedagem" },
    ],
  },
  {
    id: "se-algo-der-errado",
    order: "05",
    title: "Se algo não sair como combinado",
    summary:
      "A política de cancelamento aparece antes do pagamento, nunca depois. E durante a viagem existe alguém para atender.",
    imageUrl:
      "https://images.unsplash.com/photo-1573567199032-50a155ba6de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    imageAlt: "Recepção de hospedagem pronta para atender hóspedes",
    imageCaption:
      "O suporte é da plataforma, não do anúncio. Você fala com quem pode resolver.",
    details: [
      { label: "Cancelamento gratuito", value: "Até 7 dias antes do check-in" },
      { label: "Reembolso", value: "No mesmo meio de pagamento" },
      { label: "Suporte", value: "Todos os dias, das 7h às 22h" },
    ],
  },
];
