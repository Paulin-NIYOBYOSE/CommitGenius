import * as vscode from 'vscode';

export async function showCommitMessageUI(suggestedMessage: string): Promise<string | undefined> {
    return vscode.window.showInputBox({
        prompt: 'AI-generated commit message (edit if needed)',
        value: suggestedMessage,
    });
}
