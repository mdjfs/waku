# Waku Backend

Backend Component for Authorization, Database, CatAPI Calls and Serve React SPA

## Guide

- [Installation](#installation)
- [Deployment](#deployment)
- [Running Tests](#running-tests)
- [API Reference](#api-reference)

## Installation

- Clone the repo
- cd /backend

```bash
 npm install
```

## Deployment

- Create .env file in the root directory and create a config file like that:

```bash
    SECRET_KEY=
    DATABASE_URI=mysql://xxx:xxx@x.x.x.x:3306/xxxx
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    GOOGLE_CALLBACK_URL=
    FACEBOOK_CLIENT_ID=
    FACEBOOK_CLIENT_SECRET=
    FACEBOOK_CALLBACK_URL=
    CAT_API_KEY=
    CAT_API_URL=https://api.thecatapi.com/v1
```

- Run normal or in watch mode, respectively:

```bash
   npm start
```

```bash
   npm run start:dev
```

## Running Tests

To run tests, run the following command

```bash
  npm test
```

## API Reference

#### Get cats from CatApi

```http
  GET /api/cat
```

| Parameter      | Type     | Description               |
| :------------- | :------- | :------------------------ |
| `limit`        | `string` | Cat limit                 |
| `page`         | `string` | Cat page                  |
| `order`        | `string` | Order (Rand, Desc or Asc) |
| `category_ids` | `string` | Filter by category id     |
| `breed_ids`    | `string` | Filter by breed id        |

#### Get breeds from CatApi

```http
  GET /api/cat/breeds
```

#### Get categories from CatApi

```http
  GET /api/cat/breeds
```

#### Get cats from Local Database

```http
  GET /api/cat/local
```

| Parameter      | Type     | Description               |
| :------------- | :------- | :------------------------ |
| `limit`        | `string` | Cat limit                 |
| `page`         | `string` | Cat page                  |
| `order`        | `string` | Order (Rand, Desc or Asc) |
| `category_ids` | `string` | Filter by category id     |
| `breed_ids`    | `string` | Filter by breed id        |

#### Get breeds from Local Database

```http
  GET /api/cat/local/breeds
```

#### Get categories from Local Database

```http
  GET /api/cat/local/breeds
```
