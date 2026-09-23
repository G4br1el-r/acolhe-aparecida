# Arquitetura de mocks — Acolher Aparecida

Nesta fase não existe backend. Toda a aplicação funciona com uma camada de dados mockada, organizada para ser trocada por API sem reescrever a interface.

## Fluxo de dados

```text
UI (componentes)
  ↓
Hooks (React Query / Zustand)  — src/hooks/Modules/**, src/store/Modules/**
  ↓
Services (async, com latência)  — src/services/Modules/**
  ↓
Mocks (datasets + storage local) — src/mocks/**
```

- A UI nunca importa dados mockados diretamente. Só páginas Server Component leem `ACCOMMODATIONS` de forma síncrona para SSG/metadata.
- Services são assíncronos e usam `delay()` de `src/mocks/latency.ts`. Em testes e no servidor a latência é zero.
- Dados que o usuário altera (reservas, avaliações, notificações, usuários, cupons) vivem em coleções no `localStorage`, via `src/mocks/storage.ts` (`readCollection`, `writeCollection`). Cada coleção é semeada na primeira leitura.
- Preferências e seleções do cliente (sessão, favoritos, comparação, rascunho de busca, rascunho de checkout, lugares salvos) usam Zustand com `persist`.
- Para trocar por API: substituir o corpo dos services mantendo assinaturas; hooks e UI permanecem.

## Cenários de QA

- `?cenario=erro`, `?cenario=vazio`, `?cenario=lento` na rota `/hospedagens` simulam falha, lista vazia e latência alta.
- Datas de alta procura (`src/constants/Modules/Hospedagens/Busca/high-demand-periods.ts`) reduzem disponibilidade e sobem o preço por noite. Em 10 a 13 de outubro várias hospedagens ficam sem vaga.
- Cartões de teste: `4242 4242 4242 4242` aprova, `4000 0000 0000 0002` recusa, `4000 0000 0000 0119` simula falha da operadora. PIX aprova ao clicar em "Já fiz o pagamento" e expira em 15 minutos.
- Cupons: `BEMVINDO10`, `ROMARIA150` (grupos a partir de 10 pessoas), `VOLTEI5` (a partir de R$ 400).

## Personas de demonstração

| Persona | E-mail | Situação |
| --- | --- | --- |
| Ana Beatriz | ana.beatriz@exemplo.com.br | Conta nova, sem reservas |
| Carlos Eduardo | carlos.eduardo@exemplo.com.br | Viagem confirmada em outubro, hóspedes frequentes |
| Dona Lúcia | lucia.ferreira@exemplo.com.br | Estadia concluída sem avaliação |
| Pe. Marcos | pe.marcos@exemplo.com.br | Histórico, reserva cancelada e viagem futura |

Qualquer senha com 6 ou mais caracteres é aceita. "Recomeçar demonstração" em Minha conta limpa as coleções locais e volta ao estado semeado.

## Decisões registradas

- Escala de avaliação de 1 a 5 (estrelas), mantendo o padrão já aprovado na Home. Os filtros de nota usam 4,0+, 4,5+ e 4,8+.
- Distâncias são calculadas por Haversine a partir das coordenadas e apresentadas de forma objetiva (metros, minutos a pé, minutos de carro).
- O mapa usa a ilustração local (`/maps.png`) quando não há chave do Google Maps. As posições no mapa ilustrado são manuais por hospedagem.
