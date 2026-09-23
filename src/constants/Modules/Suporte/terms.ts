import type { LegalDocumentContent } from "./legal-document";

export const TERMS_OF_USE: LegalDocumentContent = {
  title: "Termos de uso",
  intro:
    "Estes termos explicam como funciona o Acolher Aparecida, o que você pode esperar de nós e o que esperamos de você ao reservar uma hospedagem pela plataforma. Escrevemos em linguagem simples de propósito.",
  lastUpdated: "2026-09-01",
  sections: [
    {
      id: "quem-somos",
      title: "1. Quem somos e o que fazemos",
      paragraphs: [
        "O Acolher Aparecida é uma plataforma digital que conecta viajantes a hospedagens em Aparecida-SP. Nós intermediamos a reserva e o pagamento, verificamos as hospedagens parceiras e damos suporte durante toda a viagem.",
        "A hospedagem em si é prestada pela hospedagem parceira, que é responsável pelo quarto, pela limpeza, pelas refeições e pelo atendimento no local. Nós respondemos pela plataforma, pela cobrança e pela mediação de qualquer problema.",
      ],
    },
    {
      id: "conta",
      title: "2. Sua conta",
      paragraphs: [
        "Para reservar você precisa de uma conta com nome completo, e-mail e telefone válidos. Você é responsável por manter a senha em segredo e por tudo o que acontece na sua conta.",
        "Reservas para terceiros são permitidas, desde que os dados de quem vai se hospedar estejam corretos. Menores de 18 anos só podem se hospedar acompanhados de um responsável.",
      ],
    },
    {
      id: "reservas",
      title: "3. Como a reserva funciona",
      paragraphs: [
        "A reserva é confirmada somente após a aprovação do pagamento dentro da plataforma. Você recebe o comprovante por e-mail e em Minha Viagem, com endereço, horário de check-in e regras da casa.",
        "Todo o processo acontece na plataforma. Nenhuma hospedagem parceira está autorizada a pedir pagamento direto, transferência ou sinal por fora. Se isso acontecer, avise o suporte.",
      ],
      bullets: [
        "Os preços exibidos já incluem todas as taxas obrigatórias.",
        "Taxas opcionais, como cama extra ou refeição, aparecem antes do pagamento e só são cobradas se você escolher.",
        "O valor cobrado no momento da confirmação é sempre mostrado de forma destacada no checkout.",
      ],
    },
    {
      id: "pagamentos",
      title: "4. Pagamentos",
      paragraphs: [
        "Aceitamos cartão de crédito, com parcelamento sem juros conforme as condições exibidas no checkout, e PIX, com desconto informado antes da confirmação. O processamento é feito por instituições de pagamento reguladas pelo Banco Central.",
        "Em caso de reembolso, o valor volta pelo mesmo meio de pagamento. No cartão, o prazo depende da operadora e costuma levar até duas faturas. No PIX, o estorno é feito em até 5 dias úteis.",
      ],
    },
    {
      id: "cancelamento",
      title: "5. Cancelamento e alteração de datas",
      paragraphs: [
        "Cada hospedagem define até quantos dias antes do check-in o cancelamento é gratuito. Esse prazo aparece na página da hospedagem e no checkout. Cancelando dentro do prazo, você recebe o reembolso integral.",
        "Após o prazo, pode haver reembolso parcial, também informado antes da reserva. Alterações de datas seguem a mesma regra e dependem de disponibilidade.",
        "Se a hospedagem cancelar a reserva, você recebe o valor integral de volta e nossa equipe ajuda a encontrar outra opção equivalente.",
      ],
    },
    {
      id: "responsabilidades",
      title: "6. Responsabilidades",
      paragraphs: [
        "As hospedagens parceiras respondem pelas informações que publicam, pela qualidade do serviço e pelo cumprimento das leis aplicáveis à hospedagem, incluindo o registro de hóspedes.",
        "Nós respondemos pela exatidão do processo de reserva e pagamento, pela guarda dos seus dados e pela mediação de conflitos. Verificamos presencialmente as hospedagens antes de entrarem na plataforma, mas não controlamos a operação diária de cada uma.",
        "Você se compromete a respeitar as regras da hospedagem, a informar corretamente o número de hóspedes e a zelar pelo espaço durante a estadia.",
      ],
    },
    {
      id: "avaliacoes",
      title: "7. Avaliações",
      paragraphs: [
        "Só quem concluiu uma estadia pode avaliar. As avaliações são publicadas na íntegra, exceto quando contêm dados pessoais de terceiros, ofensas ou conteúdo sem relação com a hospedagem.",
      ],
    },
    {
      id: "propriedade",
      title: "8. Conteúdo e propriedade intelectual",
      paragraphs: [
        "Textos, fotos, marca e código da plataforma pertencem ao Acolher Aparecida ou a seus parceiros. As fotos das hospedagens são produzidas por nossa equipe ou licenciadas pelos parceiros e não podem ser reutilizadas sem autorização.",
      ],
    },
    {
      id: "alteracoes",
      title: "9. Alterações destes termos",
      paragraphs: [
        "Podemos atualizar estes termos para refletir novos serviços ou mudanças na lei. Avisaremos por e-mail com pelo menos 15 dias de antecedência quando a mudança afetar reservas já feitas.",
      ],
    },
    {
      id: "contato",
      title: "10. Como falar com a gente",
      paragraphs: [
        "Dúvidas sobre estes termos podem ser enviadas pela página de suporte ou pelo e-mail ajuda@acolheraparecida.com.br. Atendemos todos os dias, das 7h às 22h.",
      ],
    },
  ],
};
