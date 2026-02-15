import { describe, test } from 'node:test'
import { expect } from '@hapi/code'

import Seneca from 'seneca'
import Openf1Doc from '..'
import Openf1Provider from '..'

describe('Openf1', () => {
  test('load-plugin', async () => {
    expect(Openf1Doc).exist()

    const seneca = makeSeneca().use(Openf1Provider, {})

    await seneca.ready()

    expect(seneca.find_plugin('Openf1Provider')).exist()
  })

  test('get-info', async () => {
    const seneca = makeSeneca().use(Openf1Provider, {})

    await seneca.ready()

    const info = await seneca.post('sys:provider,provider:openf1,get:info')

    expect(info.ok).true()
  })
})

function makeSeneca() {
  const seneca = Seneca({ legacy: false }).test().use('promisify').use('entity')
  return seneca
}
