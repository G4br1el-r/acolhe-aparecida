# CLAUDE.md — Acolher Aparecida

Regras específicas deste projeto. Regras gerais (válidas em qualquer stack) estão em `~/.claude/CLAUDE.md` e carregam junto automaticamente.

---

## Contexto do produto

Este projeto é o **Acolher Aparecida**, um marketplace transacional e ecossistema digital de hospedagem e turismo focado exclusivamente em **Aparecida-SP**.

A plataforma não deve ser tratada como um marketplace genérico ou simplesmente como uma cópia local do Booking/Airbnb.

A visão do produto é:

> **Ser o lugar onde o usuário organiza sua viagem inteira para Aparecida.**

A hospedagem é o núcleo inicial do produto, mas a arquitetura e as decisões de produto devem considerar a evolução futura para um ecossistema completo da viagem.

Quando existirem, consultar também:

- `docs/product-context.md`
- `docs/ux-principles.md`

### Princípios centrais do produto

- O destino é sempre **Aparecida-SP**.
- Não perguntar ao usuário para onde ele vai quando isso for desnecessário.
- Booking, Airbnb e grandes marketplaces podem ser usados como referência de UX e padrões consolidados, mas não devem ser copiados visualmente.
- A reserva deve acontecer **100% dentro da plataforma**.
- O pagamento deve acontecer **100% dentro da plataforma**.
- Não redirecionar o usuário para WhatsApp, telefone, Instagram ou site externo para concluir a reserva.
- O produto deve ser especializado na realidade de Aparecida.
- Priorizar famílias, idosos, grupos, romarias e excursões como públicos importantes.
- Informações como distância do Santuário, estacionamento, alimentação, acessibilidade, vans, ônibus, grupos e recepção 24h fazem parte da proposta de valor.
- Distâncias e localização devem ser apresentadas de forma objetiva.
- Não criar classificações subjetivas negativas como "trajeto ruim", "subida difícil" ou "acesso complicado".
- Mostrar preços com transparência.
- Evitar surpresas no checkout.
- Diferenciar sempre:
  - MVP;
  - evolução futura;
  - ideia experimental.

### Visão de longo prazo

A plataforma deve estar preparada para futuramente incorporar:

- restaurantes;
- estacionamentos;
- transfers;
- passeios;
- atrações;
- experiências;
- comércio;
- transporte;
- eventos;
- serviços turísticos;
- fidelidade;
- créditos/cashback;
- busca inteligente;
- recomendações personalizadas.

A visão de longo prazo é:

> **Uma conta, uma viagem, uma plataforma.**

---

## Princípios de UX

Sempre priorizar:

1. Clareza.
2. Confiança.
3. Simplicidade.
4. Comparação fácil.
5. Transparência de preço.
6. Reserva simples.
7. Pouca fricção.
8. Informação objetiva.
9. Excelente experiência mobile.
10. Especialização na realidade de Aparecida.

### Busca

Como o destino já é Aparecida, a busca deve priorizar:

- check-in;
- check-out;
- hóspedes;
- adultos;
- crianças;
- idosos;
- quartos;
- acessibilidade;
- grupos;
- romarias.

Evitar campos e etapas que existam apenas porque marketplaces generalistas utilizam.

### Mobile First

A experiência mobile é prioridade.

Ao implementar qualquer fluxo, validar primeiro se ele funciona bem em telas pequenas.

Especial atenção para:

- busca;
- filtros;
- calendário;
- mapa;
- checkout;
- pagamentos;
- comparação;
- área "Minha Viagem".

Desktop também deve possuir experiência premium, mas não às custas da experiência mobile.

### Preço

Sempre que possível, mostrar ao usuário o valor real da estadia.

No checkout, deixar claro:

- diária;
- número de noites;
- subtotal;
- taxas;
- extras;
- descontos;
- cupom;
- total;
- parcelas;
- valor por parcela;
- quanto será cobrado naquele momento.

---

## Direção de UI e Design

A interface deve parecer um produto digital de alto nível, não um template genérico.

### Evitar

- aparência genérica de SaaS;
- estética típica de interface gerada por IA;
- excesso de cards;
- excesso de ícones;
- excesso de badges;
- excesso de texto;
- hero genérico com texto de um lado e imagem do outro sem intenção visual;
- componentes usados apenas porque já existem em uma biblioteca;
- glassmorphism aplicado indiscriminadamente;
- gradientes desnecessários;
- ornamentos sem função visual;
- animações apenas decorativas;
- repetição visual excessiva;
- excesso de bordas e containers.

### Priorizar

- hierarquia visual forte;
- composição;
- profundidade;
- respiro;
- tipografia;
- ritmo;
- contraste;
- fotografia de alta qualidade;
- identidade própria;
- interações bem pensadas;
- microinterações;
- motion com propósito;
- clareza do CTA;
- consistência entre desktop e mobile.

### Identidade do projeto

A direção atual trabalha com:

- Aparecida e o Santuário como protagonistas visuais;
- fotografia cinematográfica e realista;
- azul como cor importante da identidade;
- branco e azuis muito claros para superfícies;
- composição limpa;
- elementos suaves;
- curvas/ondas usadas com moderação;
- linguagem acolhedora;
- percepção de confiança;
- experiência moderna sem perder a ligação com fé e hospitalidade.

Não transformar a interface em uma estética religiosa caricata.

Não exagerar em:

- cruzes;
- ícones religiosos;
- ornamentos;
- dourado;
- símbolos devocionais.

A fé deve aparecer de forma elegante e contextual.

### Imagens

Ao trabalhar com imagens do Santuário:

- priorizar realismo;
- preservar características reconhecíveis do local;
- evitar paisagens que não correspondam à realidade de Aparecida;
- remover ruído visual quando necessário;
- não inventar mata, montanhas, construções ou cenários excessivos apenas para deixar a imagem "mais bonita";
- preferir tratamento cinematográfico por luz, enquadramento, cor e profundidade.

---

## Processo de decisão

Antes de sugerir ou implementar uma funcionalidade relevante, avaliar:

1. Resolve um problema real do viajante?
2. Faz sentido especificamente em Aparecida?
3. Aumenta confiança?
4. Facilita comparação?
5. Facilita decisão?
6. Facilita reserva?
7. Pode aumentar conversão?
8. Cria diferenciação?
9. É simples o suficiente?
10. Deve existir agora ou pode esperar?
11. Contribui para o ecossistema de longo prazo?

Não adicionar funcionalidades apenas porque Booking, Airbnb ou outro concorrente possui.

---

## Forma de trabalho

Antes de implementar uma funcionalidade relevante:

1. Entender o problema.
2. Verificar o contexto do produto.
3. Verificar os princípios de UX.
4. Examinar o código existente.
5. Identificar padrões já utilizados.
6. Determinar se pertence ao MVP ou a uma fase futura.
7. Propor a solução.
8. Só então implementar.

Não reestruturar partes relevantes do projeto silenciosamente.

Se uma mudança exigir:

- nova pasta compartilhada;
- nova dependência;
- mudança arquitetural;
- mudança de padrão;
- mudança relevante de design;
- abstração nova;

explicar primeiro o que será criado ou alterado e por quê.

Ao terminar uma implementação visual relevante:

1. verificar responsividade;
2. verificar estados de hover/focus/disabled/loading quando aplicável;
3. verificar acessibilidade;
4. verificar consistência visual;
5. verificar se existem elementos genéricos ou desnecessários;
6. validar lint;
7. validar typecheck;
8. validar build quando pertinente.

---

## Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### Estado e dados

- Zustand (estado global/client)
- React Query (estado de servidor / cache de requisições)

### Formulários

- React Hook Form
- Zod (validação e schemas)

### Animação

- Motion (framer-motion)

### Qualidade

- Biome (lint + format)

---

## Arquitetura

### Componentes: Server vs Client

- Server Component é o padrão. Tudo que puder ser Server, é Server.
- Client Component isolado no menor componente possível — nunca "sobe" a diretiva `'use client'` pra um componente pai só porque um filho precisa de interatividade.
- Route Handler para lógica de API/integração.

### Estrutura de pastas

**Regra central: cada pasta compartilhada da raiz de `src/` (`@types`, `hooks`, `lib`, `schemas`, `services`, `store`, `errors`, `components`, e qualquer nova que surgir) repete internamente a MESMA árvore `Modules/<modulo>/<submodulo>/`.**

Nunca criar uma pasta compartilhada nova dentro de um módulo (ex: nunca `components/Modules/Logistica/WMS/services/`). A pasta compartilhada sempre nasce na raiz de `src/`, e é dentro dela que a árvore de módulo se repete.

```text
src/
  hooks/
    Modules/
      Logistica/
        WMS/
          use-separacao.ts
        Frotas/
          use-veiculo.ts
      Comercial/
        CRM/
          use-lead.ts

  store/
    Modules/
      Logistica/
        WMS/
        Frotas/
      Comercial/
        CRM/

  services/
    Modules/
      Logistica/
        WMS/
        Frotas/
      Comercial/
        CRM/

  errors/
    Modules/
      Logistica/
        WMS/
        Frotas/
      Comercial/
        CRM/

  components/
    Modules/
      Logistica/
        WMS/
          Conferencia/
          Pedidos/
          Separacao/
        Frotas/
      Comercial/
        CRM/
```

A árvore `Modules/<modulo do projeto>/<submodulo>/` é a mesma em toda pasta compartilhada — muda só o que tem dentro da folha final (hook, store, service, error, componente).

Em projeto novo, esse padrão já nasce assim desde o início — não é algo que só se aplica depois que cresce.

### Criando novas pastas compartilhadas

A lista de pastas compartilhadas na raiz não é fechada. Se surgir necessidade de uma categoria nova e genérica (ex: `constants/`, `utils/`), ela nasce na raiz de `src/` e segue a mesma árvore `Modules/<modulo>/<submodulo>/` por dentro.

Antes de criar uma pasta compartilhada nova, informar o que está sendo criado e por quê — nome da pasta, o que vai dentro dela, e a razão de não caber em nenhuma pasta já existente. Não assumir silenciosamente que o nome bate com o padrão certo.

### Regras de componentização

- Nunca mais de uma função por arquivo. Sempre componentizar.
- Todo componente vive em sua própria pasta, com `index.tsx` dentro.
- Organização por contexto quando o projeto é simples/único domínio (ex: `hero/`, `about-me/`, `header/`, `footer/`).

### Rotas (App Router)

```text
src/
  app/
    (protected)/
      <modulo>/            # ex: logistica, comercial
        <pagina>/          # ex: separacao, pedidos, inventario
          components/      # componentes usados só nessa página
    (public)/

  api/
    modules/
      <modulo>/
        <departamento>/
```

- `(protected)` e `(public)` agrupam rotas privadas e públicas.
- Dentro de `(protected)`, uma pasta por módulo — o nome do módulo entra na URL.
- Route Handlers seguem o mesmo particionamento por módulo dentro de `api/modules`.

### Estado

- Zustand sempre, para qualquer estado global/client.

---

## Convenções de código

- **Arquivos**: `kebab-case`
- **Componentes e Hooks**: `PascalCase` (padrão React) — hooks como `useAlgumaCoisa`

---

## Catálogo de skills (`~/Desktop/skill`)

Quando tarefa puder ser coberta por skill de negócio/conteúdo (contrato, SOP, copy, financeiro, jurídico, etc.):

1. Consultar `~/Desktop/skill/catalogo-skills.json` (1065 skills, 13 categorias).
2. Achou candidato → ler `.md` correspondente em `~/Desktop/skill/<path>`, verificar se serve.
3. Serve → instalar como skill formal em `.claude/skills/<nome>/SKILL.md` (frontmatter `name` + `description`).
4. Executar a partir da skill instalada.

---

## Comandos

- Dev: `pnpm dev`
- Lint: `pnpm biome check .`
- Typecheck: `pnpm tsc --noEmit`
- Build: `pnpm build`
