export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "cancelamento",
    question: "Como funciona o cancelamento?",
    answer:
      "Cada hospedagem informa até quantos dias antes do check-in o cancelamento é gratuito. Esse prazo aparece na página da hospedagem e no checkout, antes de você pagar. Depois do prazo, pode haver reembolso parcial. Você cancela em Minha Viagem, sem precisar ligar.",
    keywords: ["reembolso", "desistir", "estorno"],
  },
  {
    id: "pagamento",
    question: "Quais formas de pagamento vocês aceitam?",
    answer:
      "Cartão de crédito em até 12 vezes, respeitando o valor mínimo por parcela, e PIX. Todo pagamento acontece dentro da plataforma, com o valor total mostrado antes da confirmação. Nenhuma hospedagem parceira pede transferência direta.",
    keywords: ["cartão", "parcelas", "parcelamento"],
  },
  {
    id: "pix",
    question: "Tem desconto no PIX?",
    answer:
      "Sim. Pagando com PIX você ganha 5% de desconto sobre o total da estadia. O código expira em alguns minutos e a reserva é confirmada assim que o banco avisa o pagamento, normalmente em segundos.",
    keywords: ["desconto", "pagar", "qr code"],
  },
  {
    id: "comprovante",
    question: "Onde vejo o comprovante da reserva?",
    answer:
      "O comprovante fica em Minha Viagem, junto com o endereço, o horário de check-in e as regras da hospedagem. Ele também é enviado por e-mail logo após a confirmação. Se precisar de nota fiscal, ela é emitida pela hospedagem no check-out.",
    keywords: ["voucher", "recibo", "nota fiscal", "e-mail"],
  },
  {
    id: "vans",
    question: "A hospedagem tem vaga para van ou ônibus?",
    answer:
      "Use o filtro Estacionamento na busca e escolha van ou ônibus. Só aparecem hospedagens com vaga confirmada por nossa equipe. Em datas de festa, reserve com antecedência: essas vagas são as primeiras a acabar.",
    keywords: ["estacionamento", "excursão", "grupo", "motorista"],
  },
  {
    id: "acessibilidade",
    question: "Como sei se a hospedagem é acessível de verdade?",
    answer:
      "O selo Acessibilidade verificada significa que nossa equipe conferiu presencialmente entrada sem degraus, banheiro adaptado e circulação. Na página da hospedagem você vê a lista completa do que existe, sem termos vagos.",
    keywords: ["cadeirante", "idoso", "rampa", "elevador"],
  },
  {
    id: "grupos",
    question: "Vocês atendem grupos e romarias?",
    answer:
      "Sim. Ao buscar, informe o número de pessoas e de quartos. Para grupos acima de 20 pessoas, marque o perfil Grupos e romarias: mostramos hospedagens com capacidade, refeições para grupo e vaga para ônibus. A reserva é feita de uma vez, com um só pagamento.",
    keywords: ["romaria", "excursão", "paróquia", "caravana"],
  },
  {
    id: "alterar-datas",
    question: "Posso alterar as datas depois de reservar?",
    answer:
      "Sim, em Minha Viagem, enquanto houver disponibilidade e dentro do prazo de cancelamento gratuito. Se as novas datas tiverem diária diferente, mostramos a diferença antes de você confirmar.",
    keywords: ["mudar", "remarcar", "trocar"],
  },
  {
    id: "criancas",
    question: "Crianças pagam?",
    answer:
      "Depende da hospedagem e da idade. Informe a idade de cada criança na busca: o preço já aparece calculado e a política de crianças fica visível na página da hospedagem, sem surpresa no checkout.",
    keywords: ["bebê", "berço", "família", "idade"],
  },
  {
    id: "check-in-cedo",
    question: "Chego de madrugada. Consigo fazer check-in cedo?",
    answer:
      "Muitas hospedagens têm recepção 24h e aceitam entrada antecipada quando há quarto livre. Filtre por Recepção 24h e, depois de reservar, avise o horário de chegada em Minha Viagem para a hospedagem se preparar.",
    keywords: ["madrugada", "recepção 24h", "chegada", "early"],
  },
];
