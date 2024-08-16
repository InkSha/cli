import { ActionOptions } from '../types/actions'

/**
 * @class BaseActions
 * @description command actions base class need child class extends this
 *
 * @exmpale
 *
 * ```ts
 * class NewAction extends BaseActions {}
 * class AddAction extends BaseActions {}
 * ```
 */
export abstract class BaseActions {
  /**
   * start action
   * @param options action optins
   */
  public handle(options: ActionOptions): void {}
}
