# 🛒 Electronics Store Server

**Backend server for an electronics online store built with Node.js, Express, MongoDB, and Mongoose.**

> A RESTful API that supports managing products, orders, customers, and product reviews.

---

## 🚀 About the project

This project implements the backend for an online store that sells electronics (laptops, smartphones, accessories, etc.).  
It provides APIs for managing products, orders, customers, and reviews.

The API is designed to demonstrate:

- CRUD operations
- MongoDB schema design with Mongoose
- Data validation and relationships between collections
- RESTful architecture

---

## 🧰 Tech stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Development tools**: Nodemon

---

## 📂 Features

✅ Manage **Products**:

- Unique ID, name, description, category, price, stock quantity, discount, reviews

✅ Manage **Customers**:

- Name, email, password, shipping address, wishlist

✅ Manage **Orders**:

- Customer, products, quantities, total amount, order status (`new`, `processing`, `shipped`, `delivered`), order date

✅ Manage **Reviews**:

- Linked to products and customers, rating, text comment

✅ REST API endpoints for all CRUD operations.

---

## 🗃️ Data models

### Product

| Field         | Type     | Notes                      |
| ------------- | -------- | -------------------------- |
| `_id`         | ObjectId | Auto-generated             |
| `name`        | String   | Required                   |
| `description` | String   | Required                   |
| `category`    | String   | Enum / String              |
| `price`       | Number   | Required                   |
| `stock`       | Number   | Default: 0                 |
| `discount`    | Number   | Percentage                 |
| `reviews`     | [Review] | Array of review references |

---

### Customer

| Field             | Type      | Notes                       |
| ----------------- | --------- | --------------------------- |
| `_id`             | ObjectId  | Auto-generated              |
| `name`            | String    | Required                    |
| `email`           | String    | Unique, required            |
| `password`        | String    | Hashed                      |
| `shippingAddress` | String    | Optional                    |
| `wishlist`        | [Product] | Array of product references |

---

### Order

| Field         | Type     | Notes                                             |
| ------------- | -------- | ------------------------------------------------- |
| `_id`         | ObjectId | Auto-generated                                    |
| `customer`    | Customer | Reference                                         |
| `products`    | Array    | List of `{ product, quantity }`                   |
| `totalAmount` | Number   | Calculated                                        |
| `status`      | String   | Enum: `new`, `processing`, `shipped`, `delivered` |
| `orderDate`   | Date     | Default: now                                      |

---

### Review

| Field      | Type     | Notes          |
| ---------- | -------- | -------------- |
| `_id`      | ObjectId | Auto-generated |
| `product`  | Product  | Reference      |
| `customer` | Customer | Reference      |
| `rating`   | Number   | Typically 1-5  |
| `comment`  | String   | Optional       |

---

## 📦 Getting started

### Install dependencies

```bash
npm install
```

### Running the server

```bash
npm run dev
```
