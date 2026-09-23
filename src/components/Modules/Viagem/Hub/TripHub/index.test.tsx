import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { useSessionStore } from "@/store/Modules/Conta/use-session-store";
import { TripHub } from ".";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/minha-viagem",
}));

class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

function renderHub() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <TripHub />
    </QueryClientProvider>,
  );
}

describe("TripHub", () => {
  beforeAll(() => {
    vi.stubGlobal("IntersectionObserver", ObserverStub);
    vi.stubGlobal("ResizeObserver", ObserverStub);
  });

  beforeEach(() => {
    window.localStorage.clear();
  });

  it("mostra a próxima viagem em destaque e as abas com contagem", async () => {
    useSessionStore.getState().signIn("usr-marcos");
    renderHub();

    expect(
      await screen.findByRole("heading", {
        name: "Pousada Recanto dos Romeiros",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Faltam 73 dias")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Próximas/ })).toHaveTextContent(
      "1",
    );
    expect(screen.getByRole("tab", { name: /Anteriores/ })).toHaveTextContent(
      "2",
    );
    expect(screen.getByRole("tab", { name: /Canceladas/ })).toHaveTextContent(
      "1",
    );
  });

  it("mostra estado vazio com CTA para quem não tem reservas", async () => {
    useSessionStore.getState().signIn("usr-ana");
    renderHub();

    expect(
      await screen.findByText("Nenhuma viagem marcada"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Encontrar hospedagem" }),
    ).toHaveAttribute("href", "/hospedagens");
  });
});
