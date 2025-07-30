# @wearemothership/eslint-config

A comprehensive ESLint configuration for TypeScript and React projects with strict code quality and accessibility rules.

## Features

- **TypeScript Support**: Full TypeScript and TSX support with recommended rules
- **React Integration**: React Hooks and React Refresh rules for modern React development
- **Accessibility**: JSX A11y rules for better accessibility
- **Code Style**: Consistent code formatting with Stylistic ESLint plugin
- **Import Management**: Import/export validation with TypeScript resolver
- **Promise Handling**: Best practices for Promise usage
- **Browser Environment**: Configured for browser globals

## Installation

```bash
npm install --save-dev @wearemothership/eslint-config
```

## Usage

### Basic Setup

Create an `eslint.config.js` file in your project root:

```javascript
import eslintConfig from "@wearemothership/eslint-config";

export default eslintConfig;
```

### With Additional Configuration

```javascript
import eslintConfig from "@wearemothership/eslint-config";

export default [
  ...eslintConfig,
  {
    // Your additional rules or overrides
    rules: {
      // Custom rules here
    }
  }
];
```

## Configuration Details

### TypeScript Rules

- Applies recommended TypeScript ESLint rules
- Supports `.ts` and `.tsx` files
- Configured for ECMAScript 2020
- Browser globals included

### React Rules

- **React Hooks**: Enforces Rules of Hooks
- **React Refresh**: Warns about components that might break Fast Refresh
- Applied only to `.tsx` files

### Code Style Rules

The configuration enforces a consistent code style:

- **Indentation**: Tabs
- **Line Length**: 150 characters max
- **Quotes**: Double quotes
- **Semicolons**: Always required
- **Commas**: No trailing commas
- **Brace Style**: Stroustrup style
- **Arrow Functions**: Parentheses always required
- **Object/Array**: Consistent formatting for multi-line structures

### Import Rules

- Validates import/export statements
- TypeScript-aware import resolution
- Ensures all imports are resolvable

### Promise Rules

- Enforces proper Promise handling
- Requires catch or return for Promises
- Allows `finally` blocks

### Accessibility Rules

- JSX A11y recommended rules
- Ensures accessible React components

## Ignored Files

The configuration automatically ignores:
- `dist/` directory
- `public/` directory

## Extending the Configuration

You can extend this configuration by adding your own rules:

```javascript
import eslintConfig from "@wearemothership/eslint-config";

export default [
  ...eslintConfig,
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // Your custom rules
      "no-console": "warn",
      "prefer-const": "error"
    }
  }
];
```

## License

This package is part of the Mothership development tools.
