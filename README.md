# forgAds [React.js](https://reactjs.org/) app

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Features

-   **[React.js](https://reactjs.org/)** as the JavaScript library
-   **[React Query](https://react-query-v3.tanstack.com/overview)** for fetching, caching, synchronizing and updating server state in your React applications a breeze
-   **[axios](https://github.com/axios/axios)** for making HTTP requests
-   **[Prettier](https://prettier.io/)** and **[ESLint](https://eslint.org/)** configured for code formating

## Requirements

[Node](https://nodejs.org/) >= 14.20.0 = LTS/Fermium

## Restrictions

```bash
engine-strict=true
```

Only <b>Yarn</b> is allowd

## Install

Clone the repository

-   SSH clone with your configured password from SSH key insertion.

```bash
git clone git@bitbucket.org:dusankosic/forg_fe.git
```

-   HTTPS clone

```bash
git clone https://username@bitbucket.org/dusankosic/forg_fe.git
```

cd into the project folder

```bash
cd forg_fe
```

Install requirements

```bash
yarn install
```

## Environment variables

You must first set the environment variables before running the project.

> e.g. create file `.env` in the root of the project.

```
VITE_API_URL=
```

## Getting Started

To run the development server:

```bash
yarn dev
```

To run the production server:

```bash
yarn build && yarn start
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

## Tests

To run the tests use:

```bash
yarn test
```

## Code style

This project uses [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/). To run code check use:

```bash
yarn lint
```

## Commiting

This project is using husky hooks:

-   commit-msg ([Convetional Commits](https://www.conventionalcommits.org/en/v1.0.0/))
-   pre-commit
-   pre-push

[Commitizen](https://github.com/commitizen/cz-cli) will help you with following best practises when commiting.

### Example:

Add file/s

```bash
git add .
```

Run commitizen

```bash
git cz
```

[![Add and commit with Commitizen](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)

Follow the rest of the guide [here](https://github.com/commitizen/cz-cli)
