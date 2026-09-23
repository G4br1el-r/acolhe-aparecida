import type { LegalDocumentContent } from "./legal-document";

export const PRIVACY_POLICY: LegalDocumentContent = {
  title: "Política de privacidade",
  intro:
    "Esta política explica quais dados coletamos, por que precisamos deles e como você pode controlá-los. Seguimos a Lei Geral de Proteção de Dados (Lei 13.709/2018) e tratamos seus dados apenas para fazer sua viagem acontecer.",
  lastUpdated: "2026-09-01",
  sections: [
    {
      id: "dados-coletados",
      title: "1. Quais dados coletamos",
      paragraphs: [
        "Coletamos apenas o necessário para reservar, pagar e dar suporte.",
      ],
      bullets: [
        "Dados de conta: nome, e-mail, telefone e CPF, usados para identificar você e emitir o comprovante.",
        "Dados da reserva: datas, hóspedes, idades de crianças, necessidades de acessibilidade e observações que você escrever.",
        "Dados de pagamento: processados diretamente pela instituição de pagamento. Não armazenamos o número completo do seu cartão.",
        "Dados de uso: páginas visitadas, buscas feitas, favoritos e comparações, para melhorar a plataforma e lembrar suas preferências.",
      ],
    },
    {
      id: "finalidades",
      title: "2. Para que usamos",
      paragraphs: [
        "Usamos seus dados para confirmar reservas, processar pagamentos e reembolsos, enviar comprovantes e avisos sobre a viagem, prestar suporte, prevenir fraudes e cumprir obrigações legais, como o registro de hóspedes exigido das hospedagens.",
        "Com seu consentimento, também enviamos sugestões de datas e hospedagens. Você pode desativar isso a qualquer momento nas configurações da conta.",
      ],
    },
    {
      id: "compartilhamento",
      title: "3. Com quem compartilhamos",
      paragraphs: [
        "Compartilhamos com a hospedagem parceira apenas o necessário para receber você: nome, telefone, datas, número de hóspedes e observações da reserva. A hospedagem não recebe seus dados de pagamento.",
        "Compartilhamos com instituições de pagamento para processar cobranças e reembolsos, e com provedores de infraestrutura que hospedam a plataforma sob contrato de confidencialidade. Não vendemos dados pessoais.",
      ],
    },
    {
      id: "bases-legais",
      title: "4. Bases legais",
      paragraphs: [
        "Tratamos dados com base na execução do contrato de reserva, no cumprimento de obrigações legais, no legítimo interesse de prevenir fraudes e melhorar o serviço e, para comunicações de marketing, no seu consentimento.",
      ],
    },
    {
      id: "retencao",
      title: "5. Por quanto tempo guardamos",
      paragraphs: [
        "Dados de reservas e pagamentos ficam guardados pelo prazo exigido pela legislação fiscal e de consumo, normalmente 5 anos após a estadia. Dados de conta ficam enquanto a conta existir. Favoritos e comparações ficam no seu próprio dispositivo e você pode apagá-los quando quiser.",
      ],
    },
    {
      id: "seus-direitos",
      title: "6. Seus direitos",
      paragraphs: ["Você pode, a qualquer momento e sem custo:"],
      bullets: [
        "confirmar se tratamos seus dados e acessá-los;",
        "corrigir dados incompletos ou desatualizados;",
        "pedir a exclusão de dados desnecessários ou tratados com base no consentimento;",
        "pedir a portabilidade dos seus dados para outro serviço;",
        "revogar o consentimento para comunicações de marketing;",
        "saber com quem compartilhamos seus dados.",
      ],
    },
    {
      id: "cookies",
      title: "7. Cookies e armazenamento local",
      paragraphs: [
        "Usamos cookies essenciais para manter você conectado e armazenamento local do navegador para lembrar buscas recentes, favoritos e hospedagens em comparação. Não usamos cookies de rastreamento de terceiros para publicidade.",
      ],
    },
    {
      id: "seguranca",
      title: "8. Segurança",
      paragraphs: [
        "Toda a comunicação com a plataforma é criptografada. O acesso interno aos dados é restrito à equipe que precisa deles para atender você, com registro de acessos. Em caso de incidente que possa gerar risco, avisaremos você e a Autoridade Nacional de Proteção de Dados nos prazos legais.",
      ],
    },
    {
      id: "criancas",
      title: "9. Dados de crianças",
      paragraphs: [
        "Coletamos apenas a idade das crianças informadas na reserva, para calcular preço e capacidade. Contas na plataforma são exclusivas para maiores de 18 anos.",
      ],
    },
    {
      id: "encarregado",
      title: "10. Encarregado de dados e contato",
      paragraphs: [
        "Para exercer seus direitos ou tirar dúvidas sobre esta política, escreva para privacidade@acolheraparecida.com.br. Respondemos em até 15 dias.",
      ],
    },
  ],
};
