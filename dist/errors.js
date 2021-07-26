"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleTemplateNotRegistered = exports.AquaError = void 0;
class AquaError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'AquaError';
    }
}
exports.AquaError = AquaError;
class SaleTemplateNotRegistered extends AquaError {
}
exports.SaleTemplateNotRegistered = SaleTemplateNotRegistered;
//# sourceMappingURL=errors.js.map