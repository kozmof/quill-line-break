import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import stylisticTs from '@stylistic/eslint-plugin-ts'


export default tseslint.config(
  { ignores: ['dist', 'coverage'] },
  {
    extends: [
      js.configs.recommended, 
      tseslint.configs.strict,
      tseslint.configs.stylistic,
      stylisticTs.configs['all-flat']
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      '@stylistic/ts': stylisticTs
    },
    rules: {
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/ts/quotes': ['error', 'single'],
      '@stylistic/ts/quote-props': ['error', 'as-needed'],
      '@stylistic/ts/object-curly-spacing': ['error', 'always'],
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
)
