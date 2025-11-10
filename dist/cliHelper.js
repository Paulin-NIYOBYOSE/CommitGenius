import * as readline from 'readline';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import ora from 'ora';
export async function promptUser(question, defaultValue) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        const styledQuestion = chalk.cyan.bold(`❓ ${question}`);
        const prompt = defaultValue
            ? `${styledQuestion} ${chalk.gray(`(${defaultValue})`)}: `
            : `${styledQuestion}: `;
        rl.question(prompt, (answer) => {
            rl.close();
            resolve(answer.trim() || defaultValue || '');
        });
    });
}
export function displayBanner() {
    const title = figlet.textSync('CommitGenius', {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    });
    console.log(gradient.rainbow(title));
    console.log(chalk.cyan.bold('                    🤖 AI-Powered Git Commit Messages ✨'));
    console.log(chalk.gray('                         Making commits smarter, one diff at a time'));
    console.log('');
}
export function displayHelp() {
    console.log(chalk.cyan.bold('\n📖 Usage:'));
    console.log(chalk.white('  commitgenius [options]\n'));
    console.log(chalk.cyan.bold('⚙️  Options:'));
    console.log(chalk.green('  -h, --help     ') + chalk.gray('Show this help message'));
    console.log(chalk.green('  -v, --version  ') + chalk.gray('Show version information'));
    console.log(chalk.green('  --no-ai        ') + chalk.gray('Skip AI generation and use manual input only'));
    console.log(chalk.cyan.bold('\n💡 Examples:'));
    console.log(chalk.yellow('  commitgenius           ') + chalk.gray('# Generate AI commit message for staged changes'));
    console.log(chalk.yellow('  commitgenius --no-ai   ') + chalk.gray('# Manual commit message input only'));
    console.log('');
}
export function displayError(message) {
    console.log(chalk.red.bold(`❌ Error: ${message}`));
}
export function displaySuccess(message) {
    console.log(chalk.green.bold(`✅ ${message}`));
}
export function displayInfo(message) {
    console.log(chalk.blue(`ℹ️  ${message}`));
}
export function displayWarning(message) {
    console.log(chalk.yellow.bold(`⚠️  ${message}`));
}
export function displayCommitMessage(message) {
    console.log('');
    console.log(chalk.bgBlue.white.bold(' 📝 AI-Generated Commit Message '));
    console.log('');
    console.log(chalk.white.bold(`"${message}"`));
    console.log('');
}
export function createLoadingSpinner(text) {
    return ora({
        text: chalk.cyan(text),
        color: 'cyan',
        spinner: 'dots12'
    });
}
export function displayDivider() {
    console.log(chalk.gray('─'.repeat(60)));
}
export function displayVersion(version) {
    console.log(chalk.cyan.bold(`🚀 CommitGenius v${version}`));
    console.log(chalk.gray('   Built with ❤️  for better Git workflows'));
}
//# sourceMappingURL=cliHelper.js.map