# LOCAL SETUP

### 1. Clone the project
```
git clone https://github.com/Nandeeswar7/chrysalis-web.git
cd chrysalis-web
```

### 2. Create .env.local file
This step can be skipped if backend application is running on PORT 4000.

Create .env.local file in the root directory of the project.  
Configure backend server URL
```
NEXT_PUBLIC_API_URL='http://localhost:4000/api'
```
If backend application is running on a different PORT, Replace 4000 in the URL with actual PORT number.

### 3. Install dependencies
```
npm i
```

### 4. Start the application
```
npm start
```
or
```
npm run dev
```
npm run dev runs the Next.js development server with hot reloading.

The application will be running at http://localhost:3000 (or the next available port if 3000 is already in use).
