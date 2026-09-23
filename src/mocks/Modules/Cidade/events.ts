import type { CityEvent } from "@/@types/Modules/Cidade/city";

const UNSPLASH = "https://images.unsplash.com";

function image(photoId: string): string {
  return `${UNSPLASH}/${photoId}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400`;
}

export const CITY_EVENTS: CityEvent[] = [
  {
    id: "festa-da-padroeira-2026",
    name: "Festa de Nossa Senhora Aparecida",
    kind: "romaria",
    startDate: "2026-10-09",
    endDate: "2026-10-13",
    demand: "muito-alta",
    summary:
      "A maior romaria do ano. A novena começa dia 3 e o dia 12 reúne centenas de milhares de pessoas no Santuário.",
    tips: [
      "Reserve com semanas de antecedência: hospedagens perto do Santuário esgotam.",
      "No dia 12, o entorno da Basílica fecha para carros a partir da madrugada.",
      "Missas acontecem a cada hora, a partir das 5h. As da manhã são as mais cheias.",
      "Leve água e um lanche: as filas para restaurantes passam de uma hora ao meio-dia.",
    ],
    image: image("photo-1668720952894-1c5690ab1270"),
  },
  {
    id: "finados-2026",
    name: "Feriado de Finados",
    kind: "feriado",
    startDate: "2026-10-31",
    endDate: "2026-11-02",
    demand: "alta",
    summary:
      "Fim de semana prolongado com missas por falecidos e movimento alto no Santuário e no Memorial.",
    tips: [
      "Boa alternativa para quem não conseguiu vaga em outubro.",
      "A Passarela da Fé fica movimentada no fim da tarde de domingo.",
    ],
    image: image("photo-1636562705007-67a52b138df8"),
  },
  {
    id: "proclamacao-2026",
    name: "Feriado de 15 de novembro",
    kind: "feriado",
    startDate: "2026-11-14",
    endDate: "2026-11-16",
    demand: "alta",
    summary:
      "Feriado prolongado de primavera, com clima ameno e boa procura por famílias.",
    tips: [
      "Manhãs frescas e tardes de sol: bom período para caminhar até a Basílica Velha.",
    ],
    image: image("photo-1601997474092-586bff2cd2d7"),
  },
  {
    id: "natal-2026",
    name: "Natal no Santuário",
    kind: "celebracao",
    startDate: "2026-12-23",
    endDate: "2026-12-26",
    demand: "alta",
    summary:
      "Missa do Galo na noite do dia 24 e presépio monumental montado na Tribuna Bento XVI.",
    tips: [
      "A Missa do Galo lota. Chegue pelo menos uma hora antes.",
      "Restaurantes fecham mais cedo no dia 24. Hospedagens com jantar resolvem a noite.",
    ],
    image: image("photo-1761610777134-fa2bc0888846"),
  },
  {
    id: "ano-novo-2027",
    name: "Réveillon e Missa de Ano Novo",
    kind: "celebracao",
    startDate: "2026-12-30",
    endDate: "2027-01-02",
    demand: "muito-alta",
    summary:
      "Virada do ano com missa à meia-noite e o Dia Mundial da Paz no dia 1º. Muitas famílias passam a semana inteira.",
    tips: [
      "As casas inteiras são as primeiras a esgotar para a virada.",
      "O calor é forte: prefira hospedagens com ar-condicionado.",
    ],
    image: image("photo-1636483022318-19f623b66075"),
  },
  {
    id: "carnaval-2027",
    name: "Retiro de Carnaval",
    kind: "evento",
    startDate: "2027-02-05",
    endDate: "2027-02-10",
    demand: "alta",
    summary:
      "Retiros espirituais e programação alternativa ao Carnaval atraem grupos jovens e famílias.",
    tips: [
      "Grupos de jovens costumam preferir hospedarias com quartos coletivos.",
    ],
    image: image("photo-1578496780896-7081cc23c111"),
  },
  {
    id: "semana-santa-2027",
    name: "Semana Santa",
    kind: "celebracao",
    startDate: "2027-03-25",
    endDate: "2027-03-28",
    demand: "muito-alta",
    summary:
      "Da Quinta-feira Santa ao Domingo de Páscoa, com Via-Sacra no Morro do Cruzeiro e Vigília Pascal no Santuário.",
    tips: [
      "A Via-Sacra da Sexta-feira Santa começa cedo e sobe o Morro do Cruzeiro: leve calçado confortável.",
      "Hospedagens com vaga para ônibus esgotam até janeiro.",
    ],
    image: image("photo-1668720952894-1c5690ab1270"),
  },
  {
    id: "dia-das-maes-2027",
    name: "Dia das Mães",
    kind: "celebracao",
    startDate: "2027-05-07",
    endDate: "2027-05-09",
    demand: "alta",
    summary:
      "Famílias inteiras levam as mães ao Santuário. Missas especiais no domingo.",
    tips: [
      "Restaurantes lotam no almoço de domingo: reserve ou almoce mais cedo.",
    ],
    image: image("photo-1636562705007-67a52b138df8"),
  },
  {
    id: "corpus-christi-2027",
    name: "Corpus Christi",
    kind: "feriado",
    startDate: "2027-05-27",
    endDate: "2027-05-30",
    demand: "alta",
    summary:
      "Tapetes de serragem nas ruas do centro e procissão na quinta-feira.",
    tips: ["Os tapetes são montados de madrugada. Vale acordar cedo para ver."],
    image: image("photo-1601997474092-586bff2cd2d7"),
  },
];
