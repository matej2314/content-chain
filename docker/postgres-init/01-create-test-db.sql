-- DX / e2e: druga baza na tej samej instancji (setup-env → content_chain_test).
-- Uruchamiane tylko przy pierwszym starcie pustego volume (docker-entrypoint-initdb.d).
CREATE DATABASE content_chain_test;
