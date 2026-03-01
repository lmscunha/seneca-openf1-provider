# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Build (compiles src/ and test/ via TypeScript project references)
npm run build

# Run all tests (against compiled dist-test/)
npm test

# Run a specific test by name pattern
TEST_PATTERN="get-info" npm run test-some

# Watch mode (rebuilds on changes)
npm run watch

# Format code
npm run prettier

# Full reset (clean, install, build, test)
npm run reset
```

> **Important:** Tests run against compiled JS in `dist-test/`, not TypeScript source directly. Always `npm run build` before `npm test`, or use `npm run watch` during development.

## Architecture

This is a **Seneca microservice plugin** that wraps the [OpenF1 REST API](https://api.openf1.org/v1/).

### Plugin structure

- `src/Openf1.ts` — Main plugin file. Exports a Seneca plugin function (`Openf1Provider`) with `defaults` attached.
- `src/Openf1Doc.ts` — Message documentation object (currently empty `messages: {}`); consumed by `seneca-doc`.
- `dist/` — Compiled output for the plugin (published to npm).
- `dist-test/` — Compiled output for tests (not published).

### TypeScript build

Two separate `tsconfig.json` files use TypeScript project references:

- `src/tsconfig.json` — Compiles `src/` → `dist/`
- `test/` has its own tsconfig (implied by `tsc --build src test`) → `dist-test/`

The module format is **CommonJS** (`"type": "commonjs"` in package.json) with ES2022 target.

### Seneca plugin pattern

The plugin uses `@seneca/provider` utilities via `seneca.export('provider/makeUtils')`, which provides:

- `makeUrl(path)` — Constructs full API URLs from `options.url` base.
- `getJson(url)` — Fetches JSON from the API.
- `entityBuilder(seneca, config)` — Wires up Seneca entity CRUD patterns to API calls.

Messages are registered with `seneca.message(pattern, handler)`. The standard info message is:

```
sys:provider,provider:openf1,get:info
```

Entity actions are defined under the `entityBuilder` config with `provider.name = 'openf1'` and per-entity `cmd` handlers (`list`, `load`, `save`, `remove`).

### Test pattern

Tests use Node's built-in `node:test` runner with `@hapi/code` for assertions. The `makeSeneca()` helper bootstraps a Seneca instance with `promisify`, `entity`, and the plugin loaded.

### Peer dependencies

The plugin requires `seneca`, `seneca-entity`, `seneca-promisify`, `@seneca/entity-util`, and `gubu` as peers — these are not bundled and must be provided by the consuming application.
