/* Copyright © 2026 Seneca Project Contributors, MIT License. */

const Pkg = require('../package.json')

type Openf1ProviderOptions = {
  url: string
  // fetch?: any
  // entity?: Record<string, any>
  debug: boolean
}

function Openf1Provider(this: any, options: any) {
  const seneca: any = this

  // const makeUtils = seneca.export('provider/makeUtils')
  //
  // const { makeUrl, getJson, entityBuilder } = makeUtils({
  //   name: 'openf1',
  //   options,
  // })

  seneca.message('sys:provider,provider:openf1,get:info', get_info)

  async function get_info(this: any, _msg: any) {
    return {
      ok: true,
      name: 'openf1',
      version: Pkg.version,
    }
  }

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
