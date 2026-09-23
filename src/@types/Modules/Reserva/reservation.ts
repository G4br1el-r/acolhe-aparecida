export type ReservationStatus =
  | "aguardando-pagamento"
  | "confirmada"
  | "concluida"
  | "cancelada"
  | "reembolsada";

export type PaymentMethod = "pix" | "cartao";

export type PaymentStatus =
  | "aguardando"
  | "processando"
  | "aprovado"
  | "recusado"
  | "expirado"
  | "erro"
  | "reembolsado";

export type GuestAgeGroup = "adulto" | "crianca" | "idoso";

export type ReservationGuest = {
  id: string;
  fullName: string;
  ageGroup: GuestAgeGroup;
  document?: string;
  age?: number;
};

export type ReservationExtraId =
  | "cafe-da-manha"
  | "almoco"
  | "berco"
  | "vaga-van"
  | "vaga-onibus"
  | "check-in-antecipado";

export type ReservationExtra = {
  id: ReservationExtraId;
  label: string;
  pricePerNight?: number;
  pricePerStay?: number;
  quantity: number;
};

export type AppliedCoupon = {
  code: string;
  description: string;
  discount: number;
};

export type PriceSummary = {
  nightlyRate: number;
  nightCount: number;
  roomCount: number;
  subtotal: number;
  extrasTotal: number;
  serviceFee: number;
  discount: number;
  total: number;
  installmentCount: number;
  installmentValue: number;
  dueNow: number;
  hasHighDemandPricing: boolean;
};

export type PaymentRecord = {
  method: PaymentMethod;
  status: PaymentStatus;
  installmentCount: number;
  cardLastDigits?: string;
  cardBrand?: string;
  pixCode?: string;
  paidAt?: string;
  amountPaid: number;
};

export type Reservation = {
  id: string;
  code: string;
  userId: string;
  accommodationSlug: string;
  roomTypeId: string;
  roomCount: number;
  checkIn: string;
  checkOut: string;
  guests: ReservationGuest[];
  responsible: {
    fullName: string;
    email: string;
    phone: string;
    document: string;
  };
  extras: ReservationExtra[];
  specialRequests?: string;
  coupon?: AppliedCoupon;
  price: PriceSummary;
  payment: PaymentRecord;
  status: ReservationStatus;
  createdAt: string;
  cancelledAt?: string;
  refundAmount?: number;
  reviewId?: string;
};
