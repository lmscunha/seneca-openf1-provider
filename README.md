# seneca-openf1-provider

[Seneca](http://senecajs.org) plugin for the [OpenF1](https://openf1.org) REST API. Provides access to Formula 1 session data (races, qualifying, practice, etc.) via the public `https://api.openf1.org/v1/` endpoint — no credentials required.

## Install

```bash
npm install seneca-openf1-provider
```

### Peer dependencies

```bash
npm install seneca seneca-entity seneca-promisify @seneca/entity-util gubu
```

## Usage

```javascript
const Seneca = require('seneca')
const Openf1Provider = require('seneca-openf1-provider')

const seneca = Seneca({ legacy: false })
  .use('promisify')
  .use('entity')
  .use(Openf1Provider)

await seneca.ready()

// List all Race sessions for 2026
const races = await seneca.entity('provider/openf1/session').list$({
  q: { year: 2026, session_type: 'Race' },
})

console.log(races)

// List all sessions for a given year
const sessions = await seneca.entity('provider/openf1/session').list$({
  q: { year: 2025 },
})

console.log(sessions)
```

## Provider info

```javascript
const info = await seneca.post('sys:provider,provider:openf1,get:info')
// { ok: true, name: 'openf1', version: '...' }
```

## Entity: `provider/openf1/session`

Maps to the OpenF1 `/sessions` endpoint.

### `list$(q)`

Fetch a list of sessions. All query fields are optional.

| Query field    | Type     | Description                                                    |
| -------------- | -------- | -------------------------------------------------------------- |
| `year`         | `number` | Filter by season year (e.g. `2025`, `2026`)                    |
| `session_type` | `string` | Filter by type: `'Race'`, `'Qualifying'`, `'Practice 1'`, etc. |

### Session fields

Each returned entity includes the following fields from the OpenF1 API:

| Field                | Type     | Description                        |
| -------------------- | -------- | ---------------------------------- |
| `session_key`        | `number` | Unique session identifier          |
| `session_name`       | `string` | Human-readable session name        |
| `session_type`       | `string` | Session type (Race, Qualifying, …) |
| `year`               | `number` | Season year                        |
| `date_start`         | `string` | Session start timestamp (ISO 8601) |
| `date_end`           | `string` | Session end timestamp (ISO 8601)   |
| `gmt_offset`         | `string` | Circuit GMT offset                 |
| `circuit_key`        | `number` | Circuit identifier                 |
| `circuit_short_name` | `string` | Short name of the circuit          |
| `country_key`        | `number` | Country identifier                 |
| `country_code`       | `string` | ISO country code                   |
| `country_name`       | `string` | Country name                       |
| `location`           | `string` | Circuit location/city              |
| `meeting_key`        | `number` | Meeting (Grand Prix weekend) key   |

## Options

| Option  | Default                      | Description          |
| ------- | ---------------------------- | -------------------- |
| `url`   | `https://api.openf1.org/v1/` | Base URL for the API |
| `debug` | `false`                      | Enable debug logging |

## License

MIT © [Seneca Project Contributors](https://github.com/lmscunha/seneca-openf1-provider)
