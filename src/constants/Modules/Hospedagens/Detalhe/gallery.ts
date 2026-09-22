export type GalleryPhoto = {
  id: string;
  url: string;
  width: number;
  height: number;
  caption: string;
};

const UNSPLASH_PHOTOS: readonly GalleryPhoto[] = [
  {
    id: "quarto-casal",
    url: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    width: 4048,
    height: 3036,
    caption: "Quarto de casal com sala de estar",
  },
  {
    id: "suite-cortina",
    url: "https://images.unsplash.com/photo-1590490359854-dfba19688d70",
    width: 5120,
    height: 3840,
    caption: "Suíte com cama king e cortinas blackout",
  },
  {
    id: "quarto-madeira",
    url: "https://images.unsplash.com/photo-1731336478850-6bce7235e320",
    width: 5451,
    height: 3634,
    caption: "Quarto com cabeceira de madeira",
  },
  {
    id: "sala-estar",
    url: "https://images.unsplash.com/photo-1646974400439-321c4a9240b9",
    width: 5817,
    height: 3878,
    caption: "Sala de estar com vista para o pátio",
  },
  {
    id: "quarto-claro",
    url: "https://images.unsplash.com/photo-1544097935-e6d136448533",
    width: 4249,
    height: 2833,
    caption: "Quarto claro com iluminação natural",
  },
  {
    id: "quarto-escrivaninha",
    url: "https://images.unsplash.com/photo-1776763018821-8feeaeeee0a5",
    width: 5857,
    height: 3905,
    caption: "Quarto com escrivaninha e poltrona",
  },
  {
    id: "banheiro-box",
    url: "https://images.unsplash.com/photo-1651951646668-46562cfb4518",
    width: 4981,
    height: 3277,
    caption: "Banheiro com box de vidro",
  },
  {
    id: "banheiro-amplo",
    url: "https://images.unsplash.com/photo-1704428381342-ea9df943619e",
    width: 5999,
    height: 4005,
    caption: "Banheiro amplo com bancada",
  },
  {
    id: "banheiro-claro",
    url: "https://images.unsplash.com/photo-1702014859028-c773f15029db",
    width: 5368,
    height: 3579,
    caption: "Banheiro com chuveiro sem desnível",
  },
  {
    id: "cafe-mesa",
    url: "https://images.unsplash.com/photo-1464306208223-e0b4495a5553",
    width: 5707,
    height: 3805,
    caption: "Café da manhã servido no salão",
  },
  {
    id: "cafe-paes",
    url: "https://images.unsplash.com/photo-1558497446-1fd7429d9be4",
    width: 5184,
    height: 3456,
    caption: "Pães e bolos caseiros do café da manhã",
  },
  {
    id: "cafe-mesa-posta",
    url: "https://images.unsplash.com/photo-1728051104003-aa16971b44b3",
    width: 6000,
    height: 4000,
    caption: "Mesa posta para o café da manhã",
  },
  {
    id: "recepcao",
    url: "https://images.unsplash.com/photo-1759038085950-1234ca8f5fed",
    width: 8000,
    height: 6000,
    caption: "Recepção aberta 24 horas",
  },
  {
    id: "lobby-plantas",
    url: "https://images.unsplash.com/photo-1758448500688-3ababa93fd67",
    width: 3000,
    height: 1688,
    caption: "Hall de entrada",
  },
  {
    id: "patio-fonte",
    url: "https://images.unsplash.com/photo-1776083928944-f427c6f1f738",
    width: 3648,
    height: 2056,
    caption: "Pátio interno com fonte",
  },
  {
    id: "patio-plantas",
    url: "https://images.unsplash.com/photo-1677514504767-10298c908758",
    width: 6960,
    height: 4640,
    caption: "Área de convivência ao ar livre",
  },
  {
    id: "area-externa",
    url: "https://images.unsplash.com/photo-1668656985972-e57865a85efb",
    width: 6000,
    height: 4000,
    caption: "Fachada e área externa",
  },
  {
    id: "jardim-fonte",
    url: "https://images.unsplash.com/photo-1576141034725-c64b35194fce",
    width: 5356,
    height: 4017,
    caption: "Jardim com fonte",
  },
];

const HERO_PHOTO_COUNT = 5;
const UNSPLASH_QUALITY = 85;

export const GALLERY_HERO_PHOTO_COUNT = HERO_PHOTO_COUNT;

export function buildPhotoUrl(url: string, width: number): string {
  return `${url}?auto=format&fit=crop&q=${UNSPLASH_QUALITY}&w=${width}`;
}

const SHOWCASE_PHOTO_IDS: readonly string[] = [
  "quarto-casal",
  "suite-cortina",
  "quarto-madeira",
  "sala-estar",
  "quarto-claro",
  "quarto-escrivaninha",
];

function rotate<Item>(items: readonly Item[], offset: number): Item[] {
  return items.map(
    (_, index) => items[(index + offset) % items.length] as Item,
  );
}

export function getGalleryPhotos(slug: string): GalleryPhoto[] {
  const offset = slug
    .split("")
    .reduce((total, character) => total + character.charCodeAt(0), 0);

  const showcasePhotos = UNSPLASH_PHOTOS.filter((photo) =>
    SHOWCASE_PHOTO_IDS.includes(photo.id),
  );
  const remainingPhotos = UNSPLASH_PHOTOS.filter(
    (photo) => !SHOWCASE_PHOTO_IDS.includes(photo.id),
  );

  return [
    ...rotate(showcasePhotos, offset),
    ...rotate(remainingPhotos, offset),
  ];
}
