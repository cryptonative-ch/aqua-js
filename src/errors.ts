/**
 * When a template does not exist or not registered in the TemplateLauncher
 */

export class AquaError extends Error {
  constructor(message: string) {
    super(message)
    super.name = 'AquaError'
  }
}
export class SaleTemplateNotRegistered extends AquaError {
  constructor(template: string) {
    super(`Template ${template} is not registered`)
  }
}
