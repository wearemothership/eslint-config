import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import pluginImport from "eslint-plugin-import";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginPromise from "eslint-plugin-promise";
import * as reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

const ignores = { ignores: ["**/dist/", "**/public/"] };

const typescript = {
	extends: [
		js.configs.recommended,
		tseslint.configs.recommended
	],
	files: ["**/*.{ts,tsx}"],
	languageOptions: {
		ecmaVersion: 2024,
		globals: globals.browser
	},
	rules: {
		"arrow-body-style": ["error", "as-needed"],
		"no-shadow": ["error", { ignoreOnInitialization: true }],
		"no-constructor-return": "error",
		"no-duplicate-imports": "error",
		"no-unassigned-vars": "warn",
		"no-use-before-define": ["error", { functions: false }], // Functions are hoisted
		"func-style": ["error", "declaration", { allowArrowFunctions: true }],
		"max-params": ["warn", { max: 4 }],
		"no-console": ["warn", { "allow": ["warn", "error", "debug"] }],
		"no-else-return": "warn",
		"no-eval": "error",
		"no-nested-ternary": "warn",
		"no-param-reassign": ["warn", { ignorePropertyModificationsFor: ["draft"] }],
		"no-unused-expressions": "warn",
		"promise/always-return": ["error", { ignoreLastCallback: true }],
		"promise/catch-or-return": ["error", { allowFinally: true }],
		"require-await": "warn",
		"@typescript-eslint/consistent-type-assertions": "warn"
	}
};

const stylisticRules = {
	extends: [
		stylistic.configs.recommended
	],
	plugins: {
		"@stylistic": stylistic
	},
	rules: {
		"@stylistic/arrow-parens": ["error", "always"],
		"@stylistic/brace-style": [2, "stroustrup"],
		"@stylistic/comma-dangle": ["error", "never"],
		"@stylistic/implicit-arrow-linebreak": ["error", "beside"],
		"@stylistic/indent": ["error", "tab"],
		"@stylistic/indent-binary-ops": ["error", "tab"],
		"@stylistic/jsx-indent-props": ["error", "tab"],
		"@stylistic/linebreak-style": ["error", "unix"],
		"@stylistic/jsx-self-closing-comp": "error",
		"@stylistic/jsx-tag-spacing": ["error", {
			"afterOpening": "never",
			"beforeClosing": "never"
		}],
		"@stylistic/max-len": ["error", { code: 150 }],
		"@stylistic/member-delimiter-style": ["error", {
			"multiline": {
				"delimiter": "semi",
				"requireLast": true
			},
			"singleline": {
				"delimiter": "semi",
				"requireLast": false
			},
			"multilineDetection": "brackets"
		}],
		"@stylistic/multiline-ternary": ["error", "always-multiline"],
		"@stylistic/no-extra-semi": "error",
		"@stylistic/no-tabs": "off",
		"@stylistic/object-curly-newline": ["error", { minProperties: 4, consistent: true }],
		"@stylistic/object-curly-spacing": ["error", "always"],
		"@stylistic/operator-linebreak": ["error", "before"],
		"@stylistic/quotes": ["error", "double"],
		"@stylistic/quote-props": ["error", "as-needed"],
		"@stylistic/semi": ["error", "always"]
	}
};

const jsxA11y = {
	...pluginJsxA11y.flatConfigs.recommended,
	files: ["**/*.{tsx,jsx}"]
};

const reactRules = {
	files: ["**/*.{tsx,jsx}"],
	languageOptions: {
		ecmaVersion: 2024,
		globals: globals.browser
	},
	plugins: {
		"react-hooks": reactHooks,
		"react-refresh": reactRefresh
	},
	rules: {
		...reactHooks.configs.recommended.rules,
		"react-hooks/exhaustive-deps": "error",
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true }
		]
	}
};

const importPlugin = {
	plugins: {
		import: pluginImport
	},
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"]
		}
	},
	rules: {
		"import/default": "error",
		"import/export": "error",
		"import/named": "error",
		"import/namespace": "error",
		"import/no-named-as-default": "warn",
		"import/no-named-as-default-member": "warn"
	}
};

const importUnresolvedJs = {
	files: ["**/*.{js,jsx,mjs,cjs}"],
	rules: {
		"import/no-unresolved": "error"
	},
	settings: {
		"import/resolver": {
			node: true
		}
	}
};

/** TypeScript, stylistic, and promise rules — no React or import plugin. */
export const base = defineConfig(
	ignores,
	pluginPromise.configs["flat/recommended"],
	typescript,
	stylisticRules
);

/** React hooks, refresh, and jsx-a11y — scoped to TSX/JSX only. */
export const react = defineConfig(
	jsxA11y,
	reactRules
);

/** Import validation — opt in; configure `settings.import/resolver` in your project. */
export const importConfig = defineConfig(
	importPlugin,
	importUnresolvedJs
);

/** Full React setup (base + react). Add `importConfig` if you want import rules. */
export default defineConfig(
	...base,
	...react
);
