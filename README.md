# React TS Boilerplate

This boilerplate contains basic frontend tech stack guidelines for GKMIT.

The following tools are used:

- Basic react installation with [Vite](https://vitejs.dev/guide/)
- Typescript
- Eslint: testing the static code
- Prettier: format the code
- Husky: execute eslint and prettier before every commit
- Path alias for file import
- Basic test cases with [Vitest](https://vitest.dev/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)
- github pipeline workflow

## Getting Started

Get your project up and running with the following steps:

## Prerequisite

1. Node
2. Yarn

## Setup

1. Fork and clone the repo

   ```sh
   git clone git@github.com:GKMIT/frontend-react-ts-boilerplate.git
   ```

2. Install NPM packages

   ```sh
   yarn
   ```

3. Run development server

   ```sh
   yarn run dev
   ```

### Development

- `yarn run dev` to monitor src folder for changes, and mount current code at `localhost:5173`.
- `yarn run lint` to run full linter.
- `yarn run format` to format code.
- `yarn run build` generates a production-ready bundle.

> **Note**  
> Run `yarn run prepare` once you have set up your project to enable Husky to execute Eslint and Prettier before every commit.
