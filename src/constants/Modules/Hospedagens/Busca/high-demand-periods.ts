import type { DemandLevel } from "@/@types/Modules/Cidade/city";

export type HighDemandPeriod = {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  demand: DemandLevel;
};

export const HIGH_DEMAND_PERIODS: HighDemandPeriod[] = [
  {
    id: "romaria-padroeira-2026",
    label: "Festa da Padroeira",
    startDate: "2026-10-09",
    endDate: "2026-10-13",
    demand: "muito-alta",
  },
  {
    id: "finados-2026",
    label: "Feriado de Finados",
    startDate: "2026-10-31",
    endDate: "2026-11-02",
    demand: "alta",
  },
  {
    id: "proclamacao-2026",
    label: "Feriado da Proclamação da República",
    startDate: "2026-11-14",
    endDate: "2026-11-16",
    demand: "alta",
  },
  {
    id: "natal-2026",
    label: "Natal",
    startDate: "2026-12-23",
    endDate: "2026-12-26",
    demand: "alta",
  },
  {
    id: "ano-novo-2027",
    label: "Réveillon",
    startDate: "2026-12-30",
    endDate: "2027-01-02",
    demand: "muito-alta",
  },
  {
    id: "carnaval-2027",
    label: "Carnaval",
    startDate: "2027-02-05",
    endDate: "2027-02-10",
    demand: "alta",
  },
  {
    id: "semana-santa-2027",
    label: "Semana Santa",
    startDate: "2027-03-25",
    endDate: "2027-03-28",
    demand: "muito-alta",
  },
  {
    id: "dia-das-maes-2027",
    label: "Dia das Mães",
    startDate: "2027-05-07",
    endDate: "2027-05-09",
    demand: "alta",
  },
  {
    id: "corpus-christi-2027",
    label: "Corpus Christi",
    startDate: "2027-05-27",
    endDate: "2027-05-30",
    demand: "alta",
  },
];
