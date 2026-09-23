import { create } from "zustand";

export type BookingDraft = {
  checkIn: string | null;
  checkOut: string | null;
  adults: number;
  children: number;
  childAges: number[];
  seniors: number;
  rooms: number;
  roomTypeId: string | null;
};

const DEFAULT_ADULTS = 2;
const DEFAULT_ROOMS = 1;

export const EMPTY_BOOKING_DRAFT: BookingDraft = {
  checkIn: null,
  checkOut: null,
  adults: DEFAULT_ADULTS,
  children: 0,
  childAges: [],
  seniors: 0,
  rooms: DEFAULT_ROOMS,
  roomTypeId: null,
};

type BookingDraftState = {
  slug: string | null;
  draft: BookingDraft;
  initialize: (slug: string, draft: Partial<BookingDraft>) => void;
  update: (changes: Partial<BookingDraft>) => void;
};

export const useBookingDraftStore = create<BookingDraftState>()((set) => ({
  slug: null,
  draft: EMPTY_BOOKING_DRAFT,
  initialize: (slug, draft) =>
    set({ slug, draft: { ...EMPTY_BOOKING_DRAFT, ...draft } }),
  update: (changes) =>
    set((state) => ({ draft: { ...state.draft, ...changes } })),
}));
