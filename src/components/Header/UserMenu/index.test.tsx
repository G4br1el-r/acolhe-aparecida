import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSessionStore } from "@/store/Modules/Conta/use-session-store";
import { UserMenu } from ".";

function renderMenu() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <UserMenu fullName="Ana Beatriz" />
    </QueryClientProvider>,
  );
}

describe("UserMenu", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useSessionStore.getState().signIn("usr-lucia");
  });

  it("abre o menu da conta com a opção de sair", async () => {
    renderMenu();

    await userEvent.click(
      screen.getByRole("button", { name: "Conta de Ana Beatriz" }),
    );

    expect(await screen.findByText("Sair")).toBeInTheDocument();
    expect(screen.getByText("Sua conta")).toBeInTheDocument();
  });

  it("encerra a sessão ao clicar em sair", async () => {
    const assign = vi.fn();
    vi.stubGlobal("location", { ...window.location, assign });
    renderMenu();

    await userEvent.click(
      screen.getByRole("button", { name: "Conta de Ana Beatriz" }),
    );
    await userEvent.click(await screen.findByText("Sair"));

    expect(useSessionStore.getState().userId).toBeNull();
    expect(assign).toHaveBeenCalledWith("/");
    vi.unstubAllGlobals();
  });
});
