import * as vscode from 'vscode';
import { getStagedDiff, commitChanges } from './gitHelper';
import { generateCommitMessage } from './aiHelper';
import { showCommitMessageUI } from './uiHelper';
export async function activate(context) {
    console.log('CommitGenius is active!');
    const disposable = vscode.commands.registerCommand('commitgenius.generateCommit', async () => {
        const diff = await getStagedDiff();
        if (!diff) {
            vscode.window.showInformationMessage('No staged changes found.');
            return;
        }
        const aiMessage = await generateCommitMessage(diff);
        const userMessage = await showCommitMessageUI(aiMessage);
        if (!userMessage) {
            vscode.window.showInformationMessage('Commit cancelled.');
            return;
        }
        await commitChanges(userMessage);
    });
    context.subscriptions.push(disposable);
}
export function deactivate() { }
//# sourceMappingURL=extension.js.map