# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

<!-- _______________________________________________ -->

# News-project

simple news website that use NYT-API

## Summary

Three-paged app with actual news <!-- Дополнить описание -->

## Table of content

- Technologies;
- Pre-requisites;
- Getting started;
- Project content;
- Project structure;

## Technologies

```
- Axios 1.6.2;
- React 18.2.0;
- Redux 8.1.3;
- Tailwindcss 3.3.3;
- Typescript 5.0.2;
- Vite 4.5.3
```

## Pre-requisites

Install [Node.js LTS](https://nodejs.org/en)

## Getting started

### Clone repository

`git clone https://github.com/GregTerekhov/news-portal-refactor`

### Install dependencies

`cd<project name>` => `npm install`

### Run the project

`npm run dev`

### Navigate to

`http://localhost:5173`

## Project content

1. Pages
   - Home page;
   - Favourite page;
   - Read page;
   - Archive page;
   - User page;
2. Hero
3. Weather block
4. News processing
   - Search processing;
   - Filter processing;
5. Calendar block
6. Theme switcher
7. Page pagination
8. Adaptive layout
   - Mobile;
   - Tablets;
   - PC;
9. Skeleton
10. User actions
    - User authorization;
    - Google link;
    - Google authorization;
    - Save news to Favorites;
    - Store all read news;
    - News archive;
    - Clear the archive;
    - Change user email;
    - Change user password;
11. Useful social links
    - NYT youtube chanel;
    - NYT Linkedin page;
    - NYT twitter page;
    - NYT facebook page;
12. Error handlings
13. Data encryption

## Project structure

_all graphs will begin with “contains”_

1. **node_modules** – _contains_ all npm dependencies;
2. **public** – the app tab icon png;
3. **scr** – source code;
   - **assets** – all project stored fonts, images and svg icons;
     - **fonts** – project stored fonts;
     - **images** – project stored images in .png format;
     - icons.svg – shortcuts to all project icons;
   - **components** – project general components;
     - **authModal** – logic to open the modal window; returns a .jsx markup
       - **assistants** - auxiliary data to **authModal**;
       - **hooks** - **authModal** exclusive hooks;
       - **subComponents** - specific modal windows' components of the project;
     - **deleteModal** – close the modal window;
       - **assistants** - auxiliary data to **deleteModal**;
     - **linkedAccounts** – logic to link an social account
       - **assistants** - auxiliary data to **linkedAccounts**;
       - **hooks** - **linkedAccounts** exclusive hooks;
     - **navigationErrorButtons** – button to return to Home page in a case of error cause
     - **newsFilterManager** – markup for filtering and searching logic
       - **subComponents** - auxiliary components to **newsFilterManager**
         - **calendar** - all logic and markup that response for calendar features;
         - **filtersBlock** - all logic and markup that response for news filter processing;
         - **hooks** - **newsFilterManager** exclusive hooks;
     - **newsList** – news table markup
       - **assistants** - auxiliary data to **newsList**;
       - **subComponents** - logic and markup for a single news card;
     - **toast** – markup for a tost notification
       - **assistants** - auxiliary data to **toast**;
       - **hooks** - **toast** exclusive hooks;
     - **weatherBlock** – markup for a weather block features
       - **assistants** - auxiliary data to **weatherBlock**;
       - **hooks** - **weatherBlock** exclusive hooks;
       - **subComponents** - some specific components for **weatherBlock** proper function;
   - **config** - **env.** validation setups;
   - **constants** - auxiliary constant data;
     - _dropdownArrays.ts_ - lits of news material types;
     - _images.ts_ - general image data objects;
   - **context** – all global project constants;
   - **helpers** – useful external functions;
   - **hooks** - all general custom project custom hooks;
   - **layouts** - all project layouts;
     - **assistants** - function to determinate a _serverError_. Return a boolean;
     - **hooks** - **layouts** exclusive hooks;
     - **subComponents** - general layout components;
       - **commonMenu** - mobile only main menu;
       - **footer** - project footer component;
       - **header** - project header component;
       - **hero** - project hero component;
       - **pageScrollController** - main page screen viewport controller;
       - _container.tsx_ - project main style container;
   - **pages** – list of project pages
     - **aboutUs** - project developers info;
     - **accountManagePage** - user data settings;
     - **accountPage** - user general page;
     - **archivePage** - list of all news that has been read at least two weeks ago;
     - **developmentPage** - auxiliary error page, in a case of some sudden malfunctions;
     - **errorPage** - general project error page, in a case of 400+ error happened;
     - **favouritePage** - page with all user saved news;
     - **homePage** - project main page with all useful info and features;
     - **readPage** - page with all news that has been read at least one time;
     - **serverErrorPage** - project error page, in a case of 500+ error happened;
     - **template** - main project page template; wrapper;
   - **redux** - _API_ logic and data processing;
     - **auth** - user register and authorize logic; sending and retrieving data to project backend;
     - **hooks** - **redux** exclusive custom hooks;
     - **newsAPI** - _NYT-API_ news fetch and retrieve logic;
     - **newsDatabase** - data, saved on backend; user personal stored and read news data;
     - **services** - useful functions for a proper API data processing;
     - **weather** - _Weather API_ news fetch and retrieve logic;
     - **filterSlice.ts** - main filter logic processing;
     - **reducers** - general redux reducer data collector;
     - **store** - redux store data;
   - **routes** – logic to determine if curren route are available or not;
   - **types** – all project _TypeScript_ types;
   - **ui** – all general project reused interface components;
   - _App.ts_ – application routes hub file;
   - _AppProvider_ – application wrapper hub file;
   - _main.ts_ - main application file
