/* Copyright © 2026 Seneca Project Contributors, MIT License. */

import Pkg from '../package.json'

import type { Openf1ProviderOptions, SessionQuery, Session } from './Types.js'

function Openf1Provider(this: any, options: Openf1ProviderOptions) {
  const seneca: any = this

  const makeUtils = seneca.export('provider/makeUtils')

  const { makeUrl, getJSON, entityBuilder } = makeUtils({
    name: 'openf1',
    url: options.url,
  })

  seneca.message('sys:provider,provider:openf1,get:info', get_info)

  async function get_info(this: any, _msg: any) {
    return {
      ok: true,
      name: 'openf1',
      version: Pkg.version,
    }
  }

  entityBuilder &&
    entityBuilder(seneca, {
      provider: {
        name: 'openf1',
      },
      entity: {
        session: {
          cmd: {
            list: {
              action: async function (this: any, entize: any, msg: any) {
                const q: SessionQuery = msg.q || {}
                const json: Session[] = await getJSON(makeUrl('sessions', q))

                return json.map((session: Session) =>
                  entize(session, session.session_key)
                )
              },
            },
          },
        },
      },
    })

  seneca.prepare(async function (this: any) {})
}

const defaults: Openf1ProviderOptions = {
  url: 'https://api.openf1.org/v1/',
  debug: false,
}

Object.assign(Openf1Provider, { defaults })

export default Openf1Provider

if ('undefined' !== typeof module) {
  module.exports = Openf1Provider
}
