module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['eslint:recommended', 'standart'],
    plugins: [
        'react'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    ignorePatterns: ['**/*.html', '**/*.scss', '**/*.css', '**/*.webp', '**/*.ttf', '**/*.json', '**/*.md'],
    rules: {
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'no-undef': 0,
        'indent': ['error', 4],
        'comma-spacing': ['error', {'before': false, 'after': true}],
        'object-curly-spacing': ['error', 'never']
    }
}
