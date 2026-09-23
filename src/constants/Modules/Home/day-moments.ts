export type DayMoment = {
  id: string;
  time: string;
  title: string;
  description: string;
  practicalNote: string;
  image: string;
};

export const DAY_MOMENTS: DayMoment[] = [
  {
    id: "missa-do-amanhecer",
    time: "6h",
    title: "Missa do amanhecer",
    description:
      "A primeira missa do dia, com a basílica ainda silenciosa e vazia.",
    practicalNote: "Cerca de 1 hora · sem fila neste horário",
    image:
      "https://images.unsplash.com/photo-1636562705007-67a52b138df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
  },
  {
    id: "santuario-nacional",
    time: "9h",
    title: "Santuário Nacional",
    description:
      "O encontro com a imagem, o manto e a nave central que abriga milhares de pessoas.",
    practicalNote: "Reserve 2 a 3 horas · entrada gratuita",
    image:
      "https://images.unsplash.com/photo-1668720952894-1c5690ab1270?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
  },
  {
    id: "almoco-em-familia",
    time: "12h",
    title: "Almoço em família",
    description:
      "Restaurantes de comida caseira a poucos passos, acostumados a receber grupos grandes.",
    practicalNote: "Grupos acima de 10 pessoas: avise na véspera",
    image:
      "https://images.unsplash.com/photo-1578496780896-7081cc23c111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
  },
  {
    id: "passarela-da-fe",
    time: "15h",
    title: "Passarela da Fé",
    description:
      "A travessia sobre o rio Paraíba que liga o Santuário Nacional à Basílica Velha.",
    practicalNote: "400 m cobertos · plana e acessível",
    image:
      "https://images.unsplash.com/photo-1601997474092-586bff2cd2d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
  },
  {
    id: "basilica-velha",
    time: "18h",
    title: "Basílica Velha ao fim do dia",
    description:
      "O primeiro santuário da cidade, no alto do Morro dos Coqueiros, com a luz baixa do fim de tarde.",
    practicalNote: "Vista da cidade · 15 min a pé pela Passarela",
    image:
      "https://images.unsplash.com/photo-1761610777134-fa2bc0888846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
  },
];
