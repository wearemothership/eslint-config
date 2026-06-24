# @wearemothership/eslint-config

ESLint configuration for TypeScript and React projects with strict code quality and accessibility rules.

## Features

- **TypeScript Support**: Full TypeScript and TSX support with recommended rules
- **React Integration**: React Hooks and React Refresh rules for TSX/JSX files
- **Accessibility**: JSX A11y rules scoped to TSX/JSX only
- **Code Style**: Consistent code formatting with Stylistic ESLint plugin
- **Import Management**: Optional import/export validation (JavaScript only for unresolved imports)
- **Promise Handling**: Best practices for Promise usage
- **Composable**: Split into `base`, `react`, and `importConfig` exports for non-React packages

## Installation

```bash
npm install --save-dev @wearemothership/eslint-config
```

Peer dependencies (`eslint`, `typescript-eslint`, React plugins, etc.) are listed in `package.json` and should be installed in your project.

## Usage

### React app (default)

The default export includes TypeScript, stylistic, promise, and React rules:

```javascript
import eslintConfig from "@wearemothership/eslint-config";

export default eslintConfig;
```

### With import rules

Import validation is opt-in. TypeScript import resolution is intentionally **not** run during lint — `tsc`/your build already catches bad TS imports, and resolving them via ESLint is the main lint performance cost.

```javascript
import eslintConfig, { importConfig } from "@wearemothership/eslint-config";

export default [
	...eslintConfig,
	...importConfig,
	{
		settings: {
			"import/resolver": {
				typescript: {
					alwaysTryTypes: true,
					project: "./tsconfig.json"
				}
			}
		}
	}
];
```

Set `settings.import/resolver.typescript.project` to your project's `tsconfig` path. This is required if you extend import rules to TypeScript files in your own overrides.

### Non-React package (API, utilities)

Use `base` only — no React hooks, refresh, or jsx-a11y:

```javascript
import { base } from "@wearemothership/eslint-config";

export default base;
```

### Composing exports

```javascript
import { base, react, importConfig } from "@wearemothership/eslint-config";

export default [
	...base,
	...react,
	...importConfig
];
```

### With additional overrides

```javascript
import eslintConfig from "@wearemothership/eslint-config";

export default [
	...eslintConfig,
	{
		rules: {
			"no-console": "off"
		}
	}
];
```

## Performance

ESLint can be slow on large codebases. Enable the cache in your lint script:

```bash
eslint . --cache --cache-location .eslintcache
```

Add `.eslintcache` to `.gitignore`. The cache is safe to delete at any time.

## Configuration Details

### Exports

| Export | Contents |
|--------|----------|
| `base` | Ignores, promise, TypeScript, stylistic |
| `react` | jsx-a11y, react-hooks, react-refresh (TSX/JSX only) |
| `importConfig` | Import/export rules; `import/no-unresolved` for `.js` only |
| default | `base` + `react` |

### TypeScript Rules

- Applies recommended TypeScript ESLint rules
- Supports `.ts` and `.tsx` files
- Configured for ECMAScript 2024
- Browser globals included

### React Rules

- **React Hooks**: Enforces Rules of Hooks
- **React Refresh**: Warns about components that might break Fast Refresh
- Applied only to `.tsx` and `.jsx` files

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

When using `importConfig`:

- Validates named/default/namespace exports and imports
- `import/no-unresolved` runs on **JavaScript files only** (`.js`, `.jsx`, `.mjs`, `.cjs`)
- TypeScript unresolved imports are left to `tsc` — not checked during lint
- No default `import/resolver` project path is set; configure it in your consumer `eslint.config.js` if needed

### Promise Rules

- Enforces proper Promise handling
- Requires catch or return for Promises
- Allows `finally` blocks

### Accessibility Rules

- JSX A11y recommended rules
- Scoped to `.tsx` and `.jsx` files only

## Ignored Files

The configuration automatically ignores:

- `dist/` directory
- `public/` directory

## License

This package is part of the Mothership development tools.
