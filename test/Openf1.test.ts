import { describe, test } from 'node:test'
import { expect } from '@hapi/code'

import Seneca from 'seneca'
import Openf1Doc from '..'
import Openf1Provider from '..'

describe('Openf1', () => {
  test('load-plugin', async () => {
    expect(Openf1Doc).exist()

    const seneca = makeSeneca()

    await seneca.ready()

    expect(seneca.find_plugin('Openf1Provider')).exist()
  })

  test('get-info', async () => {
    const seneca = makeSeneca()

    await seneca.ready()

    const info = await seneca.post('sys:provider,provider:openf1,get:info')

    expect(info.ok).true()
  })

  // test('get-current-year-race', async () => {
  //   const seneca = makeSeneca()
  //   await seneca.ready()
  //
  //   const sessions = await seneca.entity('provider/openf1/session').list$({
  //     year: 2026,
  //     session_type: 'Race',
  //   })
  //   // console.log('sessions', sessions)
  //
  //   expect(sessions).array()
  //   expect(sessions.length).equal(30)
  //
  //   const s = sessions[0]
  //   expect(s['entity$']).equal('provider/openf1/session')
  //   expect(s.session_key).number()
  //   expect(s.session_type).equal('Race')
  //   expect(s.year).equal(2026)
  // })
  //
  // test('list-sessions-by-year', async () => {
  //   const seneca = makeSeneca()
  //   await seneca.ready()
  //
  //   const sessions = await seneca.entity('provider/openf1/session').list$({
  //     year: 2025,
  //   })
  //
  //   expect(sessions).array()
  // })
})

function makeSeneca() {
  const seneca = Seneca({ legacy: false })
    .test()
    .use('promisify')
    .use('entity')
    .use('provider')
    .use(Openf1Provider)
  return seneca
}
