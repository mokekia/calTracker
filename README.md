# CalTracker 
CalTracker is a calorie tracking application for people who want to manage their daily calorie intake. Users can easily log food entries for each meal (breakfast, lunch, dinner, snacks) and monitor their progress towards a personalized calorie goal calculated using the Harris-Benedict formula.


## Setup
1. Clone the repository: 
- https://github.com/mokekia/calTracker.git

2. Install the dependencies by typing the following from the root folder:
- cd backend && npm install
- cd ../frontend && npm install

3. Create a env. file in the backend folder with:
- PORT=5000
- `CONNECTION_URL=mongodb+srv://<username>:<password>@cluster0.dqmuudq.mongodb.net/calTracker?appName=Cluster0`

4. Run the app from the root folder by typing:
- npm run dev

## Tech Stack
- Frontend: React (Vite)
- Backend: Express.js
- Database: MongoDB Atlas
- Dev tooling: concurrently 