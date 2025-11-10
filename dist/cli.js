#!/usr/bin/env node
import { generateCommitMessage } from './aiHelper.js';
import { getStagedDiff, commitChanges, hasGitRepo, hasStagedChanges } from './gitHelper.js';
import { displayBanner, displayHelp, displayError, displaySuccess, displayInfo, displayWarning, displayCommitMessage, displayDivider, displayVersion, createLoadingSpinner, promptUser } from './cliHelper.js';
async function main() {
    const args = process.argv.slice(2);
    // Handle command line arguments
    if (args.includes('-h') || args.includes('--help')) {
        displayHelp();
        process.exit(0);
    }
    if (args.includes('-v') || args.includes('--version')) {
        displayVersion('1.0.0');
        process.exit(0);
    }
    const skipAI = args.includes('--no-ai');
    displayBanner();
    // Check if we're in a Git repository
    if (!(await hasGitRepo())) {
        displayError('Not in a Git repository. Please run this command from within a Git repository.');
        process.exit(1);
    }
    // Check if there are staged changes
    if (!(await hasStagedChanges())) {
        displayWarning('No staged changes found.');
        displayInfo('Please stage your changes first using: git add <files>');
        process.exit(1);
    }
    try {
        displayDivider();
        const analyzeSpinner = createLoadingSpinner('Analyzing staged changes...');
        analyzeSpinner.start();
        const diff = await getStagedDiff();
        analyzeSpinner.stop();
        if (!diff.trim()) {
            displayError('No diff found for staged changes.');
            process.exit(1);
        }
        displaySuccess('Staged changes analyzed successfully!');
        displayDivider();
        let commitMessage = '';
        if (skipAI) {
            displayInfo('Skipping AI generation (--no-ai flag used)');
            commitMessage = await promptUser('Enter your commit message');
        }
        else {
            // Check for OpenAI API key
            if (!process.env.OPENAI_API_KEY) {
                displayError('OpenAI API key not found.');
                displayInfo('Please set your OPENAI_API_KEY environment variable or use --no-ai flag.');
                displayInfo('Example: export OPENAI_API_KEY="your-api-key-here"');
                process.exit(1);
            }
            const aiSpinner = createLoadingSpinner('🤖 Generating AI commit message...');
            aiSpinner.start();
            const aiMessage = await generateCommitMessage(diff);
            aiSpinner.stop();
            displayCommitMessage(aiMessage);
            const userChoice = await promptUser('Do you want to (u)se this message, (e)dit it, or (c)ancel?', 'u');
            switch (userChoice.toLowerCase()) {
                case 'u':
                case 'use':
                    commitMessage = aiMessage;
                    break;
                case 'e':
                case 'edit':
                    commitMessage = await promptUser('Enter your commit message', aiMessage);
                    break;
                case 'c':
                case 'cancel':
                    displayInfo('Commit cancelled.');
                    process.exit(0);
                default:
                    commitMessage = aiMessage; // Default to using AI message
                    break;
            }
        }
        if (!commitMessage.trim()) {
            displayError('Commit message cannot be empty.');
            process.exit(1);
        }
        displayDivider();
        const commitSpinner = createLoadingSpinner('Committing changes...');
        commitSpinner.start();
        const success = await commitChanges(commitMessage);
        commitSpinner.stop();
        if (success) {
            displaySuccess('Changes committed successfully! 🎉');
            displayDivider();
        }
        else {
            displayError('Failed to commit changes.');
            process.exit(1);
        }
    }
    catch (error) {
        displayError(`An unexpected error occurred: ${error}`);
        process.exit(1);
    }
}
// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
main().catch((error) => {
    displayError(`Fatal error: ${error}`);
    process.exit(1);
});
//# sourceMappingURL=cli.js.map