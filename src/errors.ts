/**
 * When a template does not exist or not registered in the TemplateLauncher
 */

export class AquaError extends Error {
  name: string = 'AquaError'
}
export class SaleTemplateNotRegistered extends AquaError {}
