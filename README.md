# Digital-Diner

## Live App

You can access the working app here: [Live Website](https://eatoes-digital-diner.vercel.app/)(Mobile focused UI)

## Steps to Run Backend

1. Clone the repo.

2. Open the project folder in your preferred code editor.

3. Open your terminal and navigate to the backend folder:

```bash
   cd backend
```

4. Install dependencies and create the environment file:

```bash
   npm i
   cp .env.sample .env
```

5. Fill in the required details inside the .env file.  
   NOTE: DATABASE_URL refers to your Prisma database connection string.

6. Generate the Prisma client:

```bash
   npx prisma generate
```

7. Start the development server:

```bash
   npm run dev
```

## Steps to Run Frontend

1.Go back and navigate to frontend folder.

```bash
  cd ..
  cd frontend
```

2.Install dependencies.

```bash
  npm i
```

3.Run development server.
```bash
  npm run dev
```

## Database Design Strategy

The project uses a hybrid database approach to best match each model’s use case:

### 1. User Model
- **Database Used:** PostgreSQL
- **Reason:** User data is structured and consistent (e.g., id, email, password). 
- **Why PostgreSQL:**
  - Enforces data integrity with constraints (e.g., unique emails).
  - Supports relationships (user-to-orders).
  - Reliable for authentication and user-related operations.

### 2. Order Model
- **Database Used:** PostgreSQL
- **Reason:** Orders are transactional and require strong consistency.
- **Why PostgreSQL:**
  - Each order is linked to a user via a foreign key.
  - Ensures atomicity and data integrity, especially for billing and history tracking.
  - Easier to query user-order relationships.

### 3. Menu Model
- **Database Used:** MongoDB
- **Reason:** Menu is dynamic and can have flexible structure.
- **Why MongoDB:**
  - Schema flexibility supports frequently changing or nested structures (e.g., variants, add-ons).
  - Fast updates and inserts for dynamic data.
  - No need for strict relational integrity.

---

This hybrid setup provides the best of both worlds:
- **Relational DB (PostgreSQL)** for structured, relational data.
- **NoSQL DB (MongoDB)** for flexible, frequently updated data.

## List of API Endpoints

### 1. User Routes
- /register  
- /login

### 2. Order Routes
- /create-order  
- /get-orders  
- /update-order  (Admin only: to complete or cancel an order)

### 3. Menu Routes
- /add-menu       (Admin only: add a new menu item)  
- /get-menu-items  
- /get-menu-item  
- /edit-menu      (Admin only: edit an existing menu item)

## Challenges Faced

### Managing the Cart

One of the key challenges was deciding how to manage the cart system. I initially considered using MongoDB to store the cart data, but realized that it added unnecessary backend calls and complexity for a relatively simple feature.

After some thought, I chose to use **Context API** for global state management on the frontend. This approach turned out to be:
- Simple and clean to implement
- Fast and responsive with no need for repeated backend calls
- Well-suited for a lightweight cart system

Using Context allowed for a smoother user experience while keeping the architecture straightforward.

