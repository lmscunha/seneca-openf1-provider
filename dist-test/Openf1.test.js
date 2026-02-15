"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const code_1 = require("@hapi/code");
const seneca_1 = __importDefault(require("seneca"));
const __1 = __importDefault(require(".."));
const __2 = __importDefault(require(".."));
(0, node_test_1.describe)('Openf1', () => {
    (0, node_test_1.test)('load-plugin', async () => {
        (0, code_1.expect)(__1.default).exist();
        const seneca = makeSeneca().use(__2.default, {});
        await seneca.ready();
        (0, code_1.expect)(seneca.find_plugin('Openf1Provider')).exist();
    });
    (0, node_test_1.test)('get-info', async () => {
        const seneca = makeSeneca().use(__2.default, {});
        await seneca.ready();
        const info = await seneca.post('sys:provider,provider:openf1,get:info');
        (0, code_1.expect)(info.ok).true();
    });
});
function makeSeneca() {
    const seneca = (0, seneca_1.default)({ legacy: false }).test().use('promisify').use('entity');
    return seneca;
}
//# sourceMappingURL=Openf1.test.js.map