# RecipeBook Project

This README provides a detailed, step-by-step guide to running the RecipeBook project, querying data using GraphQL, and presenting the application. It includes instructions for accessing the MongoDB Atlas database and examples of GraphQL queries and mutations.

---

## **1. Prerequisites**

Before starting, ensure you have the following installed on your system:

- **Node.js**: Download and install from [Node.js](https://nodejs.org/).
- **npm**: Comes bundled with Node.js.
- **MongoDB Atlas Account**: Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas).
- **Git**: Install from [Git](https://git-scm.com/).

---

## **2. Setting Up the Project**

### **Step 1: Clone the Repository**

Clone the project from the source repository:
```bash
git clone <repository_url>
```

### **Step 2: Navigate to the Project Directory**

Go to the project directory:
```bash
cd RecipeBook-main
```

### **Step 3: Install Dependencies**

#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd frontend
npm install
```

### **Step 4: Configure Environment Variables**

1. Create a `.env` file in the `backend` directory.
2. Add the following environment variables:
```env
# MongoDB Atlas Configuration
MONGO_URI=mongodb+srv://dbusername:password@cluster0.jqw3d.mongodb.net/recipebook?retryWrites=true&w=majority

# Hugging Face API Key
HUGGINGFACE_KEY=<your_hugging_face_api_key>

# ImgBB API Key
IMGBB_KEY=<your_imgbb_api_key>
```
3. Replace `<your_hugging_face_api_key>` and `<your_imgbb_api_key>` with your actual API keys.

### **Step 5: Start the Application**

#### Backend:
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. The backend server will run on `http://localhost:4000`.

#### Frontend:
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Start the frontend:
   ```bash
   npm start
   ```
3. Open the app in your browser at `http://localhost:3000`.

---

## **3. Accessing MongoDB Atlas**

### **Step 1: Log in to MongoDB Atlas**
1. Visit [MongoDB Atlas](https://cloud.mongodb.com/).
2. Log in with your account credentials.

### **Step 2: Navigate to the Cluster**
1. In the dashboard, select the cluster (e.g., `Cluster0`).
2. Click on **Collections** to view the database (`recipebook`) and its collections (`users`, `recipes`, `comments`).

### **Step 3: Network Access**
1. Go to **Network Access** under the **Security** tab.
2. Ensure your IP address is whitelisted or set to `0.0.0.0/0` for unrestricted access during development.

---

## **4. GraphQL Queries and Mutations**

Here are the queries and mutations to use during the presentation:

### **Queries**

#### **1. Fetch All Users**
```graphql
query {
  getAllUsers {
    id
    name
    email
    profile_pic
    registration_date
  }
}
```

#### **2. Fetch All Recipes**
```graphql
query {
  getAllRecipes {
    id
    title
    description
    recipe
    thumbnail
    creation_date
    user_id
  }
}
```

#### **3. Fetch Recipes by User ID**
```graphql
query {
  getRecipeByUserId(user_id: "USER_ID_HERE") {
    id
    title
    description
    recipe
    thumbnail
    creation_date
  }
}
```

#### **4. Fetch a User by ID**
```graphql
query {
  getUserById(user_id: "USER_ID_HERE") {
    id
    name
    email
    profile_pic
    registration_date
  }
}
```

### **Mutations**

#### **1. Create a New User**
```graphql
mutation {
  createUser(
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    profile_pic: "http://example.com/profile.jpg",
    registration_date: "2024-01-01"
  ) {
    id
    name
  }
}
```

#### **2. Add a Recipe**
```graphql
mutation {
  addRecipe(
    user_id: "USER_ID_HERE",
    title: "Spaghetti Bolognese",
    description: "A classic Italian dish.",
    recipe: "Boil pasta, prepare sauce, mix together.",
    thumbnail: "http://example.com/spaghetti.jpg",
    creation_data: "2024-01-01"
  ) {
    id
    title
  }
}
```

#### **3. Add a Comment**
```graphql
mutation {
  addComment(
    user_id: "USER_ID_HERE",
    recipe_id: "RECIPE_ID_HERE",
    comment_text: "This recipe is fantastic!",
    comment_date: "2024-01-01"
  ) {
    id
    comment_text
  }
}
```

---

## **5. Testing and Debugging**

### **GraphQL Playground**
1. Open the GraphQL Playground at `http://localhost:4000/graphql`.
2. Use the provided queries and mutations to test your API.

### **Debugging Tips**
- Use `console.log()` in your resolvers (e.g., `resolvers.js`) to debug data.
- Check backend logs for connection or query errors.

---

## **6. Presentation Tips**

1. **Explain the Project Flow**:
   - Briefly describe the project’s functionality (e.g., user sign-up, recipe sharing).
   - Highlight the role of MongoDB Atlas and GraphQL in managing data.

2. **Demonstrate Key Features**:
   - Show the `getAllUsers` and `getAllRecipes` queries.
   - Add a new user and recipe using mutations and display the updated data.

3. **Access Data on MongoDB Atlas**:
   - Navigate to the `Collections` tab and show the `users` and `recipes` collections.

---
## **7. Outuput**
<img width="1433" alt="image" src="https://github.com/user-attachments/assets/c75d2058-ca94-42d3-b686-b51c99438ed1" />

<img width="1219" alt="image" src="https://github.com/user-attachments/assets/3729c337-3b35-45be-b71f-a16131caf6e0" />

<img width="1440" alt="image" src="https://github.com/user-attachments/assets/8523abe1-29f4-438d-a48f-6255e660a947" />


