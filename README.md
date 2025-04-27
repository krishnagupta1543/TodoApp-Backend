# TodoApp Backend
This is the backend server for a simple Todo Application, built with Node.js, Express.js, and MongoDB.

It provides a set of RESTful APIs to create, read, update, and delete (CRUD) todo tasks.

## 🚀 Installation and Setup
1) **Clone the repository**
  
       git clone https://github.com/krishnagupta1543/TodoApp-Backend.git

2) **Navigate to the project folder**
   
       cd TodoApp-Backend

3) **Install dependencies**

        npm install

4) **Set up environment variables**

       MONGO_URI=your_mongodb_connection_string
       PORT=5000
5) **Start the server**

        npm run dev

## API Endpoints

| Method | Endpoint        | Description               |
| :----: | :-------------- | :------------------------- |
| POST    | `/api/v1/user/signup`     | signup yourself   |           
| POST   | `/api/v1/user/signin`     | If already have account          |
| PUT    | `/api/v1/user/addTodo` | Add your todo    |
| GET | `/api/v1/user/bulk` | Get current user all todos              |

## 🔍 Testing with Postman

1) Open Postman.

2) Set the base URL to

       http://localhost:3000

4) Use the API endpoints above to test functionality.

5) For protected routes, include Authorization: Bearer <token> in headers.

## 🤝 Contributing

1) Fork the repository

2) Create a new branch (feature-branch)

3) Commit your changes

4) Push to your fork

5) Submit a Pull Request

## 🛠️ Technologies Used

+ Node.js

+ Express.js

+ MongoDB

+ Mongoose

+ dotenv (for environment variables)

+ vite

## 🌐 Connect with Me

👤 Author: Krishna Gupta

 🇮🇳 <a href = "https://www.linkedin.com/in/krishna-gupta-b4327920a/" target = "">Linkedin<a/>