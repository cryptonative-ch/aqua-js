"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RINKEBY_CONFIG = exports.XDAI_CONFIG = exports.encoders = void 0;
__exportStar(require("./Aqua"), exports);
__exportStar(require("./Subgraph"), exports);
__exportStar(require("./types"), exports);
exports.encoders = __importStar(require("./encoders"));
__exportStar(require("./contracts"), exports);
exports.XDAI_CONFIG = {
    factory: '0x6897427e8d129d040F066a3Dcb106da91e84ab47',
    saleLauncher: '0xfa4Fbd5DC4a0C3aE54aA3a1fE52099d7d6F94227',
    templateLauncher: '0x1c1006D122A7f09A047f42D16464A3e7fBdB24C2',
    subgraph: 'https://api.thegraph.com/subgraphs/name/adamazad/aqua-xdai-next',
};
exports.RINKEBY_CONFIG = {
    factory: '0x6f90A6b92b69A775d0a2231011b3704d876b51a8',
    saleLauncher: '0x6f90A6b92b69A775d0a2231011b3704d876b51a8',
    templateLauncher: '0xA731dEc18bD791D817bd67E9944793D5BF76f5C0',
    subgraph: 'https://api.thegraph.com/subgraphs/name/adamazad/mesa',
};
//# sourceMappingURL=index.js.map