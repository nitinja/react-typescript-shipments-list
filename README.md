# Showcase: React app for Shipment tracking, follows best practices

## Introduction

**Features -**

1. React app built with Typescript, a components - based SPA. Bootstrapped using Create-react-app.
2. All functional requirements including **sorting, pagination, editing, saving, API calls with fetch** are done. **No custom component used.**
3. Tests: All major flows covered with test cases with **react-testing-library**
4. State management with useReducer + context hooks, because redux-like solution isn't necessary for such a small app
5. **Code splitting implemented**: Major Components are lazily loaded/bundle splitting using **React.lazy**
6. Styles in separate files in each component
7. **App is configurable by environment variables** (.env.development and .env.production files)
8. **Dev/Prod mode** is supported by node script commands "yarn start" and "yarn build"  (same as create-react-app)
9. App is responsive except table. (Table can be made responsive by showing/hiding columns or changing layout - will take additional efforts)
10. Hot-module-reload is supported in branch "hot-reload" Done using `craco` package. HMR isn't reliable enough to include in master branch.

## Instructions
1. Install dependencies using
    `yarn`
2. Start API server using
   `yarn server`

3. Start dev server using
   `yarn start`

4. Open `localhost:3000` in browser (tested in chrome and firefox)


# Use cases

- The user can:
  - See shipments in pages of 20 elements per page
  - Search by shipment id
  - Sort by different fields (e.g. id, name) in ascending/descending order
  - View the shipment information on a separate shipment details page
  - Update the shipment name (should persist when the page is reloaded)

The interactions wont refresh the page.

# How to run API server

The boilerplate includes a small service for data fetching. The file `db.json` includes all the necessary data to achieve the goal. Please follow the steps below to start the server:

```
yarn or npm install .
yarn server or npm run server
```

Check [json-server](https://github.com/typicode/json-server) for more information.
