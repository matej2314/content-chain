# Graph Report - resilience  (2026-11-09)

## Corpus Check
- 4 files · ~1,220 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 22 nodes · 44 edges · 3 communities (2 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e0dda7bb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ResilientExecutor
- resilient-executor.ts
- .tryAlias

## God Nodes (most connected - your core abstractions)
1. `ResilientExecutor` - 12 edges
2. `ResilientExecutionOptions` - 5 edges
3. `RetryPolicy` - 4 edges
4. `assertNoFallbackCycle()` - 3 edges
5. `isRetryableHttpError()` - 3 edges
6. `AttemptResult` - 3 edges
7. `ResilientExecutionResult` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (3 total, 1 thin omitted)

### Community 0 - "ResilientExecutor"
Cohesion: 0.36
Nodes (3): Injectable, ResilientExecutionOptions, ResilientExecutor

### Community 1 - "resilient-executor.ts"
Cohesion: 0.39
Nodes (4): assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionResult

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ResilientExecutor` connect `ResilientExecutor` to `resilient-executor.ts`, `.tryAlias`?**
  _High betweenness centrality (0.464) - this node is a cross-community bridge._
- **Why does `ResilientExecutionOptions` connect `ResilientExecutor` to `resilient-executor.ts`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `RetryPolicy` connect `.tryAlias` to `resilient-executor.ts`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._