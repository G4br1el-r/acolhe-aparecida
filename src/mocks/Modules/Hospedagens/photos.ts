export type PhotoKind =
  | "quarto"
  | "banheiro"
  | "cafe"
  | "area-comum"
  | "externa";

export type StockPhoto = {
  id: string;
  url: string;
  width: number;
  height: number;
  caption: string;
  kind: PhotoKind;
};

export const STOCK_PHOTOS: readonly StockPhoto[] = [
  {
    id: "quarto-casal",
    url: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    width: 4048,
    height: 3036,
    caption: "Quarto de casal com sala de estar",
    kind: "quarto",
  },
  {
    id: "suite-cortina",
    url: "https://images.unsplash.com/photo-1590490359854-dfba19688d70",
    width: 5120,
    height: 3840,
    caption: "Suíte com cama king e cortinas blackout",
    kind: "quarto",
  },
  {
    id: "quarto-madeira",
    url: "https://images.unsplash.com/photo-1731336478850-6bce7235e320",
    width: 5451,
    height: 3634,
    caption: "Quarto com cabeceira de madeira",
    kind: "quarto",
  },
  {
    id: "sala-estar",
    url: "https://images.unsplash.com/photo-1646974400439-321c4a9240b9",
    width: 5817,
    height: 3878,
    caption: "Sala de estar com vista para o pátio",
    kind: "area-comum",
  },
  {
    id: "quarto-claro",
    url: "https://images.unsplash.com/photo-1544097935-e6d136448533",
    width: 4249,
    height: 2833,
    caption: "Quarto claro com iluminação natural",
    kind: "quarto",
  },
  {
    id: "quarto-escrivaninha",
    url: "https://images.unsplash.com/photo-1776763018821-8feeaeeee0a5",
    width: 5857,
    height: 3905,
    caption: "Quarto com escrivaninha e poltrona",
    kind: "quarto",
  },
  {
    id: "quarto-duas-camas",
    url: "https://images.unsplash.com/photo-1718359759373-1b2670b7478b",
    width: 7670,
    height: 4318,
    caption: "Quarto duplo com duas camas e varanda",
    kind: "quarto",
  },
  {
    id: "quarto-tv",
    url: "https://images.unsplash.com/photo-1725962479542-1be0a6b0d444",
    width: 6000,
    height: 4000,
    caption: "Quarto com cama de casal e TV",
    kind: "quarto",
  },
  {
    id: "quarto-mesa",
    url: "https://images.unsplash.com/photo-1702014859878-5d4743176d28",
    width: 5744,
    height: 3829,
    caption: "Quarto com mesa de apoio e cadeiras",
    kind: "quarto",
  },
  {
    id: "quarto-espelho",
    url: "https://images.unsplash.com/photo-1737517302831-e7b8a8eaa97c",
    width: 6000,
    height: 4000,
    caption: "Quarto duplo com espelho amplo",
    kind: "quarto",
  },
  {
    id: "quarto-ventilador",
    url: "https://images.unsplash.com/photo-1662841540530-2f04bb3291e8",
    width: 9280,
    height: 6944,
    caption: "Quarto com ventilador de teto",
    kind: "quarto",
  },
  {
    id: "quarto-janela",
    url: "https://images.unsplash.com/photo-1675409145919-277c0fc2aa7d",
    width: 4000,
    height: 3000,
    caption: "Quarto com janela ampla",
    kind: "quarto",
  },
  {
    id: "quarto-azul",
    url: "https://images.unsplash.com/photo-1608198399988-341f712c3711",
    width: 5568,
    height: 3712,
    caption: "Quarto com roupa de cama azul",
    kind: "quarto",
  },
  {
    id: "quarto-cabeceira",
    url: "https://images.unsplash.com/photo-1559841644-08984562005a",
    width: 3264,
    height: 2448,
    caption: "Cabeceira de madeira e travesseiros",
    kind: "quarto",
  },
  {
    id: "banheiro-box",
    url: "https://images.unsplash.com/photo-1651951646668-46562cfb4518",
    width: 4981,
    height: 3277,
    caption: "Banheiro com box de vidro",
    kind: "banheiro",
  },
  {
    id: "banheiro-amplo",
    url: "https://images.unsplash.com/photo-1704428381342-ea9df943619e",
    width: 5999,
    height: 4005,
    caption: "Banheiro amplo com bancada",
    kind: "banheiro",
  },
  {
    id: "banheiro-claro",
    url: "https://images.unsplash.com/photo-1702014859028-c773f15029db",
    width: 5368,
    height: 3579,
    caption: "Banheiro com chuveiro sem desnível",
    kind: "banheiro",
  },
  {
    id: "banheiro-toalhas",
    url: "https://images.unsplash.com/photo-1631015108968-ba3b87f89005",
    width: 6240,
    height: 4160,
    caption: "Toalhas e amenidades do banheiro",
    kind: "banheiro",
  },
  {
    id: "cafe-mesa",
    url: "https://images.unsplash.com/photo-1464306208223-e0b4495a5553",
    width: 5707,
    height: 3805,
    caption: "Café da manhã servido no salão",
    kind: "cafe",
  },
  {
    id: "cafe-paes",
    url: "https://images.unsplash.com/photo-1558497446-1fd7429d9be4",
    width: 5184,
    height: 3456,
    caption: "Pães e bolos caseiros do café da manhã",
    kind: "cafe",
  },
  {
    id: "cafe-mesa-posta",
    url: "https://images.unsplash.com/photo-1728051104003-aa16971b44b3",
    width: 6000,
    height: 4000,
    caption: "Mesa posta para o café da manhã",
    kind: "cafe",
  },
  {
    id: "recepcao",
    url: "https://images.unsplash.com/photo-1759038085950-1234ca8f5fed",
    width: 8000,
    height: 6000,
    caption: "Recepção",
    kind: "area-comum",
  },
  {
    id: "lobby-plantas",
    url: "https://images.unsplash.com/photo-1758448500688-3ababa93fd67",
    width: 3000,
    height: 1688,
    caption: "Hall de entrada",
    kind: "area-comum",
  },
  {
    id: "patio-fonte",
    url: "https://images.unsplash.com/photo-1776083928944-f427c6f1f738",
    width: 3648,
    height: 2056,
    caption: "Pátio interno com fonte",
    kind: "externa",
  },
  {
    id: "patio-plantas",
    url: "https://images.unsplash.com/photo-1677514504767-10298c908758",
    width: 6960,
    height: 4640,
    caption: "Área de convivência ao ar livre",
    kind: "externa",
  },
  {
    id: "area-externa",
    url: "https://images.unsplash.com/photo-1668656985972-e57865a85efb",
    width: 6000,
    height: 4000,
    caption: "Fachada e área externa",
    kind: "externa",
  },
  {
    id: "jardim-fonte",
    url: "https://images.unsplash.com/photo-1576141034725-c64b35194fce",
    width: 5356,
    height: 4017,
    caption: "Jardim com fonte",
    kind: "externa",
  },
  {
    id: "varanda-mesa",
    url: "https://images.unsplash.com/photo-1609602126247-4ab7188b4aa1",
    width: 6000,
    height: 4000,
    caption: "Varanda com mesa para refeições",
    kind: "externa",
  },
];

const UNSPLASH_QUALITY = 85;

export function buildPhotoUrl(url: string, width: number): string {
  return `${url}?auto=format&fit=crop&q=${UNSPLASH_QUALITY}&w=${width}`;
}

export function findStockPhoto(id: string): StockPhoto | undefined {
  return STOCK_PHOTOS.find((photo) => photo.id === id);
}
