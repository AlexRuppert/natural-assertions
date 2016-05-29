/**
 * The children property allows for nested elements, where multiple words from the natural text are processed
 * this is especially useful with the alias property which references
 * another chain-element that should be used instead of the current one.
 * This way you could define something like in the example below,
 * where you could use 'instance of' as an alternative syntax:
 * 
 * @example
 * 'instanceof': {
 *  parameters: 1,
 *  optionalParameters: 1
 * },
 * 'instance': {
 *   children: {
 *     'of': {
 *       alias: 'instanceof'
 *     }
 *   }
 * }
 * 
 * 
 * @interface ChainElement
 */
interface ChainElement {
  parameters?: number;
  optionalParameters?: number;
  alias?: string;
  children?: { [id: string]: ChainElement };
}

export default ChainElement;