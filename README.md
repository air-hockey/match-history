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

## Run

1.  Start the database (this might take awhile on first run):
    ```bash
    yarn run db:up
    ```
2.  Start the application:
    ```bash
    yarn start
    ```

## Development

When developing, you can either develop with persistent data from your local database, or with mocked data.

### Using local database

1.  Start the database:
    ```bash
    yarn run db:up
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

## Mocking data

It may be helpful to mock the backend while developing on the frontend. To do this, add to the `mocks.js` file in `server/src/mocks.js`. You can use [`casual`](https://github.com/boo1ean/casual) to help build user-friendly mocks.
