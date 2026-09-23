import type { ReviewCategoryId } from "@/@types/Modules/Hospedagens/accommodation";
import type {
  Review,
  ReviewTravelerType,
} from "@/@types/Modules/Hospedagens/review";

type ReviewSeed = {
  slug: string;
  author: string;
  traveler: ReviewTravelerType;
  stayedAt: string;
  score: number;
  categories: Partial<Record<ReviewCategoryId, number>>;
  title?: string;
  comment: string;
  reply?: string;
  photoIds?: string[];
};

const REVIEW_PHOTO_BASE = "https://images.unsplash.com";
const REVIEW_PHOTO_WIDTH = 900;
const REPLY_DELAY_IN_DAYS = 3;
const MILLISECONDS_IN_A_DAY = 86_400_000;
const REVIEW_DAY_AFTER_STAY = 4;

const REVIEW_PHOTO_URLS: Record<string, { url: string; caption: string }> = {
  "quarto-hospede": {
    url: `${REVIEW_PHOTO_BASE}/photo-1631049552057-403cdb8f0658`,
    caption: "Quarto no dia da chegada",
  },
  "cafe-hospede": {
    url: `${REVIEW_PHOTO_BASE}/photo-1558497446-1fd7429d9be4`,
    caption: "Mesa do café da manhã",
  },
  "vista-hospede": {
    url: `${REVIEW_PHOTO_BASE}/photo-1609602126247-4ab7188b4aa1`,
    caption: "Vista da varanda",
  },
  "banheiro-hospede": {
    url: `${REVIEW_PHOTO_BASE}/photo-1702014859028-c773f15029db`,
    caption: "Banheiro adaptado",
  },
};

function isoDaysAfter(isoDate: string, days: number): string {
  const date = new Date(`${isoDate}T12:00:00`);
  return new Date(date.getTime() + days * MILLISECONDS_IN_A_DAY)
    .toISOString()
    .slice(0, 10);
}

function buildReview(seed: ReviewSeed, index: number): Review {
  const createdAt = isoDaysAfter(seed.stayedAt, REVIEW_DAY_AFTER_STAY);

  return {
    id: `rev-${seed.slug}-${index + 1}`,
    accommodationSlug: seed.slug,
    authorName: seed.author,
    travelerType: seed.traveler,
    stayedAt: seed.stayedAt,
    createdAt,
    overallScore: seed.score,
    categoryScores: seed.categories,
    title: seed.title,
    comment: seed.comment,
    photos: (seed.photoIds ?? []).map((photoId) => ({
      id: `${seed.slug}-${photoId}`,
      url: `${REVIEW_PHOTO_URLS[photoId].url}?auto=format&fit=crop&q=80&w=${REVIEW_PHOTO_WIDTH}`,
      caption: REVIEW_PHOTO_URLS[photoId].caption,
    })),
    partnerReply: seed.reply
      ? {
          text: seed.reply,
          repliedAt: isoDaysAfter(createdAt, REPLY_DELAY_IN_DAYS),
        }
      : undefined,
    isVerifiedStay: true,
  };
}

const REVIEW_SEEDS: ReviewSeed[] = [
  {
    slug: "hotel-nossa-senhora",
    author: "Marta e família",
    traveler: "familia",
    stayedAt: "2026-08-16",
    score: 5,
    categories: { limpeza: 5, atendimento: 5, localizacao: 5, cafe: 5 },
    title: "Fomos a pé para a missa das 6h",
    comment:
      "Ficamos a poucos minutos do Santuário e conseguimos ir a pé para a missa da manhã. O café começa às 6h, o que ajudou muito com as crianças.",
    reply:
      "Obrigado, Marta. Guardamos a mesa perto da janela para vocês na próxima vez.",
    photoIds: ["cafe-hospede"],
  },
  {
    slug: "hotel-nossa-senhora",
    author: "Seu José e dona Alice",
    traveler: "idosos",
    stayedAt: "2026-07-20",
    score: 4,
    categories: {
      limpeza: 5,
      atendimento: 4,
      localizacao: 5,
      acessibilidade: 4,
    },
    comment:
      "O elevador e o quarto acessível fizeram diferença para minha esposa. O quarto fica de frente para a rua e à noite chega algum barulho.",
    reply:
      "Agradecemos o retorno, seu José. Nos próximos pedidos podemos reservar um quarto para o lado do pátio, mais silencioso.",
  },
  {
    slug: "hotel-nossa-senhora",
    author: "Carla",
    traveler: "casal",
    stayedAt: "2026-06-13",
    score: 5,
    categories: { limpeza: 5, atendimento: 5, "custo-beneficio": 4 },
    comment:
      "Reservamos e pagamos tudo pela plataforma, sem precisar ligar para o hotel. Chegamos e o quarto já estava pronto.",
  },
  {
    slug: "hotel-nossa-senhora",
    author: "Paróquia Santo Antônio",
    traveler: "romaria",
    stayedAt: "2026-05-10",
    score: 5,
    categories: { atendimento: 5, localizacao: 5, estacionamento: 4 },
    comment:
      "Grupo de 14 pessoas. A recepção entregou as chaves por lista e ninguém ficou esperando no hall. Estacionamento pago, mas seguro.",
  },
  {
    slug: "hotel-rainha-do-brasil",
    author: "Regina e Paulo",
    traveler: "casal",
    stayedAt: "2026-08-30",
    score: 5,
    categories: { limpeza: 5, conforto: 5, cafe: 5, atendimento: 5 },
    title: "Silêncio de verdade",
    comment:
      "Rua tranquila mesmo no fim de semana. O café das 5h30 salvou a gente na missa do amanhecer. Cama boa, chuveiro forte.",
  },
  {
    slug: "hotel-rainha-do-brasil",
    author: "Fernanda",
    traveler: "sozinho",
    stayedAt: "2026-07-05",
    score: 4,
    categories: { limpeza: 4, atendimento: 5, localizacao: 4 },
    comment:
      "Viajei sozinha e me senti segura. O único ponto é que o Wi-Fi cai no último andar.",
    reply: "Obrigado, Fernanda. Trocamos os roteadores do 4º andar em agosto.",
  },
  {
    slug: "hotel-rainha-do-brasil",
    author: "Família Nogueira",
    traveler: "familia",
    stayedAt: "2026-04-18",
    score: 5,
    categories: { cafe: 5, conforto: 5, "custo-beneficio": 5 },
    comment:
      "Café farto, com bolo e fruta. Quarto triplo coube a família toda sem aperto.",
    photoIds: ["quarto-hospede"],
  },
  {
    slug: "pousada-mae-aparecida",
    author: "Juliana",
    traveler: "familia",
    stayedAt: "2026-08-09",
    score: 5,
    categories: { atendimento: 5, limpeza: 5, estrutura: 4 },
    title: "As crianças não queriam ir embora",
    comment:
      "O quintal com balanço foi o ponto alto. A dona esquentou a mamadeira do bebê às 22h sem reclamar. Voltaremos em outubro.",
    reply:
      "Que alegria, Juliana. O balanço novo já está esperando as crianças.",
  },
  {
    slug: "pousada-mae-aparecida",
    author: "Roberto",
    traveler: "casal",
    stayedAt: "2026-06-27",
    score: 5,
    categories: { limpeza: 5, atendimento: 5, "custo-beneficio": 5 },
    comment:
      "Preço justo, quarto impecável e um café da manhã feito em casa. Estacionamos dentro do portão.",
  },
  {
    slug: "pousada-mae-aparecida",
    author: "Dona Ivone",
    traveler: "idosos",
    stayedAt: "2026-05-03",
    score: 4,
    categories: { atendimento: 5, conforto: 4, localizacao: 4 },
    comment:
      "Fui com minha irmã, ambas com mais de 70. A caminhada até o Santuário é tranquila, mas há uma escada para os quartos de cima. Peça o térreo.",
  },
  {
    slug: "hotel-sao-miguel",
    author: "Regina P.",
    traveler: "casal",
    stayedAt: "2026-08-14",
    score: 5,
    categories: { acessibilidade: 5, atendimento: 5, limpeza: 5 },
    title: "Do jeito que estava descrito",
    comment:
      "Meu marido usa cadeira de rodas. Sem degrau na entrada, barra no banheiro, chuveiro sem box. Não teve surpresa.",
    photoIds: ["banheiro-hospede"],
    reply:
      "Obrigado, Regina. É exatamente para isso que fazemos a visita técnica.",
  },
  {
    slug: "hotel-sao-miguel",
    author: "Antônio Carlos",
    traveler: "idosos",
    stayedAt: "2026-07-11",
    score: 4,
    categories: { acessibilidade: 4, cafe: 5, conforto: 4 },
    comment:
      "Elevador amplo, quarto no térreo perto do salão. O café é bom, mas o salão enche depois das 8h.",
  },
  {
    slug: "hotel-sao-miguel",
    author: "Grupo Terço dos Homens",
    traveler: "romaria",
    stayedAt: "2026-03-14",
    score: 4,
    categories: { atendimento: 5, estacionamento: 3, localizacao: 5 },
    comment:
      "Recepção organizada com o grupo. O estacionamento é pago e pequeno, viemos em carros e dois ficaram na rua.",
  },
  {
    slug: "pousada-do-devoto",
    author: "Camila e Diego",
    traveler: "familia",
    stayedAt: "2026-07-18",
    score: 5,
    categories: { estrutura: 5, atendimento: 5, "custo-beneficio": 5 },
    comment:
      "Ficamos quatro noites. Manhã no Santuário, tarde na piscina. As crianças fizeram amigos no gramado.",
  },
  {
    slug: "pousada-do-devoto",
    author: "Luciana",
    traveler: "familia",
    stayedAt: "2026-05-24",
    score: 4,
    categories: { limpeza: 4, localizacao: 3, estrutura: 5 },
    comment:
      "Ótima para descansar, mas é longe para ir a pé com criança pequena. Usamos o carro todos os dias.",
  },
  {
    slug: "hotel-portal-da-fe",
    author: "Marcelo",
    traveler: "casal",
    stayedAt: "2026-08-22",
    score: 5,
    categories: { localizacao: 5, limpeza: 5, atendimento: 5 },
    comment:
      "Saímos do hotel e em dois minutos estávamos na Passarela. Quarto pequeno, mas muito limpo.",
  },
  {
    slug: "hotel-portal-da-fe",
    author: "Elza",
    traveler: "idosos",
    stayedAt: "2026-06-06",
    score: 5,
    categories: { acessibilidade: 5, atendimento: 5 },
    comment:
      "Cheguei de carro com meu andador e o elevador me levou da garagem ao quarto. Recepção atenciosa.",
  },
  {
    slug: "pousada-bom-caminho",
    author: "Família Teixeira",
    traveler: "familia",
    stayedAt: "2026-07-25",
    score: 5,
    categories: { cafe: 5, conforto: 5, atendimento: 5 },
    title: "Quartos conjugados são a solução",
    comment:
      "Pais de um lado, três crianças do outro, com porta no meio. O pão de queijo do café é feito na hora.",
    photoIds: ["cafe-hospede"],
  },
  {
    slug: "pousada-bom-caminho",
    author: "Cristiane M.",
    traveler: "familia",
    stayedAt: "2025-10-11",
    score: 5,
    categories: { localizacao: 5, atendimento: 5 },
    comment:
      "Minha mãe tem 78 anos e conseguiu ir e voltar do Santuário a pé, no ritmo dela. Era exatamente isso que eu precisava saber antes de reservar.",
  },
  {
    slug: "recanto-da-padroeira",
    author: "Pastoral da Família de Pouso Alegre",
    traveler: "romaria",
    stayedAt: "2026-08-08",
    score: 5,
    categories: { estrutura: 5, estacionamento: 5, atendimento: 5 },
    comment:
      "Casa para 22 pessoas com cozinha industrial de verdade. A van ficou dentro do portão. A suíte do térreo foi para a coordenadora de 81 anos.",
    reply:
      "Foi um prazer receber o grupo. As chaves ficam reservadas para 2027.",
  },
  {
    slug: "recanto-da-padroeira",
    author: "Comunidade São Judas",
    traveler: "romaria",
    stayedAt: "2026-05-16",
    score: 4,
    categories: { estrutura: 4, limpeza: 5, "custo-beneficio": 5 },
    comment:
      "Dividido por 20 pessoas o preço fica ótimo. Só faltou um segundo chuveiro no andar de cima para o horário de pico.",
  },
  {
    slug: "casa-da-romaria",
    author: "Pe. Anselmo R.",
    traveler: "romaria",
    stayedAt: "2026-08-02",
    score: 5,
    categories: { estacionamento: 5, estrutura: 5, atendimento: 5 },
    title: "Primeira vez que reservei sem ligar para ninguém",
    comment:
      "Somos 22 pessoas de van. O ônibus da segunda romaria entrou no pátio sem manobra difícil. A varanda virou nosso ponto do terço.",
  },
  {
    slug: "casa-da-romaria",
    author: "Paróquia São Sebastião de Itajubá",
    traveler: "excursao",
    stayedAt: "2025-10-12",
    score: 5,
    categories: { estacionamento: 5, "custo-beneficio": 5 },
    comment:
      "30 pessoas, ônibus no pátio, três banheiros coletivos deram conta. Para grupo grande não conheço opção melhor perto do Santuário.",
  },
  {
    slug: "pousada-passarela",
    author: "Simone",
    traveler: "familia",
    stayedAt: "2026-08-01",
    score: 5,
    categories: { acessibilidade: 5, localizacao: 5, cafe: 4 },
    comment:
      "Tudo no térreo, sem escada, e o caminho até a Passarela é plano. Fomos com carrinho de bebê e cadeira de rodas da minha sogra sem esforço.",
  },
  {
    slug: "pousada-passarela",
    author: "Henrique",
    traveler: "casal",
    stayedAt: "2026-04-04",
    score: 4,
    categories: { limpeza: 5, conforto: 4, atendimento: 5 },
    comment: "Quarto simples e limpo. O chuveiro poderia ser mais forte.",
  },
  {
    slug: "hotel-monte-carmelo",
    author: "Wilson",
    traveler: "idosos",
    stayedAt: "2026-08-19",
    score: 5,
    categories: { atendimento: 5, estrutura: 5, "custo-beneficio": 4 },
    comment:
      "Almoçamos e jantamos no hotel os três dias, preço fixo, sem precisar procurar restaurante. Vaga coberta na garagem.",
  },
  {
    slug: "hotel-monte-carmelo",
    author: "Rosana e amigas",
    traveler: "amigos",
    stayedAt: "2026-06-20",
    score: 4,
    categories: { localizacao: 5, conforto: 4, cafe: 4 },
    comment:
      "Na praça, de frente para o movimento. Reforma deixou os quartos bonitos, mas a janela ainda deixa passar barulho da rua.",
    reply:
      "Obrigado, Rosana. Os quartos do lado interno são mais silenciosos, é só pedir na reserva.",
  },
  {
    slug: "pousada-luz-do-amanhecer",
    author: "Dona Neide",
    traveler: "sozinho",
    stayedAt: "2026-07-29",
    score: 5,
    categories: { atendimento: 5, cafe: 5, "custo-beneficio": 5 },
    comment:
      "Pedi para me acordarem às 4h40 e bateram na porta na hora. Café pronto às 5h. Foi assim que consegui a missa do amanhecer.",
  },
  {
    slug: "pousada-luz-do-amanhecer",
    author: "Família Prado",
    traveler: "familia",
    stayedAt: "2026-05-09",
    score: 4,
    categories: { limpeza: 4, cafe: 5, conforto: 4 },
    comment: "Simples, limpa, cama boa. Café caseiro bem servido.",
  },
  {
    slug: "hospedaria-sao-benedito",
    author: "Grupo Jovem de Cruzeiro",
    traveler: "excursao",
    stayedAt: "2026-08-15",
    score: 4,
    categories: { "custo-beneficio": 5, estrutura: 4, limpeza: 4 },
    comment:
      "18 jovens em três quartos coletivos. Barato e funcional. A cozinha coletiva salvou o jantar.",
  },
  {
    slug: "hospedaria-sao-benedito",
    author: "Miguel",
    traveler: "amigos",
    stayedAt: "2026-03-07",
    score: 4,
    categories: { "custo-beneficio": 5, atendimento: 4 },
    comment:
      "Cabe no bolso. Não espere luxo, espere cama limpa e chuveiro quente.",
  },
  {
    slug: "hotel-fonte-da-esperanca",
    author: "Beatriz e Rafael",
    traveler: "familia",
    stayedAt: "2026-08-23",
    score: 5,
    categories: { estrutura: 5, cafe: 5, conforto: 5, limpeza: 5 },
    title: "O melhor café que já tomamos em Aparecida",
    comment:
      "Fruta da região, pão quente, ovos na hora. Piscina aquecida foi o prêmio das crianças depois da Passarela.",
    photoIds: ["cafe-hospede", "quarto-hospede"],
    reply: "Obrigado! A goiabada é da chácara da família da nossa cozinheira.",
  },
  {
    slug: "hotel-fonte-da-esperanca",
    author: "Teresa",
    traveler: "idosos",
    stayedAt: "2026-06-14",
    score: 5,
    categories: { acessibilidade: 5, atendimento: 5, conforto: 5 },
    comment: "Quarto adaptado excelente, funcionários atentos. Vale cada real.",
  },
  {
    slug: "hotel-fonte-da-esperanca",
    author: "Gustavo",
    traveler: "casal",
    stayedAt: "2026-02-15",
    score: 4,
    categories: { "custo-beneficio": 3, conforto: 5, estrutura: 5 },
    comment:
      "Estrutura impecável. Preço acima da média da cidade, mas entrega o que promete.",
  },
  {
    slug: "pousada-recanto-do-peregrino",
    author: "Cláudio",
    traveler: "sozinho",
    stayedAt: "2026-08-05",
    score: 4,
    categories: { "custo-beneficio": 5, limpeza: 4, atendimento: 5 },
    comment:
      "Diária mais barata que achei com café. Casal simpático. Um pouco longe, mas fui de carro.",
  },
  {
    slug: "hotel-jardim-das-oliveiras",
    author: "Família Sousa",
    traveler: "familia",
    stayedAt: "2026-08-29",
    score: 5,
    categories: { cafe: 5, conforto: 5, atendimento: 5, limpeza: 5 },
    comment:
      "Café no jardim das oliveiras é uma delícia. Quarto família com dois ambientes, a filha adolescente adorou ter o canto dela.",
    photoIds: ["vista-hospede"],
  },
  {
    slug: "hotel-jardim-das-oliveiras",
    author: "Seu Osvaldo",
    traveler: "idosos",
    stayedAt: "2026-05-31",
    score: 5,
    categories: { acessibilidade: 4, atendimento: 5, localizacao: 4 },
    comment:
      "Elevador em todos os andares e equipe paciente com nossa lentidão. Recomendo para casais idosos.",
  },
  {
    slug: "casa-de-repouso-santa-clara",
    author: "Três famílias de Guaratinguetá",
    traveler: "familia",
    stayedAt: "2026-07-12",
    score: 5,
    categories: { estrutura: 5, "custo-beneficio": 5 },
    comment:
      "Alugamos entre três famílias. Churrasco à noite no quintal, crianças correndo, avós na varanda. Perfeito para feriado.",
  },
  {
    slug: "pousada-porta-do-ceu",
    author: "Família Ribeiro",
    traveler: "familia",
    stayedAt: "2026-08-10",
    score: 5,
    categories: { estacionamento: 5, conforto: 4, atendimento: 5 },
    comment:
      "Viajamos em duas vans com avós, filhos e netos. Coube tudo no estacionamento e os quartos de seis foram ótimos.",
  },
  {
    slug: "pousada-porta-do-ceu",
    author: "Renata",
    traveler: "casal",
    stayedAt: "2026-04-25",
    score: 4,
    categories: { limpeza: 4, localizacao: 3 },
    comment:
      "Boa pousada, mas para casal fica um pouco distante. Pensada para família grande mesmo.",
  },
  {
    slug: "hotel-caminho-de-fatima",
    author: "Paróquia N. Sra. do Rosário",
    traveler: "excursao",
    stayedAt: "2026-06-28",
    score: 5,
    categories: { estacionamento: 5, atendimento: 5, estrutura: 5 },
    title: "Feito para excursão",
    comment:
      "45 pessoas, ônibus no pátio, refeitório com horário combinado. As chaves estavam separadas por nome quando chegamos. Sem fila.",
    reply:
      "Obrigado! Já deixamos a mesma organização preparada para a Romaria de outubro.",
  },
  {
    slug: "hotel-caminho-de-fatima",
    author: "Dirceu",
    traveler: "romaria",
    stayedAt: "2025-10-10",
    score: 4,
    categories: { "custo-beneficio": 5, localizacao: 3, cafe: 4 },
    comment:
      "Preço bom para grupo. Fica na estrada, então depende de ônibus ou van para ir ao Santuário.",
  },
  {
    slug: "residencial-nossa-senhora-da-paz",
    author: "Aparecida e Benedito",
    traveler: "idosos",
    stayedAt: "2026-08-24",
    score: 5,
    categories: { acessibilidade: 5, localizacao: 5, atendimento: 5 },
    comment:
      "Nenhum degrau em lugar nenhum. Banheiro com barra e cadeira de banho. Rua plana até o Santuário. Minha esposa fez tudo sozinha.",
    photoIds: ["banheiro-hospede"],
  },
  {
    slug: "residencial-nossa-senhora-da-paz",
    author: "Patrícia",
    traveler: "familia",
    stayedAt: "2026-06-21",
    score: 4,
    categories: { limpeza: 5, conforto: 4, cafe: 4 },
    comment:
      "Boa para família pequena. Quarto compacto, café simples e correto.",
  },
  {
    slug: "conforto-para-toda-familia",
    author: "Mariana",
    traveler: "familia",
    stayedAt: "2026-08-17",
    score: 5,
    categories: { atendimento: 5, estrutura: 5, cafe: 5 },
    title: "Pensaram em tudo para bebê",
    comment:
      "Berço, banheira e cadeirão já estavam no quarto. No café tinha mingau e leite morno sem eu pedir. Voltamos leves.",
  },
  {
    slug: "hotel-basilica-palace",
    author: "Diocese de Taubaté",
    traveler: "excursao",
    stayedAt: "2026-08-21",
    score: 5,
    categories: { estrutura: 5, atendimento: 5, estacionamento: 5 },
    comment:
      "Missa na capela do hotel para o grupo de 80. Dois elevadores, refeitório grande, três ônibus no pátio. Grande estrutura.",
  },
  {
    slug: "hotel-basilica-palace",
    author: "Vanessa",
    traveler: "casal",
    stayedAt: "2026-07-03",
    score: 4,
    categories: { conforto: 4, atendimento: 3, limpeza: 4 },
    comment:
      "Hotel grande, às vezes impessoal. Check-in demorou porque chegou uma excursão junto. Quarto bom.",
    reply:
      "Vanessa, obrigado pelo retorno. Criamos um balcão separado para hóspedes individuais em agosto.",
  },
  {
    slug: "hotel-basilica-palace",
    author: "Família Almeida",
    traveler: "familia",
    stayedAt: "2026-05-02",
    score: 5,
    categories: { estrutura: 5, cafe: 5, acessibilidade: 5 },
    comment:
      "Piscina, buffet nas três refeições e quarto adaptado para a avó. Não precisamos sair do hotel para nada além do Santuário.",
  },
  {
    slug: "pousada-recanto-dos-romeiros",
    author: "Comunidade de Extrema",
    traveler: "romaria",
    stayedAt: "2026-08-07",
    score: 5,
    categories: { atendimento: 5, "custo-beneficio": 5, cafe: 5 },
    comment:
      "A dona preparou marmitas para a volta sem cobrar a mais. Café às 5h30 em ponto. Vans no pátio.",
    reply: "Vocês são de casa. Até o ano que vem!",
  },
  {
    slug: "apartamento-vista-da-torre",
    author: "Aline e Bruno",
    traveler: "familia",
    stayedAt: "2026-08-12",
    score: 5,
    categories: { localizacao: 5, estrutura: 5, "custo-beneficio": 5 },
    title: "A torre na janela da sala",
    comment:
      "Acordar e ver a Basílica pela janela não tem preço. Cozinha completa: fizemos o jantar das crianças todos os dias.",
    photoIds: ["vista-hospede"],
  },
  {
    slug: "hotel-estrela-da-manha",
    author: "Josué",
    traveler: "sozinho",
    stayedAt: "2026-08-27",
    score: 4,
    categories: { "custo-beneficio": 5, localizacao: 4, limpeza: 3 },
    comment:
      "Cheguei de ônibus e o hotel fica em frente ao ponto. Barato. Limpeza poderia ser mais caprichada.",
    reply: "Obrigado, Josué. Reforçamos a equipe de governança em setembro.",
  },
  {
    slug: "hotel-estrela-da-manha",
    author: "Sandra",
    traveler: "amigos",
    stayedAt: "2026-06-05",
    score: 4,
    categories: { "custo-beneficio": 5, atendimento: 4 },
    comment:
      "Cumpre o básico com preço honesto. Recepção 24h ajudou porque chegamos de madrugada.",
  },
  {
    slug: "pousada-flor-de-maio",
    author: "Família Campos",
    traveler: "familia",
    stayedAt: "2026-08-28",
    score: 5,
    categories: { estrutura: 5, atendimento: 5, cafe: 5 },
    comment:
      "A brinquedoteca é o segredo: crianças brincando e a gente tomando café na varanda. Quartos com varanda para o jardim.",
  },
  {
    slug: "casa-dos-peregrinos",
    author: "Amigos de São José dos Campos",
    traveler: "amigos",
    stayedAt: "2026-07-04",
    score: 5,
    categories: { estrutura: 5, localizacao: 5, "custo-beneficio": 5 },
    comment:
      "Casa de vila silenciosa, dez minutos a pé do Santuário. Doze pessoas confortáveis, cozinha grande.",
  },
  {
    slug: "hotel-dom-pedro",
    author: "Helena",
    traveler: "casal",
    stayedAt: "2026-08-20",
    score: 5,
    categories: { conforto: 5, estrutura: 5, atendimento: 5 },
    title: "Casarão lindo",
    comment:
      "Pé-direito alto, janelão para a praça, suíte ampla. Elevador novo. Café no salão antigo é uma experiência.",
    photoIds: ["quarto-hospede"],
  },
  {
    slug: "pousada-aguas-do-paraiba",
    author: "Família Barros",
    traveler: "familia",
    stayedAt: "2026-07-19",
    score: 4,
    categories: { estrutura: 5, localizacao: 3, atendimento: 5 },
    comment:
      "Churrasqueira e piscina fizeram o dia de descanso. Fica na parte baixa, longe para ir a pé.",
  },
  {
    slug: "suite-aconchego",
    author: "Padre Lucas",
    traveler: "sozinho",
    stayedAt: "2026-08-26",
    score: 5,
    categories: { atendimento: 5, cafe: 5, "custo-beneficio": 5 },
    comment:
      "Dona Terezinha sabe o horário de cada missa. Café na mesa da cozinha com pão caseiro. Simples e acolhedor.",
  },
  {
    slug: "hotel-terra-santa",
    author: "Excursão de Barbacena",
    traveler: "excursao",
    stayedAt: "2026-08-13",
    score: 4,
    categories: { estacionamento: 5, "custo-beneficio": 5, conforto: 4 },
    comment:
      "Três ônibus no pátio, pensão completa em horário certo. Quartos simples. Para excursão funciona muito bem.",
  },
  {
    slug: "pousada-santa-rita",
    author: "Valdir",
    traveler: "sozinho",
    stayedAt: "2026-08-03",
    score: 4,
    categories: { "custo-beneficio": 5, atendimento: 5, limpeza: 4 },
    comment:
      "Guardaram minha mala depois do check-out para eu ir à missa das 15h. Bolo do café estava ótimo.",
  },
  {
    slug: "residencial-bom-jesus",
    author: "Família Mendes",
    traveler: "familia",
    stayedAt: "2026-08-18",
    score: 5,
    categories: { estrutura: 5, "custo-beneficio": 5 },
    comment:
      "Lavar roupa do bebê no apartamento mudou a viagem. Cozinha completa, prédio silencioso.",
  },
  {
    slug: "hotel-colina-sagrada",
    author: "Dona Lourdes",
    traveler: "idosos",
    stayedAt: "2026-08-25",
    score: 5,
    categories: { acessibilidade: 5, conforto: 5, estrutura: 5 },
    title: "Rampas em tudo",
    comment:
      "Nenhum degrau do estacionamento ao quarto. A vista da Basílica no café da manhã emociona. Vale a subida de carro.",
    photoIds: ["vista-hospede"],
  },
  {
    slug: "pousada-da-fonte",
    author: "Tatiane",
    traveler: "casal",
    stayedAt: "2026-08-11",
    score: 5,
    categories: { atendimento: 5, estrutura: 4 },
    comment:
      "Levamos nossa cachorrinha. Tinha um cantinho para ela ficar enquanto fomos ao Santuário. Café no jardim da fonte.",
  },
  {
    slug: "hospedaria-dos-coqueiros",
    author: "Nelson",
    traveler: "casal",
    stayedAt: "2026-07-26",
    score: 4,
    categories: { localizacao: 4, "custo-beneficio": 5, limpeza: 4 },
    comment:
      "Do lado da Basílica Velha, silêncio total de manhã. Descer pela Passarela é um passeio. Voltar é subida, fomos de carro.",
  },
  {
    slug: "hotel-manto-azul",
    author: "Família Vieira",
    traveler: "familia",
    stayedAt: "2026-08-31",
    score: 5,
    categories: { estrutura: 5, cafe: 4, atendimento: 5 },
    comment:
      "Quarto família com dois ambientes de verdade. Emprestaram carrinho de bebê. Almoço no hotel resolveu o meio-dia.",
  },
];

export const SEEDED_REVIEWS: Review[] = REVIEW_SEEDS.map(buildReview);
