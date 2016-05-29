import ChainElement from './chain-element';
import ChainDictionary from './chain-dictionary';
/**
 * Transforms an array of tokens into BDD-style assertions.
 * 
 * @export
 * @param {string[]} tokens 
 * @param {ChainDictionary} chains Difinitions on how to handle and transform each token.
 * @returns {string} Transformed assertion.
 */
export default function constructAssertion(tokens: string[], chains: ChainDictionary): string {
  let assertion = '';
  if (tokens.length < 2) {
    return tokens.join(' ');
  }

  let i = 0;
  if (tokens[0] === 'expect') {
    assertion = 'expect(' + tokens[1] + ')';
    i = 2;
  } else if (tokens[1] === 'should') {
    assertion = tokens[0] + '.should';
    i = 2;
  }

  let chainElement = null;
  let replaceWith = '';
  while (i < tokens.length) {
    const t = tokens[i];

    if (t === ',') {
      i++;
      continue;
    }
    if (chains.hasOwnProperty(t)) {
      replaceWith = t;
      chainElement = resolveChildren(tokens, i, chains[t]);

      i = chainElement.index;

      if (chainElement.element.hasOwnProperty('alias')) {
        replaceWith = chainElement.element.alias;
        if (chains.hasOwnProperty(chainElement.element.alias)) {
          chainElement.element = chains[chainElement.element.alias];
        }
      }

      const parameters = getParameters(chainElement.element);

      assertion += '.' + replaceWith;
      if (parameters.parameters + parameters.optionalParameters > 0) {
        const result = constructParameters(tokens, chains, i + 1, parameters);
        assertion += result.assertion;
        i = result.index;
      }
    } else {
      assertion += '.' + t;
    }
    i++;
  }

  return assertion + ';';
}

/**
 * Handles parameter contruction based on mandatory and optional parameters.
 * 
 * @param {string[]} tokens
 * @param {ChainDictionary} chains
 * @param {number} index current token index
 * @param {{ parameters: number, optionalParameters: number }} count Parameter count.
 * @param {string} [ignoreInParameters=['and', 'or', 'with', 'to']] Which tokens should be ignored inside parameters.
 * @returns {assertion: string, index: number} Fromatted parameters for the assertion and the current token index.
 */
function constructParameters(tokens: string[], chains: ChainDictionary, index: number,
  count: { parameters: number, optionalParameters: number },
  ignoreInParameters = ['and', 'or', 'with', 'to']): {assertion: string, index: number}  {

  let currentParameters = 0;
  let assertion = '';
  let comma = false;

  function addParameters(token) {
    if (currentParameters === 0) {
      assertion += '(' + token;
    } else {
      assertion += ', ' + token;
    }
    currentParameters++;
  }

  while (index < tokens.length) {
    const t = tokens[index];

    if (t === ',') {
      comma = true;
      index++;
      continue;
    }

    if (currentParameters < count.parameters || comma) {

      if (ignoreInParameters.indexOf(t) < 0) {
        addParameters(t);
      }
    } else if (currentParameters < count.optionalParameters) {
      if (!chains.hasOwnProperty(t)) {
        addParameters(t);
      } else {
        if (currentParameters > 0) {
          assertion += ')';
        }
        return {
          assertion: assertion,
          index: index - 1
        };
      }
    }
    else {
      break;
    }

    comma = false;
    index++;
  }
  if (currentParameters > 0) {
    assertion += ')';
  }
  return {
    assertion: assertion,
    index: index - 1
  };
}

/**
 * Gets the amount of mandatory and optional parameters for the current chain element.
 * 
 * @param {ChainElement} chainElement
 * @returns {{ parameters: number, optionalParameters: number }}
 */
function getParameters(chainElement: ChainElement): { parameters: number, optionalParameters: number } {
  return {
    parameters: chainElement.parameters === undefined ? 0 : chainElement.parameters,
    optionalParameters: chainElement.optionalParameters === undefined ? 0 : chainElement.optionalParameters
  };
}

/**
 * Retrieves the correct chain element, i.e.
 * the last child if nested child elements are used and updates the token index accordingly.
 * 
 * @param {string[]} tokens
 * @param {number} index
 * @param {ChainElement} element
 * @returns {element: ChainElement, index: number, isChild: boolean}
 */
function resolveChildren(tokens: string[], index: number, element: ChainElement):
 {element: ChainElement, index: number, isChild: boolean} {
  let current = element;
  let isChild = false;
  while (current.hasOwnProperty('children')) {
    if (current.children.hasOwnProperty(tokens[index + 1])) {
      current = current.children[tokens[index + 1]];
      isChild = true;
      index++;
    } else {
      break;
    }
  }
  return ({
    element: current,
    index: index,
    isChild: isChild
  });
}