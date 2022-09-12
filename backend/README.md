# REST JSON API

## Getting started

1. Copy `.env-example` to `.env`
2. Run `yarn start`

## Schema

* GET /products?page=3&size=10&sortBy=name&sortOrder=ASC
* GET /product/:prodId
* GET /cart
* PUT /cart/:prodId BODY: { quantity: 3 }
* DELETE /cart
