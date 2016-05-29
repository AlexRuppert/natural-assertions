/**
 * Produces an array of tokens.
 * Elements in brackets or quotes are kept together as a single token.
 * 
 * @export
 * @param {string} str Input string.
 * @returns {string[]} Array of tokens.
 */
export default function tokenize(str: string): string[] {
  const tokens: string[] = [];
  let currentToken = '';

  const isIn: IsIn = {
    singleQuotes: false,
    doubleQuotes: false,
    curlyBrackets: 0,
    squareBrackets: 0,
    roundBrackets: 0
  };
  let isNotInSomething = true;
  for (let c of str) {
    const changed = checkCharacterEnvironment(isIn, c);
    if (changed) {
      isNotInSomething = !isInSomething(isIn);
    }
    if (isNotInSomething) {
      if (/\s/.test(c) || c === ',') {
        pushToken(tokens, currentToken);
        currentToken = '';

        if (c === ',') {
          pushToken(tokens, ',');
        }
        continue;
      }
    }
    currentToken += c;
  }

  pushToken(tokens, currentToken);
  return tokens;
}

/**
 * Pushes a token into the string array, if it is not empty.
 * 
 * @param {string[]} tokens
 * @param {string} token
 */
function pushToken(tokens: string[], token: string): void {
  if (token.length > 0) {
    tokens.push(token);
  }
}

/**
 * Interface for helper variable.
 * 
 * @interface IsIn
 */
interface IsIn {
  singleQuotes: boolean;
  doubleQuotes: boolean;
  curlyBrackets: number;
  squareBrackets: number;
  roundBrackets: number;
}

/**
 * Checks if the reading process is currently within quotes or brackets.
 * 
 * @param {IsIn} isIn 
 * @returns {boolean} True, if in brackets or quotes.
 */
function isInSomething(isIn: IsIn): boolean {
  return isIn.singleQuotes || isIn.doubleQuotes || isIn.curlyBrackets > 0
    || isIn.squareBrackets > 0 || isIn.roundBrackets > 0;
}
/**
 * Updates the currently read environment of a character.
 * Keeps track if the reading process is within quotes or brackets.
 * 
 * @param {IsIn} isIn 
 * @param {string} char 
 * @returns {boolean} True if isIn was updated.
 */
function checkCharacterEnvironment(isIn: IsIn, char: string): boolean {

  let somethingChanged = false;

  if (isIn.singleQuotes) {
    if (char === '\'') {
      isIn.singleQuotes = false;
      somethingChanged = true;
    }
  }
  else if (isIn.doubleQuotes) {
    if (char === '"') {
      isIn.doubleQuotes = false;
      somethingChanged = true;
    }
  }
  else {
    somethingChanged = true;
    switch (char) {
      case '\'':
        isIn.singleQuotes = true;
        break;
      case '"':
        isIn.doubleQuotes = true;
        break;
      case '{':
        isIn.curlyBrackets++;
        break;
      case '}':
        isIn.curlyBrackets--;
        break;
      case '[':
        isIn.squareBrackets++;
        break;
      case ']':
        isIn.squareBrackets--;
        break;
      case '(':
        isIn.roundBrackets++;
        break;
      case ')':
        isIn.roundBrackets--;
        break;
      default:
        somethingChanged = false;
        break;
    }
  }
  return somethingChanged;
}