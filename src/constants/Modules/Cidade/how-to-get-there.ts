export type HowToGetThereItem = {
  id: string;
  title: string;
  description: string;
};

export const HOW_TO_GET_THERE: HowToGetThereItem[] = [
  {
    id: "rodoviaria",
    title: "De ônibus",
    description:
      "A rodoviária fica a 650 m do Santuário, com linhas frequentes de São Paulo, Rio e sul de Minas. Um ônibus urbano sai a cada 20 minutos até a Basílica.",
  },
  {
    id: "dutra",
    title: "De carro pela Dutra",
    description:
      "Saída pelo km 72 da Via Dutra, sentido Rio ou São Paulo. Do trevo até o Santuário são 5 minutos com sinalização em todo o trajeto.",
  },
  {
    id: "estacionamentos",
    title: "Onde deixar o carro, a van ou o ônibus",
    description:
      "O estacionamento oficial ao lado da Basílica recebe carros, vans e ônibus. Em dias de festa ele lota antes das 7h. Hospedagens com vaga própria evitam essa fila.",
  },
];
