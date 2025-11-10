import { simpleGit } from 'simple-git';
import process from 'process';
const git = simpleGit(process.cwd());
export async function getStagedDiff() {
    try {
        const diff = await git.diff(['--cached']);
        return diff;
    }
    catch (err) {
        console.error('Failed to read Git diff:', err);
        return '';
    }
}
export async function commitChanges(message) {
    try {
        await git.commit(message);
        console.log(`✅ Committed: "${message}"`);
        return true;
    }
    catch (err) {
        console.error('❌ Failed to commit changes:', err);
        return false;
    }
}
export async function hasGitRepo() {
    try {
        await git.status();
        return true;
    }
    catch (err) {
        return false;
    }
}
export async function hasStagedChanges() {
    try {
        const status = await git.status();
        return status.staged.length > 0;
    }
    catch (err) {
        return false;
    }
}
//# sourceMappingURL=gitHelper.js.map