/* Copyright © 2026 Seneca Project Contributors, MIT License. */

const docs = {
  messages: {
    get_info: {
      desc: 'Get information about the OpenF1 provider plugin.',
    },
    entity: {
      session: {
        desc: 'An OpenF1 session (race, qualifying, practice, etc.). Supports list$.',
        cmd: {
          list: {
            desc: 'List sessions. Filter by year and/or session_type via msg.q.',
          },
        },
      },
    },
  },
}

export default docs

if ('undefined' !== typeof module) {
  module.exports = docs
}
