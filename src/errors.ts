/**
 * When a template does not exist or not registered in the TemplateLauncher
 */

export class MesaError extends Error {}
export class SaleTemplateNotRegistered extends MesaError {}
