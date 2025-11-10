import * as vscode from 'vscode';
export async function showCommitMessageUI(suggestedMessage) {
    return vscode.window.showInputBox({
        prompt: 'AI-generated commit message (edit if needed)',
        value: suggestedMessage,
    });
}
//# sourceMappingURL=uiHelper.js.map