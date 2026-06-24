# Changelog

All notable changes to this project will be documented in this file.

## 2.0.0 — 2026-06-24

Major release focused on ESLint performance and clearer config composition.

### Highlights

- **Much faster linting** on TypeScript projects by dropping TypeScript import resolution from the default config
- **Composable exports** (`base`, `react`, `importConfig`) for React apps, API packages, and custom setups
- **Tighter file scoping** so React and a11y rules only run where they apply

### Breaking changes

#### Import rules are no longer included in the default export

`eslint-plugin-import` is now opt-in via the `importConfig` named export. Projects that relied on the default config enforcing import rules must add it explicitly:

```javascript
import eslintConfig, { importConfig } from "@wearemothership/eslint-config";

export default [
	...eslintConfig,
	...importConfig
];
```

#### `import/no-unresolved` no longer runs on TypeScript files

In v1.x, `import/no-unresolved` ran on all files using the TypeScript resolver (`project: "./"`), which was the main lint performance bottleneck.

In v2.0:

- `import/no-unresolved` applies only to `**/*.{js,jsx,mjs,cjs}` (Node resolver)
- `.ts` / `.tsx` unresolved imports are expected to be caught by `tsc` or your build

If you still want ESLint to validate TS imports, opt into `importConfig` and set the resolver in your consumer config:

```javascript
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
```

#### Default TypeScript import resolver removed

The shared config no longer sets `settings.import/resolver.typescript.project` to `"./"`. That path was wrong for many repos and forced awkward per-project overrides. Consumers who enable `importConfig` must set their own `tsconfig` path.

#### React hooks rules scoped to TSX/JSX only

`react-hooks` and `react-refresh` previously applied to all `**/*.{ts,tsx}` files. They now apply only to `**/*.{tsx,jsx}`.

Plain `.ts` files (e.g. utilities, API clients) are no longer linted with React hooks rules. This reverses the v1.0.1 behaviour from PR #5.

#### jsx-a11y scoped to TSX/JSX only

jsx-a11y was previously applied globally. It now runs only on `**/*.{tsx,jsx}`.

#### Slimmer import rule set

Replaced `eslint-plugin-import`’s full `flatConfigs.recommended` preset with an explicit subset:

- `import/default`, `import/export`, `import/named`, `import/namespace` — error
- `import/no-named-as-default`, `import/no-named-as-default-member` — warn

Removed from the preset:

- `import/no-duplicates` — overlaps with core `no-duplicate-imports`, which remains enabled

### Additions

#### Named exports

| Export | Contents |
|--------|----------|
| `base` | Ignores, promise, TypeScript, stylistic |
| `react` | jsx-a11y, react-hooks, react-refresh (TSX/JSX only) |
| `importConfig` | Import rules; `import/no-unresolved` for JS only |
| `default` | `base` + `react` |

Example — non-React package:

```javascript
import { base } from "@wearemothership/eslint-config";

export default base;
```

#### Performance documentation

README now recommends enabling the ESLint cache:

```bash
eslint . --cache --cache-location .eslintcache
```

### Migration checklist

1. Upgrade to `@wearemothership/eslint-config@2`
2. If you used import rules from the default config, add `...importConfig` to your `eslint.config.js`
3. Remove any `import/resolver` overrides that only existed to fix `project: "./"` — set `project` to your real `tsconfig` path instead if you enable `importConfig`
4. Add `--cache --cache-location .eslintcache` to your lint script (optional but recommended)
5. Run `eslint` and `tsc` — bad TS imports should still be caught by the typechecker even without `import/no-unresolved`

### Unchanged

- Default export still works for React apps with no config changes required (unless you relied on import rules)
- TypeScript, stylistic, and promise rules are unchanged
- Ignored paths (`dist/`, `public/`) unchanged
- Peer dependency requirements unchanged
