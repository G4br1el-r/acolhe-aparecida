import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSessionStore } from "@/store/Modules/Conta/use-session-store";
import { TripDetail } from ".";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/minha-viagem",
}));

class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

function renderDetail(reservationId: string) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <TripDetail reservationId={reservationId} />
    </QueryClientProvider>,
  );
}

describe("TripDetail", () => {
  beforeAll(() => {
    vi.stubGlobal("IntersectionObserver", ObserverStub);
    vi.stubGlobal("ResizeObserver", ObserverStub);
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: false,
      media: query,
      addEventListener() {},
      removeEventListener() {},
    }));
  });

  beforeEach(() => {
    window.localStorage.clear();
  });

  it("mostra a viagem confirmada com ações e abre o cancelamento", async () => {
    useSessionStore.getState().signIn("usr-carlos");
    renderDetail("res-carlos-outubro-2026");

    expect(
      await screen.findByRole("heading", { level: 1, name: "Faltam 17 dias" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("AC-7K2M9Q").length).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("button", { name: "Alterar datas" }).length,
    ).toBeGreaterThan(0);

    await userEvent.click(
      screen.getByRole("button", { name: "Cancelar reserva" }),
    );

    expect(
      await screen.findByRole("heading", { name: "Cancelar reserva?" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Cancelamento gratuito")).toBeInTheDocument();
  });

  it("convida a avaliar quando a estadia foi concluída", async () => {
    useSessionStore.getState().signIn("usr-lucia");
    renderDetail("res-lucia-agosto-2026");

    expect(
      await screen.findByRole("heading", { name: "Como foi sua estadia?" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Avaliar estadia" })[0],
    ).toHaveAttribute("href", "/minha-viagem/res-lucia-agosto-2026/avaliar");
    expect(
      screen.getAllByRole("link", { name: "Reservar novamente" })[0],
    ).toHaveAttribute(
      "href",
      "/hospedagens/hotel-sao-miguel?adultos=0&idosos=2",
    );
  });

  it("não expõe reserva de outra pessoa", async () => {
    useSessionStore.getState().signIn("usr-ana");
    renderDetail("res-carlos-outubro-2026");

    expect(
      await screen.findByText("Reserva não encontrada"),
    ).toBeInTheDocument();
  });
});
