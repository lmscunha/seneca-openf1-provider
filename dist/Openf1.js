"use strict";
/* Copyright © 2026 Seneca Project Contributors, MIT License. */
Object.defineProperty(exports, "__esModule", { value: true });
const Pkg = require('../package.json');
function Openf1Provider(options) {
    const seneca = this;
    // const makeUtils = seneca.export('provider/makeUtils')
    //
    // const { makeUrl, getJson, entityBuilder } = makeUtils({
    //   name: 'openf1',
    //   options,
    // })
    seneca.message('sys:provider,provider:openf1,get:info', get_info);
    async function get_info(_msg) {
        return {
            ok: true,
            name: 'openf1',
            version: Pkg.version,
        };
    }
    seneca.prepare(async function () { });
}
const defaults = {
    url: 'https://api.openf1.org/v1/',
    debug: false,
};
Object.assign(Openf1Provider, { defaults });
exports.default = Openf1Provider;
if ('undefined' !== typeof module) {
    module.exports = Openf1Provider;
}
//# sourceMappingURL=Openf1.js.map