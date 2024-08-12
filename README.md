![image](https://github.com/user-attachments/assets/fbd9549f-a790-4861-bc0e-b20323b10d9d)

# Flashify

Flashify is a powerful web application designed to create and manage flashcards, enhancing learning and memorization processes.

🚀 [Live Demo](https://flashify.pages.dev/)

## 🌟 Key Features

- **AI-Powered Flashcard Creation**: Put your text and generate question and answer flashcards
- **Manual Creation Option**: Create your manual cards
- **Flashcard Management**:Easily view and edit your flashcards
- **Intuitive User Interface**: Easy navigation and user-friendly experience

## 🛠️ Tech Stack

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

### Run your backend and frontend server
  - cd to backend `pnpm run dev`
  - cd to frontend `pnpm run dev`

### Wohoo ! congrats you are done with setup  :)
  





