import type { Command } from 'commander'
import { BaseActions } from '../actions/base'

/**
 * @class BaseCommand
 * @description defined command base class need child extends this
 *
 * @example
 *
 * ```ts
 * class NewCommand extends BaseCommand {}
 * class AddCommand extends BaseCommand {}
 * ```
 *
 */
export abstract class BaseCommand {
  constructor(
    /**
     * @property action
     * @description current command need exec action
     * @protected
     */
    protected action: BaseActions,
  ) {}

  /**
   * load current command to main program
   * @param program main program
   */
  public loadProgram(program: Command): void {}
}
