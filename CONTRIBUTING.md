# Contributing to Watsonx Visualization MCP Server

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Project Structure](#project-structure)

## Code of Conduct

This project adheres to a code of conduct that all contributors are expected to follow:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect differing viewpoints and experiences

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/watsonx-visualization-mcp.git
   cd watsonx-visualization-mcp
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/tdognin/watsonx-visualization-mcp.git
   ```

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Installation

```bash
# Install dependencies
npm install

# Run tests to verify setup
npm test

# Start development server
npm run dev
```

### Optional Dependencies

For full functionality, install optional dependencies:

```bash
# For PNG export
npm install canvas

# For headless browser rendering
npm install puppeteer
```

## Making Changes

### Branch Naming

Use descriptive branch names:

- `feature/add-new-chart-type` - New features
- `fix/chart-rendering-bug` - Bug fixes
- `docs/update-api-reference` - Documentation updates
- `refactor/improve-analysis-engine` - Code refactoring
- `test/add-unit-tests` - Test additions

### Commit Messages

Follow conventional commit format:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(charts): add waterfall chart support

fix(analysis): correct correlation calculation for edge cases

docs(api): update generate_visualization parameters
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
node --test tests/analysis-engine.test.js
```

### Writing Tests

- Place tests in the `tests/` directory
- Name test files with `.test.js` suffix
- Use Node.js built-in test runner
- Aim for >80% code coverage

**Example test:**

```javascript
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { MyModule } from '../src/my-module.js';

describe('MyModule', () => {
  it('should do something', () => {
    const result = MyModule.doSomething();
    assert.strictEqual(result, expectedValue);
  });
});
```

## Submitting Changes

### Pull Request Process

1. **Update your fork**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Create a pull request** with:
   - Clear title describing the change
   - Detailed description of what and why
   - Reference to related issues (if any)
   - Screenshots for UI changes (if applicable)

3. **Ensure CI passes**:
   - All tests pass
   - Code follows style guidelines
   - No linting errors

4. **Respond to feedback**:
   - Address review comments
   - Update PR as needed
   - Be patient and respectful

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Updated existing tests

## Checklist
- [ ] Code follows project style
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
- [ ] Commit messages follow convention
```

## Coding Standards

### JavaScript Style

- Use ES6+ features
- Use `const` and `let`, avoid `var`
- Use arrow functions where appropriate
- Use template literals for string interpolation
- Add JSDoc comments for public APIs

**Example:**

```javascript
/**
 * Calculate statistical measures for dataset
 * @param {Array} data - Array of numeric values
 * @returns {Object} Statistical measures
 */
function calculateStatistics(data) {
  const sum = data.reduce((acc, val) => acc + val, 0);
  const mean = sum / data.length;
  
  return {
    count: data.length,
    sum,
    mean,
  };
}
```

### File Organization

- One class/module per file
- Group related functionality
- Keep files under 500 lines
- Use clear, descriptive names

### Error Handling

- Use try-catch for async operations
- Provide meaningful error messages
- Log errors appropriately
- Don't swallow errors silently

### Comments

- Write self-documenting code
- Add comments for complex logic
- Keep comments up-to-date
- Use JSDoc for public APIs

## Project Structure

```
watsonx-visualization-mcp/
├── src/
│   ├── mcp-server/          # MCP server implementation
│   ├── visualization-engine/ # Chart generation
│   ├── analysis-engine/      # Data analysis
│   ├── output-generators/    # Format converters
│   └── utils/               # Helper utilities
├── tests/                   # Test files
├── examples/                # Usage examples
├── docs/                    # Documentation
├── config/                  # Configuration files
└── output/                  # Generated outputs
```

### Adding New Features

#### New Chart Type

1. Add chart type to `ChartTypeSelector.chartTypes`
2. Implement rendering in `ChartRenderer`
3. Add styling in `ChartStyler`
4. Update documentation
5. Add tests
6. Add example

#### New Analysis Type

1. Add method to `AnalysisEngine`
2. Update `performAnalysis` switch
3. Add tests
4. Update API documentation

#### New Output Format

1. Add method to `OutputGenerator`
2. Update `generate` switch
3. Add tests
4. Update documentation

## Documentation

### Updating Documentation

- Keep README.md current
- Update API.md for API changes
- Add examples for new features
- Update CHANGELOG.md

### Documentation Style

- Use clear, concise language
- Include code examples
- Add screenshots where helpful
- Keep formatting consistent

## Release Process

Maintainers will handle releases:

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create git tag
4. Publish to npm
5. Create GitHub release

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/tdognin/watsonx-visualization-mcp/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tdognin/watsonx-visualization-mcp/discussions)
- **Documentation**: [docs/](docs/)

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing! 🎉