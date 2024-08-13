![image](https://github.com/user-attachments/assets/fbd9549f-a790-4861-bc0e-b20323b10d9d)

# Flashify | Take u Forward Assignment 

Flashify is a powerful web application designed to create and manage flashcards, enhancing learning and memorization processes.

[Live Demo](https://flashify.pages.dev/)

## Key Features

- **AI-Powered Flashcard Creation**: Put your text and generate question and answer flashcards
- **Manual Creation Option**: Create your manual cards
- **Flashcard Management**:Easily view and edit your flashcards
- **Intuitive User Interface**: Easy navigation and user-friendly experience

## Tech Stack

### Frontend
- React with Vite 

### Backend
- Node.js and Express.js

### Database
- MySQL for structured data storage
- Redis for caching and performance optimization

### Deployment
- MySQL hosted on Railway
- Backend deployed on Render
- Frontend hosted on Cloudflare Pages

### AI Integration
- OpenAI API for intelligent flashcard generation

### Additional Tools
- Zod for data validation
- Sequelize as the ODM

## Architecture:
![image](https://github.com/user-attachments/assets/3c534cef-c44b-4c3d-950d-384963831d23)

## File Structure
```
|-- backend
|     -- src
|       |-- config
|       |-- controllers
|       |-- middlewares
|       |-- migrations
|       |-- models
|       |-- routes
|       |   `-- v1
|       |-- seeders
|       `-- services
|-- frontend
    |-- dist
    | -- src
        |-- components
        |-- hooks
        |-- pages
.github
  -- workflows
```

## Setting up project

### Clone the project
```
git clone https://github.com/aialok/flashify.git
```
### Install dependencies 
- Move to frontend folder and run the command - `pnpm install`
- Moce to backend folder and run the command - `pnpm install`

### Setup ENV File
- Backend
  ```
    OPEN_AI_API_KEY=
    DB_USERNAME=
    DB_PASSWORD=
    DB_DATABASE=
    DB_HOST=
    DB_PORT=
    REDIS_USERNAME=
    REDIS_PASSWORD=
    REDIS_HOST=
    REDIS_PORT=
    NODE_ENV=development | test | production
  ```
- Frontend
```
    VITE_BACKEND_URI=http://localhost:3000
```
### Database Setup
- Make sure to have add all the env variable
- Run command to migrate your database setup : `npx sequelize-cli db:migrate` || `pnpm dlx sequelize-cli db:migrate`
- Make sure you have redis-cli and mysql in local if you are using localhost
- Wohoo ! you are done : )

### Local Database:
- Tables

![image](https://github.com/user-attachments/assets/24652a32-e273-47f5-b861-a7fd0918bd1f)
- Pack Table

![image](https://github.com/user-attachments/assets/8481179c-2de5-4a49-98a9-d95de8389136)
- Flashcards Table

![image](https://github.com/user-attachments/assets/56e0e629-2d02-43cb-b84a-4133b76b5434)



### Run your backend and frontend server
  - cd to backend `pnpm run dev`
  - cd to frontend `pnpm run dev`

### Wohoo ! congrats you are done with setup  :)
  
### Screenshots
Homepage
![image](https://github.com/user-attachments/assets/fbd9549f-a790-4861-bc0e-b20323b10d9d)
Create Flashcards
![image](https://github.com/user-attachments/assets/ec26b01c-68cb-4df1-937f-3e216b066b85)
FlashCard Views
![image](https://github.com/user-attachments/assets/a76cf77b-067c-41d3-85d8-367ea2150614)
Edit Flashcards
![image](https://github.com/user-attachments/assets/afb7ff31-2ad0-4e97-896a-8826ee139720)
Generate with AI
![image](https://github.com/user-attachments/assets/da3bc184-30a6-4dc5-88e9-3faa4e9ecbd8)







