import type { GuidePlace } from "@/@types/Modules/Cidade/city";

const UNSPLASH = "https://images.unsplash.com";

function image(photoId: string): string {
  return `${UNSPLASH}/${photoId}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200`;
}

export const GUIDE_PLACES: GuidePlace[] = [
  {
    id: "santuario-nacional",
    name: "Santuário Nacional",
    category: "santuario",
    summary:
      "A maior basílica mariana do mundo, com a imagem original de Nossa Senhora Aparecida.",
    details: [
      "Missas todos os dias, a partir das 6h30 em dias comuns e das 5h nas grandes festas.",
      "Nicho da imagem aberto à visitação durante todo o dia.",
      "Sala das Promessas, Memorial da Devoção e Torre Brasília com mirante.",
    ],
    openingHours: "Diariamente, das 5h às 21h",
    priceLabel: "Entrada gratuita",
    distanceFromSanctuaryInMeters: 0,
    coordinates: { lat: -22.8672, lng: -45.2256 },
    image: image("photo-1668720952894-1c5690ab1270"),
    isAccessible: true,
    goodForGroups: true,
  },
  {
    id: "basilica-velha",
    name: "Basílica Velha",
    category: "santuario",
    summary:
      "A primeira igreja de Aparecida, no alto do Morro dos Coqueiros, onde a imagem ficou por 140 anos.",
    details: [
      "Missas diárias às 8h e 18h.",
      "Vista aberta da cidade e do Santuário Nacional.",
      "Ligada ao Santuário pela Passarela da Fé.",
    ],
    openingHours: "Diariamente, das 6h às 20h",
    priceLabel: "Entrada gratuita",
    distanceFromSanctuaryInMeters: 900,
    coordinates: { lat: -22.8598, lng: -45.2287 },
    image: image("photo-1761610777134-fa2bc0888846"),
    isAccessible: false,
    goodForGroups: true,
  },
  {
    id: "passarela-da-fe",
    name: "Passarela da Fé",
    category: "atracao",
    summary:
      "Travessia coberta de 392 metros sobre o vale, ligando o Santuário Nacional à Basílica Velha.",
    details: [
      "Plana e coberta, com rampas nas duas pontas.",
      "Muitos romeiros a percorrem de joelhos ou descalços.",
      "Melhor luz para fotos no fim da tarde.",
    ],
    openingHours: "Aberta 24 horas",
    priceLabel: "Gratuita",
    distanceFromSanctuaryInMeters: 250,
    coordinates: { lat: -22.8638, lng: -45.2274 },
    image: image("photo-1601997474092-586bff2cd2d7"),
    isAccessible: true,
    goodForGroups: true,
  },
  {
    id: "morro-do-cruzeiro",
    name: "Morro do Cruzeiro",
    category: "atracao",
    summary:
      "Via-Sacra ao ar livre com 14 estações até o cruzeiro no topo, com vista panorâmica.",
    details: [
      "Subida de cerca de 20 minutos por escadaria.",
      "Estacionamento no alto para quem prefere ir de carro.",
    ],
    openingHours: "Diariamente, das 7h às 18h",
    priceLabel: "Gratuito",
    distanceFromSanctuaryInMeters: 1800,
    coordinates: { lat: -22.8572, lng: -45.2201 },
    image: image("photo-1636483022318-19f623b66075"),
    isAccessible: false,
    goodForGroups: true,
  },
  {
    id: "porto-itaguacu",
    name: "Porto Itaguaçu",
    category: "atracao",
    summary:
      "Local onde a imagem foi encontrada pelos pescadores em 1717, às margens do rio Paraíba.",
    details: [
      "Capela, mirante e área de piquenique.",
      "Passeios de barco nos fins de semana.",
    ],
    openingHours: "Diariamente, das 8h às 17h",
    priceLabel: "Gratuito",
    distanceFromSanctuaryInMeters: 2600,
    coordinates: { lat: -22.8442, lng: -45.2305 },
    image: image("photo-1578496780896-7081cc23c111"),
    isAccessible: true,
    goodForGroups: true,
  },
  {
    id: "restaurante-sabor-mineiro",
    name: "Restaurante Sabor da Serra",
    category: "restaurante",
    summary:
      "Comida caseira por quilo e sistema de buffet livre para grupos, a duas quadras do Santuário.",
    details: [
      "Grupos acima de 10 pessoas: avise na véspera e receba mesa reservada.",
      "Opções sem lactose e prato infantil.",
    ],
    openingHours: "Diariamente, das 11h às 15h30",
    priceLabel: "R$ 45 a R$ 70 por pessoa",
    distanceFromSanctuaryInMeters: 350,
    coordinates: { lat: -22.8661, lng: -45.2231 },
    image: image("photo-1578496780896-7081cc23c111"),
    isAccessible: true,
    goodForGroups: true,
  },
  {
    id: "padaria-do-romeiro",
    name: "Padaria do Romeiro",
    category: "restaurante",
    summary:
      "Café da manhã reforçado e lanches desde as 5h, para quem sai cedo para a missa.",
    details: [
      "Pão de queijo e bolo de fubá saem quentes a cada hora.",
      "Marmitas para viagem.",
    ],
    openingHours: "Diariamente, das 5h às 20h",
    priceLabel: "R$ 15 a R$ 35",
    distanceFromSanctuaryInMeters: 200,
    coordinates: { lat: -22.8678, lng: -45.2241 },
    image: image("photo-1558497446-1fd7429d9be4"),
    isAccessible: true,
    goodForGroups: false,
  },
  {
    id: "estacionamento-santuario",
    name: "Estacionamento do Santuário",
    category: "estacionamento",
    summary:
      "Estacionamento oficial com vagas para carros, vans e ônibus ao lado da Basílica.",
    details: [
      "Vagas para pessoas com deficiência perto da entrada.",
      "Em dias de festa, lota antes das 7h.",
    ],
    openingHours: "Diariamente, das 5h às 22h",
    priceLabel: "Carro R$ 20 · Van R$ 40 · Ônibus R$ 80 por dia",
    distanceFromSanctuaryInMeters: 150,
    coordinates: { lat: -22.8685, lng: -45.2265 },
    image: image("photo-1668656985972-e57865a85efb"),
    isAccessible: true,
    goodForGroups: true,
  },
  {
    id: "estacionamento-central",
    name: "Estacionamento Central",
    category: "estacionamento",
    summary:
      "Alternativa coberta a 400 metros, com manobrista e diária para hóspedes de hotéis sem vaga.",
    details: ["Recebe vans. Não recebe ônibus."],
    openingHours: "24 horas",
    priceLabel: "R$ 35 por dia",
    distanceFromSanctuaryInMeters: 400,
    coordinates: { lat: -22.8655, lng: -45.2221 },
    image: image("photo-1576141034725-c64b35194fce"),
    isAccessible: true,
    goodForGroups: false,
  },
  {
    id: "rodoviaria",
    name: "Rodoviária de Aparecida",
    category: "transporte",
    summary:
      "Ônibus frequentes de São Paulo, Rio de Janeiro e sul de Minas. Linha urbana até o Santuário.",
    details: [
      "Ônibus urbano para o Santuário a cada 20 minutos.",
      "Ponto de táxi e aplicativos na saída.",
    ],
    openingHours: "24 horas",
    distanceFromSanctuaryInMeters: 650,
    coordinates: { lat: -22.8712, lng: -45.2301 },
    image: image("photo-1571867424488-4565932edb41"),
    isAccessible: true,
    goodForGroups: true,
  },
  {
    id: "posto-de-saude",
    name: "Posto médico do Santuário",
    category: "servico",
    summary:
      "Atendimento de urgência dentro do complexo do Santuário, com ambulância de plantão.",
    details: ["Farmácias 24h na avenida em frente."],
    openingHours: "Diariamente, das 6h às 22h",
    priceLabel: "Gratuito",
    distanceFromSanctuaryInMeters: 100,
    coordinates: { lat: -22.8676, lng: -45.2251 },
    image: image("photo-1573567199032-50a155ba6de1"),
    isAccessible: true,
    goodForGroups: false,
  },
  {
    id: "feira-de-artesanato",
    name: "Feira do Romeiro",
    category: "servico",
    summary:
      "Centro de compras ao lado do Santuário, com artigos religiosos, lembranças e praça de alimentação.",
    details: [
      "Banheiros amplos e fraldário.",
      "Fecha mais tarde nos dias de festa.",
    ],
    openingHours: "Diariamente, das 8h às 19h",
    distanceFromSanctuaryInMeters: 200,
    coordinates: { lat: -22.8668, lng: -45.2247 },
    image: image("photo-1599050751795-6cdaafbc2319"),
    isAccessible: true,
    goodForGroups: true,
  },
];
