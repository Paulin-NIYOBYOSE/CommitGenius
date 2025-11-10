# CommitGenius 🧠✨

AI-powered Git commit message generator CLI tool that creates professional, meaningful commit messages based on your staged changes.

## Features

- 🤖 **AI-Generated Messages**: Uses OpenAI GPT-4 to analyze your code changes and generate professional commit messages
- ⚡ **Fast & Easy**: Simple one-command operation
- 🎨 **Interactive**: Review, edit, or approve AI-generated messages
- 🔧 **Flexible**: Option to skip AI and write manual messages
- 📝 **Smart Analysis**: Analyzes actual code diffs to understand what changed
- ✅ **Git Integration**: Seamlessly works with your existing Git workflow

## Installation

### Prerequisites

- Node.js 16.0.0 or higher
- Git repository
- OpenAI API key (optional, for AI features)

### Install Dependencies

```bash
npm install
```

### Build the Application

```bash
npm run build
```

### Set up OpenAI API Key (Optional)

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a `.env` file in the project root:

```bash
cp .env.example .env
```

3. Edit `.env` and add your API key:

```
OPENAI_API_KEY=your_actual_api_key_here
```

## Usage

### Basic Usage

1. Stage your changes:
```bash
git add .
```

2. Generate and commit with AI:
```bash
npm run start
# or
node dist/cli.js
```

### Command Line Options

```bash
# Show help
npm run start -- --help

# Show version
npm run start -- --version

# Skip AI generation (manual input only)
npm run start -- --no-ai
```

### Development Mode

```bash
# Build and run in one command
npm run dev
```

## How It Works

1. **Checks Git Repository**: Ensures you're in a valid Git repository
2. **Validates Staged Changes**: Confirms you have staged changes ready to commit
3. **Analyzes Changes**: Reads the Git diff of your staged changes
4. **Generates Message**: Uses AI to create a professional commit message based on the changes
5. **Interactive Review**: Lets you use, edit, or cancel the generated message
6. **Commits Changes**: Executes the Git commit with your approved message

## Example Workflow

```bash
# Make some changes to your code
echo "console.log('Hello World');" >> app.js

# Stage the changes
git add app.js

# Run CommitGenius
npm run start
```

Output:
```
╔══════════════════════════════════════╗
║            CommitGenius              ║
║     AI-Powered Git Commit Messages   ║
╚══════════════════════════════════════╝

ℹ️  Analyzing staged changes...
ℹ️  Generating AI commit message...

📝 AI-generated commit message:
"Add console log statement to app.js"

Do you want to (u)se this message, (e)dit it, or (c)ancel? (u): u
ℹ️  Committing changes...
✅ Committed: "Add console log statement to app.js"
✅ Changes committed successfully!
```

## Error Handling

The tool handles various scenarios gracefully:

- **No Git Repository**: Warns if not in a Git repository
- **No Staged Changes**: Reminds you to stage changes first
- **Missing API Key**: Provides clear instructions for setup
- **Network Issues**: Falls back gracefully with error messages
- **Empty Commit Messages**: Prevents empty commits

## Development

### Project Structure

```
src/
├── cli.ts          # Main CLI entry point
├── aiHelper.ts     # OpenAI integration
├── gitHelper.ts    # Git operations
└── cliHelper.ts    # CLI utilities and UI
```

### Building

```bash
npm run build
```

### Running Tests

```bash
npm test
```

## Troubleshooting

### Common Issues

1. **"Not in a Git repository"**
   - Make sure you're running the command from within a Git repository
   - Initialize a Git repo with `git init` if needed

2. **"No staged changes found"**
   - Stage your changes first: `git add <files>`
   - Check staged changes: `git status`

3. **"OpenAI API key not found"**
   - Set up your `.env` file with a valid API key
   - Or use `--no-ai` flag for manual input

4. **TypeScript compilation errors**
   - Run `npm run build` to check for compilation issues
   - Ensure all dependencies are installed: `npm install`

## License

ISC

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Happy Committing! 🚀**