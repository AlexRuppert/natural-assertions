import * as vscode from 'vscode';
import recognize from './recognizer';
import tokenize from './tokenizer';
import constructAssertion from './assertion-constructor';
import chains from './chai-chains';

export function activate(context: vscode.ExtensionContext) {

  let disposable = vscode.commands.registerCommand('extension.natural2assertion', () => {
    assertify();
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
  // nothing
}

/**
 * Does the main work, by transforming all special assertion comments into BDD-style assertions.
 * 
 * @returns {void}
 */
function assertify(): void {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return; // No open text editor
  }
  const document = editor.document;
  editor.edit((edit) => {
    const selection = editor.selection;
    console.log(selection);
    let lines;
    if (selection && (selection.start.line !== selection.end.line
      || selection.start.character !== selection.end.character)) {

      let start = selection.start.line;
      let stop = selection.end.line;
      if (start > stop) {
        [stop, start] = [start, stop];
      }

      lines = getLines(document, start, stop);
    }
    else {
      lines = getLines(document);
    }

    for (let line of lines) {
      edit.replace(line.range, line.text);
    }
    vscode.window.setStatusBarMessage(`Assertified ${lines.length} Line(s)`, 3000);
  });
}
/**
 * Returns an array of line repacements with the range and replacement text.
 * Natural language text is transformed into BDD-style assertions.
 * 
 * @param {TextDocument} document
 * @param {number} [start] First line.
 * @param {number} [stop] Last line.
 * @returns {{ range: vscode.Range; text: string }[]} Line replacements.
 */
function getLines(document: vscode.TextDocument, start = -1, stop = -1): { range: vscode.Range; text: string }[] {
  const lines: { range: vscode.Range; text: string }[] = [];

  let begin = 0;
  let end = document.lineCount;
  if (start > -1) {
    begin = start;
  }
  if (stop > -1) {
    end = stop + 1;
  }

  if (end < start || end > document.lineCount) {
    return [];
  }

  for (let i = begin; i < end; i++) {
    let line = document.lineAt(i);
    const range = line.range;
    const recognized = recognize(line.text);
    if (recognized.offset >= 0) {
      const tokens = tokenize(recognized.text);
      if (tokens.length > 0) {
        const assertion = constructAssertion(tokens, chains);
        if (assertion) {
          const newRange = new vscode.Range(new vscode.Position(range.start.line, recognized.offset), range.end);
          lines.push({ range: newRange, text: assertion });
        }
      }
    }
  }
  return lines;
}
