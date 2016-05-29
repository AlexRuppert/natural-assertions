const prefix = '////';
const test = RegExp('(' + prefix + ')\s*.*(should|expect).*');
/**
 * Identifies, if the string belongs to a line, that should be transformed.
 * Currently lines containing //// are considered valid.
 * 
 * @export
 * @param {string} str Input string.
 * @returns {{ offset: number, text: string }} Offset (-1, if line is not valid for transformation)
 * where the recognized part starts and the text without any prefixes.
 */
export default function recognize(str: string): { offset: number, text: string } {
  const result = test.exec(str);
  if (result !== null) {
    return { offset: result.index, text: str.substr(result.index + prefix.length) };
  }
  return { offset: -1, text: '' };
}