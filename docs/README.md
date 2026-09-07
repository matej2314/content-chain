# Content Chain

> **Work in progress.** Content Chain is under active development and is **not a finished product**. APIs, UI, and behaviour may change without notice. Do not treat this repository as production-ready.

**Content Chain** is a self-hosted, agent-based application for generating marketing and web copy from a shared company context. A brief goes through an agent pipeline, is checked against the company’s profile, and the run is stored with a readable log.

The product covers two generation channels:

- **Social** — post ideas, post content, and short-form reel scripts (LinkedIn, Facebook, Instagram).
- **Content** — basic page and article copy (blog, service page, landing).

One installation is one company and one shared context. The project is intended as a public, MIT-licensed self-host stack, not a multi-tenant SaaS.

## Applications

The monorepo is organised around three runtime apps in `apps/`:

| App | Role |
|-----|------|
| `apps/frontend` | Web dashboard (Next.js): company context, generation flows, run logs. A thin UI client — no domain rules and no direct access to LLM vendors. |
| `apps/api` | Product backend (NestJS): auth, company context, Social and Content pipelines, async runs, persistence. The only owner of Content Chain domain logic. |
| `apps/ai-provider-gateway` | Standalone LLM gateway (NestJS): routing to model providers. The API talks to models **only** through this service; the gateway has no Social/Content product logic. |

Together they form a modular monolith: the frontend talks to the API over HTTP (and SSE for live run status); the API talks to the gateway; the gateway talks to LLM vendors.

---

# Content Chain

> **W trakcie prac.** Content Chain jest w **fazie developmentu** i **nie jest ukończonym produktem**. API, interfejs i zachowanie systemu mogą się zmieniać. Tego repozytorium nie należy traktować jako gotowego do produkcji.

**Content Chain** to self-hostowalna aplikacja agentowa do generowania treści marketingowych i copy stron na podstawie wspólnego kontekstu firmy. Brief przechodzi przez pipeline agentów, jest weryfikowany względem profilu organizacji, a przebieg runu trafia do bazy wraz z czytelnym logiem.

Produkt obejmuje dwa kanały generowania:

- **Social** — pomysły na posty, treść postów oraz scenariusze rolek (LinkedIn, Facebook, Instagram).
- **Content** — podstawowe copy stron i artykułów (blog, strona oferty, landing).

Jedna instalacja = jedna firma = jeden wspólny kontekst. Projekt jest przewidziany jako publiczny, self-hostowalny stos na licencji MIT, a nie jako multi-tenant SaaS.

## Aplikacje

Monorepo opiera się na trzech aplikacjach runtime w `apps/`:

| Aplikacja | Rola |
|-----------|------|
| `apps/frontend` | Dashboard webowy (Next.js): kontekst firmy, flow’y generowania, logi runów. Cienki klient UI — bez reguł domenowych i bez bezpośredniego dostępu do vendorów LLM. |
| `apps/api` | Backend produktowy (NestJS): auth, kontekst firmy, pipeline’y Social i Content, asynchroniczne runy, persistence. Jedyny właściciel logiki domenowej Content Chain. |
| `apps/ai-provider-gateway` | Osobny gateway LLM (NestJS): routing do dostawców modeli. API rozmawia z modelami **wyłącznie** przez tę usługę; gateway nie zawiera logiki produktowej Social/Content. |

Razem tworzą modularny monolit: frontend komunikuje się z API po HTTP (oraz SSE dla statusu runu na żywo); API komunikuje się z gatewayem; gateway komunikuje się z vendorami LLM.
