---
wersja: 1
data_utworzenia: 2026-11-19
data_modyfikacji: 2026-11-19
---

# Content Chain

> **Maintained.** Content Chain is a working self-host stack (local, homelab, and production-like Compose). The current product slice is stable; further features may be added over time. Treat documented contracts as the source of truth for behaviour.

**Content Chain** is a self-hosted, agent-based application for generating marketing and web copy from a shared company context. A brief goes through an agent pipeline, is checked against the company’s profile, and the run is stored with a readable log.

The product covers two generation channels:

- **Social** — post ideas, post content, and short-form reel scripts (LinkedIn, Facebook, Instagram).
- **Content** — basic page and article copy (blog, service page, landing).

One installation is one company and one shared context. The project is intended as a public, MIT-licensed self-host stack, not a multi-tenant SaaS.

## Applications

The monorepo is organised around four runtime apps in `apps/`:

| App | Role |
|-----|------|
| `apps/frontend` | Web dashboard (Next.js): company context, generation flows, run logs. A thin UI client — no domain rules and no direct access to LLM vendors. |
| `apps/api` | Product backend (NestJS): auth, company context, HTTP/SSE surface, persistence. Owns Content Chain domain orchestration at the API boundary. |
| `apps/worker` | Always-on run executor (NestJS): claim/execute pipelines, recovery, review sweep, abort handling. Shares Postgres with the API; no public operator REST surface. |
| `apps/ai-provider-gateway` | Standalone LLM gateway (NestJS): routing to model providers. The API and worker talk to models **only** through this service; the gateway has no Social/Content product logic. |

Together they form a modular monolith: the frontend talks to the API over HTTP (and SSE for live run status); the API and worker talk to the gateway; the gateway talks to LLM vendors.

---

# Content Chain

> **Utrzymywany.** Content Chain to działający stos self-host (lokalnie, homelab i Compose production-like). Bieżący slice produktowy jest stabilny; kolejne funkcje mogą dochodzić z czasem. Zachowanie systemu opisują kontrakty w dokumentacji.

**Content Chain** to self-hostowalna aplikacja agentowa do generowania treści marketingowych i copy stron na podstawie wspólnego kontekstu firmy. Brief przechodzi przez pipeline agentów, jest weryfikowany względem profilu organizacji, a przebieg runu trafia do bazy wraz z czytelnym logiem.

Produkt obejmuje dwa kanały generowania:

- **Social** — pomysły na posty, treść postów oraz scenariusze rolek (LinkedIn, Facebook, Instagram).
- **Content** — podstawowe copy stron i artykułów (blog, strona oferty, landing).

Jedna instalacja = jedna firma = jeden wspólny kontekst. Projekt jest przewidziany jako publiczny, self-hostowalny stos na licencji MIT, a nie jako multi-tenant SaaS.

## Aplikacje

Monorepo opiera się na czterech aplikacjach runtime w `apps/`:

| Aplikacja | Rola |
|-----------|------|
| `apps/frontend` | Dashboard webowy (Next.js): kontekst firmy, flow’y generowania, logi runów. Cienki klient UI — bez reguł domenowych i bez bezpośredniego dostępu do vendorów LLM. |
| `apps/api` | Backend produktowy (NestJS): auth, kontekst firmy, powierzchnia HTTP/SSE, persistence. Orkiestracja domeny Content Chain na granicy API. |
| `apps/worker` | Always-on executor runów (NestJS): claim/execute pipeline’ów, recovery, review sweep, abort. Współdzieli Postgres z API; bez publicznej powierzchni REST dla operatora. |
| `apps/ai-provider-gateway` | Osobny gateway LLM (NestJS): routing do dostawców modeli. API i worker rozmawiają z modelami **wyłącznie** przez tę usługę; gateway nie zawiera logiki produktowej Social/Content. |

Razem tworzą modularny monolit: frontend komunikuje się z API po HTTP (oraz SSE dla statusu runu na żywo); API i worker komunikują się z gatewayem; gateway komunikuje się z vendorami LLM.
