# Digital-Diner

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
