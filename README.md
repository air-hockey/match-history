[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# match-history

## Installation

1.  If you don't have Docker installed already, you can download it for your platform using the following links:
    * [Mac](https://store.docker.com/editions/community/docker-ce-desktop-mac)
    * [Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows)
    * [Other](https://www.docker.com/get-docker)
2.  Once the installer was downloaded, double-click on it and follow the instructions for the installation on your platform.
3.  Install dependencies:
    ```bash
    yarn
    ```

### First time setup

1.  Start the database docker container (may take awhile on first run):
    ```bash
    yarn run db
    ```
2.  Deploy prisma to the database:
    ```bash
    yarn run prisma:deploy
    ```

## Run

1.  Start the database:
    ```bash
    yarn run db
    ```
2.  Build the application:
    ```bash
    yarn run build
    ```
3.  Start the application:
    ```bash
    yarn start
    ```

## Development

When developing, you can either develop with persistent data from your local database, or with mocked data.

### Using local database

1.  Start the database:
    ```bash
    yarn run db
    ```
2.  Start the application in dev mode:
    ```bash
    yarn run dev
    ```

### Using mocked data

1.  Start the application in dev mock mode:
    ```bash
    yarn run dev:mock
    ```

### Debug mode

You can run the server in debug mode, which will allow you to attach a remote debugger to the node process:

```bash
yarn run debug
```

or

```bash
yarn run debug:mock
```

## Authentication

Authentication is provided by Facebook Login. To set up, you'll need to add a Facebook App ID to `now-secrets.json` as `@facebook-app-id`.

## Mocking data

It may be helpful to mock the backend while developing on the frontend. To do this, add to the `mocks.js` file in `server/src/mocks.js`. You can use [`casual`](https://github.com/boo1ean/casual) to help build user-friendly mocks.
