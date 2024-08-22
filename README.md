# React TS Boilerplate

This boilerplate contains basic frontend tech stack guidelines for GKMIT.

The following tools are used:

- Basic react installation with [Vite](https://vitejs.dev/guide/)
- Typescript
- Eslint: testing the static code
- Prettier: format the code
- Husky: execute eslint and prettier before every commit
- **Note**: commit message should follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) else husky will throw error
- Path alias for file import
- Basic test cases with [Vitest](https://vitest.dev/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)
- github pipeline workflow

## Getting Started

Get your project up and running with the following steps:

## Prerequisite

1. Node
2. NPM

## Setup

1. Fork and clone the repo

   ```sh
   git clone git@github.com:GKMIT/frontend-react-ts-boilerplate.git
   ```

2. Install NPM packages

   ```sh
   npm
   ```

3. Run development server

   ```sh
   npm run dev
   ```

### Development

- `npm run dev` to monitor src folder for changes, and mount current code at `localhost:5173`.
- `npm run lint` to run full linter.
- `npm run format` to format code.
- `npm run build` generates a production-ready bundle.

> **Note**  
> Run `npm run prepare` once you have set up your project to enable Husky to execute Eslint and Prettier before every commit.
