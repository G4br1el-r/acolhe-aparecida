import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSessionStore } from "@/store/Modules/Conta/use-session-store";
import { ReviewGate } from ".";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: vi.fn() }),
  usePathname: () => "/minha-viagem",
}));

function renderGate(reservationId: string) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ReviewGate reservationId={reservationId} />
    </QueryClientProvider>,
  );
}

describe("ReviewGate", () => {
  beforeEach(() => {
    window.localStorage.clear();
    push.mockClear();
  });

  it("bloqueia avaliação de viagem ainda não concluída", async () => {
    useSessionStore.getState().signIn("usr-carlos");
    renderGate("res-carlos-outubro-2026");

    expect(
      await screen.findByText("A avaliação abre depois do check-out"),
    ).toBeInTheDocument();
  });

  it("avisa quando a estadia já foi avaliada", async () => {
    useSessionStore.getState().signIn("usr-marcos");
    renderGate("res-marcos-junho-2026");

    expect(
      await screen.findByText("Você já avaliou esta estadia"),
    ).toBeInTheDocument();
  });

  it("valida o comentário curto e publica a avaliação", async () => {
    useSessionStore.getState().signIn("usr-lucia");
    renderGate("res-lucia-agosto-2026");

    const publish = await screen.findByRole("button", {
      name: "Publicar avaliação",
    });

    await userEvent.click(publish);
    expect(
      await screen.findByText("Conte um pouco mais: pelo menos 40 caracteres."),
    ).toBeInTheDocument();

    for (const radio of screen.getAllByRole("radio", {
      name: "5 de 5: Excelente",
    })) {
      await userEvent.click(radio);
    }
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: "Como foi a viagem?" }),
      "idosos",
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "Conte como foi" }),
      "Quarto adaptado no térreo como pedimos, equipe atenciosa e café servido cedo.",
    );
    await userEvent.click(publish);

    await vi.waitFor(() => {
      expect(push).toHaveBeenCalledWith("/minha-viagem/res-lucia-agosto-2026");
    });
  });
});
